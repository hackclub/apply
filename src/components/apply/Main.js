import React, { Component, Fragment } from 'react'
import { useIntl } from 'react-intl'
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
import { useRouter } from 'next/router'

const authToken = storage.get('authToken')

const P = (props) => <Text my={3} {...props} />

const A = styled(Link)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const Rejected = ({ resetCallback }) => {
  const intl = useIntl()

  ;<Box mb={4}>
    <Heading.h3 color="error" mb={3}>
      {intl.formatMessage({ id: 'REJECTED_TITLE' })}
    </Heading.h3>
    <P>
      {intl.formatMessage({ id: 'REJECTED_MESSAGE' })}{' '}
      <A onClick={resetCallback}>{intl.formatMessage({ id: 'HERE' })}</A>.
    </P>
  </Box>
}
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

const ContactInfo = () => {
  const intl = useIntl()

  return (
    <ContactBase>
      <Icon glyph="support" size={36} mr={[2, 3]} color="info" />
      <Box color="info" fontSize={2} align="left">
        <Text>
          {intl.formatMessage({ id: 'CONTACT_MESSAGE' })}{' '}
          <a href="mailto:applications@hackclub.com">
            <strong>applications@hackclub.com</strong>
          </a>
          .
        </Text>
      </Box>
    </ContactBase>
  )
}

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
  const { locale } = useRouter()
  const intl = useIntl()

  const { id, leader_profiles, updated_at, created_at } = props.app
  const { callback, app, resetCallback } = props

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
    unopened: {
      color: 'primary',
      children: intl.formatMessage({ id: 'READY_FOR_YOU' })
    },
    incomplete: {
      color: 'warning',
      children: intl.formatMessage({ id: 'IN_PROGRESS_WITH_PERIOD' })
    },
    complete: {
      color: 'info',
      children: intl.formatMessage({ id: 'READY_TO_SUBMIT' })
    },
    submitted: {
      color: 'success',
      children: intl.formatMessage({ id: 'SUBMITTED_WITH_EXCLAMATION_MARK' })
    }
  }[submitButtonStatus]

  return (
    <Container maxWidth={52} py={4}>
      <ContactInfo />
      <Sheet mt={4} p={[3, 4, 5]}>
        <Headline mb={4} style={{ position: 'relative' }}>
          <Text.span>
            {intl.formatMessage({ id: 'APPLICATION_STATUS_MESSAGE' })}
          </Text.span>
          <SubmitStatus {...submitStatusProps} />{' '}
        </Headline>
        {/*
        <Text bold fontSize={[3, 4]}>
          {getSeason()} applications accepted on a rolling basis
        </Text>
        */}
        <Section
          href={`/${locale !== 'en-US' ? `${locale}/` : ''}club?id=${id}`}
          name={
            <Box>
              <Status type={applicationStatus()} />
              <Text>
                {app.high_school_name ||
                  intl.formatMessage({ id: 'CLUB_APPLICATION' })}
              </Text>
            </Box>
          }
        />
        <Section
          href={`/${locale !== 'en-US' ? `${locale}/` : ''}leader?id=${
            leaderProfile.id
          }`}
          name={
            <Box>
              <Status type={profileStatus(leaderProfile)} />
              <Text>{intl.formatMessage({ id: 'MY_PERSONAL_PROFILE' })}</Text>
            </Box>
          }
        />
        <LeaderInvite id={id} callback={callback} />
        {coLeaderProfiles.length === 0 && (
          <Text py={4} color="muted" align="center" fontSize={3}>
            <Text.span bold>
              {intl.formatMessage({ id: 'NO_COLEADERS_YET' })}
            </Text.span>
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
                    intl.formatMessage(
                      { id: 'ARE_YOU_SURE_REMOVE_AS_A_TEAM_MEMBER' },
                      { team_member: profile.user.email }
                    )
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
              aria-label={intl.formatMessage({ id: 'REMOVE_TEAM_MEMBER' })}
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
