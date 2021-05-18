import React, { Component, Fragment } from 'react'
import styled, { css } from 'styled-components'
import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  Text,
  Icon,
  theme
} from '@hackclub/design-system'
// import getSeason from '@hackclub/season'
import LeaderInvite from './LeaderInvite'
import { clubApplicationSchema } from './ClubApplicationForm'
import { Headline } from '../Content'
import Sheet from '../Sheet'
import SubmitButton from './SubmitButton'
import Status from './Status'
import api from '../../api'
import storage from '../../storage'

const authToken = storage.get('authToken')

const P = (props) => <Text my={3} {...props} />

const A = styled(Link)`
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
const ContactBase = styled(Sheet).attrs({
  mt: [3, 4],
  px: [3, 4],
  py: 3
})`
  border-radius: ${theme.radii[2]};
  display: flex;
  ${theme.mediaQueries.md} {
    align-items: center;
  }
`

const ApplicationInPortugueseBase = styled(Sheet).attrs({
  mt: [3, 4],
  px: [3, 4],
  py: 3
})``

const ContactInfo = () => (
  <ContactBase>
    <Icon glyph="support" size={36} mr={[2, 3]} color="info" />
    <Box color="info" fontSize={2} align="left">
      <Text>
        Please don’t hesitate to reach out. We’re available to email at{' '}
        <a href="mailto:applications@hackclub.com">
          <strong>applications@hackclub.com</strong>
        </a>
        .
      </Text>
    </Box>
  </ContactBase>
)

const ApplicationInPortuguese = ({ country }) => (
  <Box>
    {country === 'Brazil' || country === 'Brasil' || country === 'BR' ? (
      <ApplicationInPortugueseBase>
        <Box color="#009c3b	" fontSize="120%" align="left">
          <Text>
            Você está se inscrevendo do <strong>Brasil</strong>? Se sim,
            sinta-se à vontade de preencher a inscrição em{' '}
            <strong>Inglês</strong> ou <strong>Português</strong>.
          </Text>
        </Box>
      </ApplicationInPortugueseBase>
    ) : null}
  </Box>
)

const SectionBase = styled(Flex).attrs({
  py: 4,
  px: [3, 0],
  mx: [-3, 0],
  align: 'center'
})`
  border-top: 1px solid ${theme.colors.smoke};
  min-height: ${(props) => (props.sm ? 6 : 10)}rem;
`
const SectionHeading = styled(Heading.h2).attrs({
  fontSize: (props) => (props.sm ? [3, 4] : [4, 5]),
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
  color: (props) => (props.open ? 'gray.5' : 'gray.4'),
  size: 32,
  mr: 1,
  ml: 'auto'
})`
  transition: ${theme.transition} all;
  transform: rotate(${(props) => (props.open ? 90 : 0)}deg);
  user-select: none;
  ${(props) =>
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
    this.setState(({ open }) => ({ open: this.props.href ? open : !open }))

  render() {
    const { open } = this.state
    const { name, openContent, href, sm, ...props } = this.props
    const Element = href ? Link : Fragment
    return (
      <Element href={href}>
        <SectionBase
          {...props}
          onClick={this.toggle}
          sm={sm}
          aria-expanded={open}
        >
          <SectionHeading sm={sm} children={name} />
          <SectionIcon open={open} glyph={href ? 'view-forward' : 'options'} />
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

const profileStatus = (profile) =>
  profile.completed_at !== null
    ? 'complete'
    : profile.created_at === profile.updated_at
    ? 'unopened'
    : 'incomplete'

const Main = (props) => {
  const { id, leader_profiles, updated_at, created_at } = props.app
  const { callback, app, resetCallback, country } = props

  const leaderProfile = leader_profiles.find(
    (profile) => profile.user && profile.user.id === props.userId
  )
  const coLeaderProfiles = leader_profiles.filter(
    (profile) => profile.user && profile.user.id !== props.userId
  )

  const completeProfiles = leader_profiles.every(
    (profile) => profile.completed_at
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
  const applicationStatus = (profile) =>
    completeApplication
      ? 'complete'
      : created_at === updated_at
      ? 'unopened'
      : 'incomplete'

  const submitStatusProps = {
    unopened: { color: 'primary', children: 'ready for you!' },
    incomplete: { color: 'warning', children: 'in progress.' },
    complete: { color: 'info', children: 'ready to submit!' },
    submitted: { color: 'success', children: 'submitted!' }
  }[submitButtonStatus]

  return (
    <Container maxWidth={52} py={4}>
      <ContactInfo />
      <ApplicationInPortuguese country={country} />
      <Sheet mt={4} p={[3, 4, 5]}>
        <Headline mb={4} style={{ position: 'relative' }}>
          <Text.span style={{ display: 'block' }}>
            Your application to Hack Club is
          </Text.span>
          <SubmitStatus {...submitStatusProps} />{' '}
        </Headline>
        {/*
        <Text bold fontSize={[3, 4]}>
          {getSeason()} applications accepted on a rolling basis
        </Text>
        */}
        <Section
          href={`/club?id=${id}`}
          name={
            <Box>
              <Status type={applicationStatus()} />
              <Text>{app.high_school_name || 'Club application'}</Text>
            </Box>
          }
        />
        <Section
          href={`/leader?id=${leaderProfile.id}`}
          name={
            <Box>
              <Status type={profileStatus(leaderProfile)} />
              <Text>My personal profile</Text>
            </Box>
          }
        />
        <LeaderInvite id={id} callback={callback} />
        {coLeaderProfiles.length === 0 && (
          <Text py={4} color="muted" align="center" fontSize={3}>
            <Text.span bold>No co-leaders yet!</Text.span>
          </Text>
        )}
        {coLeaderProfiles.map((profile) => (
          <SectionBase sm key={profile.id}>
            <SectionHeading sm>
              <Box>
                <Status type={profileStatus(profile)} actionable={false} />
                <Text>{profile.user.name || profile.user.email}</Text>
              </Box>
            </SectionHeading>
            <SectionIcon
              glyph="member-remove"
              onClick={(e) => {
                if (
                  // eslint-disable-next-line
                  confirm(
                    `Are you sure you want to remove ${profile.user.email} as a team member?`
                  )
                ) {
                  api
                    .delete(`v1/new_club_applications/${id}/remove_user`, {
                      authToken,
                      data: { user_id: profile.user.id }
                    })
                    .then((json) => {
                      callback()
                    })
                }
              }}
              aria-label="Remove team member"
            />
          </SectionBase>
        ))}
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
