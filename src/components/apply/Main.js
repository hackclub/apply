import React, { Component, Fragment } from 'react'
import styled, { css } from 'styled-components'
import {
  Box,
  Container,
  Flex,
  Heading,
  Link as DSLink,
  Text,
  Icon,
  theme
} from '@hackclub/design-system'
import LeaderInvite from 'components/apply/LeaderInvite'
import { clubApplicationSchema } from 'components/apply/ClubApplicationForm'
import { Headline } from 'components/Content'
import Sheet from 'components/Sheet'
import SubmitButton from 'components/apply/SubmitButton'
import Status from 'components/apply/Status'
import Link from 'gatsby-link'
import api from 'api'
import storage from 'storage'

const authToken = storage.get('authToken')

const P = props => <Text my={3} {...props} />

const A = styled(DSLink)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const Rejected = ({ resetCallback }) => (
  <Box mb={4}>
    <Heading.h3 color="error" mb={3}>
      Unfortunately, you’ve been rejected
    </Heading.h3>
    <P>
      You can start a new application by clicking{' '}
      <A onClick={resetCallback}>here</A>.
    </P>
  </Box>
)
const ContactBase = styled(Container).attrs({
  mt: [3, 4],
  px: [3, 4],
  py: 3,
  bg: 'blue.0'
})`
  border-radius: ${theme.radii[2]};
  display: flex;
  ${theme.mediaQueries.md} {
    align-items: center;
  }
`

const ContactInfo = () => (
  <ContactBase>
    <Icon glyph="announcement" size={36} mr={[2, 3]} color="info" />
    <Box color="info" fontSize={2} align="left">
      <Text>
        Please don't hesitate to reach out to us with any questions. We're
        available to email at{' '}
        <a href="mailto:applications@hackclub.com">
          <strong>applications@hackclub.com</strong>
        </a>{' '}
        and over text / phone at{' '}
        <a href="tel:1-855-625-HACK">
          <strong>1-855-625-HACK</strong>
        </a>
        .
      </Text>
    </Box>
  </ContactBase>
)

const SectionBase = styled(Flex).attrs({
  py: 4,
  px: [3, 0],
  mx: [-3, 0],
  align: 'center'
})`
  border-top: 1px solid ${theme.colors.smoke};
  min-height: ${props => (props.sm ? 6 : 10)}rem;
`
const SectionHeading = styled(Heading.h2).attrs({
  fontSize: props => (props.sm ? [3, 4] : [4, 5]),
  regular: true,
  align: 'left'
})`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  line-height: 1.25;
  max-width: 32rem;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
`
const SectionIcon = styled(Icon).attrs({
  color: props => (props.open ? 'gray.5' : 'gray.4'),
  size: 32,
  mr: 1,
  ml: 'auto'
})`
  transition: ${theme.transition} all;
  transform: rotate(${props => (props.open ? 90 : 0)}deg);
  user-select: none;
  ${props =>
    props.glyph === 'member-remove' &&
    css`
      cursor: pointer;
      &:hover {
        color: ${theme.colors.red[4]};
      }
    `};
`

class Section extends Component {
  state = { open: false }

  toggle = () =>
    this.setState(({ open }) => ({ open: this.props.to ? open : !open }))

  render() {
    const { open } = this.state
    const { name, openContent, to, sm, ...props } = this.props
    const Element = to ? Link : Fragment
    return (
      <Element to={to}>
        <SectionBase
          {...props}
          onClick={this.toggle}
          sm={sm}
          aria-expanded={open}
        >
          <SectionHeading sm={sm} children={name} />
          <SectionIcon open={open} glyph={to ? 'view-forward' : 'options'} />
        </SectionBase>
      </Element>
    )
  }
}

const SubmitStatus = styled(Text.withComponent('mark'))`
  background: transparent url(/underline.svg) bottom left no-repeat;
  background-size: 100% 0.75rem;
  padding-bottom: 0.125rem;
`

const profileStatus = profile =>
  profile.completed_at !== null
    ? 'complete'
    : profile.created_at === profile.updated_at
    ? 'unopened'
    : 'incomplete'

const Main = props => {
  const { id, leader_profiles, updated_at, created_at } = props.app
  const { callback, app, resetCallback } = props

  const leaderProfile = leader_profiles.find(
    profile => profile.user.id === props.userId
  )
  const coLeaderProfiles = leader_profiles.filter(
    profile => profile.user.id !== props.userId
  )

  const completeProfiles = leader_profiles.every(
    profile => profile.completed_at
  )
  const completeApplication = clubApplicationSchema.isValidSync(app)
  let submitButtonStatus
  if (app.submitted_at) {
    submitButtonStatus = 'submitted'
  } else if (completeApplication && completeProfiles) {
    submitButtonStatus = 'complete'
  } else {
    submitButtonStatus = 'incomplete'
  }
  const applicationStatus = profile =>
    completeApplication
      ? 'complete'
      : created_at === updated_at
      ? 'unopened'
      : 'incomplete'

  const submitStatusProps = {
    unopened: { color: 'primary', children: 'ready for you!' },
    incomplete: { color: 'warning', children: 'in progress.' },
    complete: { bg: 'info', children: 'completed!' },
    submitted: { bg: 'success', children: 'submitted!' }
  }[submitButtonStatus]

  return (
    <Container maxWidth={52} my={4}>
      <Sheet p={[3, 4, 5]}>
        <Heading.h3 fontSize={[4, 5]} mb={2}>
          How to get into Hack Club
        </Heading.h3>
        <P fontSize={3}>
          Our admissions process is very competitive. Here’s what we look for:
        </P>
        <ul>
          <li>
            Strong founding teams with 2-3 members. We love to see a group that
            can get stuff done together.
          </li>
          <li>
            Diverse skillsets on leadership team—the best Hack Clubs are led by
            both charismatic and technical people. We don't care if those
            skills are shared across the team or each leader has separate
            strengths.
          </li>
          <li>
            Traction. Indicators of progress to date, especially student sign up
            lists with contact info —although not required— are a big bonus.
          </li>
        </ul>
        <ContactInfo />
      </Sheet>
      <Sheet p={[3, 4, 5]}>
        <Headline mb={4} style={{ position: 'relative' }}>
          <Text.span style={{ display: 'block' }}>
            Your application to Hack Club is
          </Text.span>
          <SubmitStatus {...submitStatusProps} />{' '}
        </Headline>
        <Text bold fontSize={[3, 4]}>Applications close on August 19th</Text>
        <LeaderInvite id={id} callback={callback} />
        {coLeaderProfiles.length === 0 && (
          <Text py={3} color="muted" align="center" fontSize={3}>
            <Text.span bold>No co-leaders yet!</Text.span>
            <br />
            Tap the green button to add them.
          </Text>
        )}
        {coLeaderProfiles.map(profile => (
          <SectionBase sm key={profile.id}>
            <SectionHeading sm>
              <Text.span
                children={profile.user.name || profile.user.email}
                mr={[2, 3]}
              />
              <Status type={profileStatus(profile)} />
            </SectionHeading>
            <SectionIcon
              glyph="member-remove"
              onClick={e => {
                if (
                  // eslint-disable-next-line
                  confirm(
                    `Are you sure you want to remove ${
                      profile.user.email
                    } as a team member?`
                  )
                ) {
                  api
                    .delete(`v1/new_club_applications/${id}/remove_user`, {
                      authToken,
                      data: { user_id: profile.user.id }
                    })
                    .then(json => {
                      callback()
                    })
                }
              }}
              aria-label="Remove team member"
            />
          </SectionBase>
        ))}
        <Section
          to={`/club?id=${id}`}
          name={
            <Fragment>
              <Text.span bold mr={3}>
                {app.high_school_name || 'Club application'}
              </Text.span>
              <Status type={applicationStatus()} />
            </Fragment>
          }
        />
        <Section
          to={`/leader?id=${leaderProfile.id}`}
          name={
            <Fragment>
              <Text.span bold mr={3}>
                My personal profile
              </Text.span>
              <Status type={profileStatus(leaderProfile)} />
            </Fragment>
          }
        />
        <Box mt={4}>
          {app.rejected_at ? (
            <Rejected resetCallback={resetCallback} />
          ) : (
            <SubmitButton
              applicationId={app.id}
              status={submitButtonStatus}
              callback={callback}
            />
          )}
        </Box>
      </Sheet>
    </Container>
  )
}

export default Main
