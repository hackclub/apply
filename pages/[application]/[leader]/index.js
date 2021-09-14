import Error from 'next/error'
import {
  Box,
  Input,
  Divider,
  Card,
  Container,
  Text,
  Button,
  Heading,
  Flex,
  Grid
} from 'theme-ui'
import Icon from '@hackclub/icons'
import styled from '@emotion/styled'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import nookies, { destroyCookie } from 'nookies'
import { validateEmail, returnLocalizedMessage } from '../../../lib/helpers'

const SubmitStatus = styled(Text)`
  background: transparent url(/underline.svg) bottom left no-repeat;
  background-size: 100% 0.75rem;
  padding-bottom: 0.125rem;
`

const GreenSubmitStatus = styled(Text)`
  background: transparent url(/underline-green.svg) bottom left no-repeat;
  background-size: 100% 0.75rem;
  padding-bottom: 0.125rem;
`

export default function ApplicationHome({
  notFound,
  params,
  applicationsRecord,
  leaderRecord
}) {
  const [addingLeader, setAddingLeader] = useState(false)
  const [emailToInvite, setEmailToInvite] = useState('')
  const router = useRouter()
  async function sendInvite() {
    if (validateEmail(emailToInvite)) {
      const loginAPICall = await fetch(
        `/api/invite?email=${encodeURI(emailToInvite)}&id=${params.application}&locale=${router.locale}`
      ).then(r => r.json())
      if (loginAPICall.success) {
        alert(`✅ ${returnLocalizedMessage(router.locale, 'INVITED')}`)
        setEmailToInvite('')
        router.replace(router.asPath, null, { scroll: false })
      } else {
        console.error(loginAPICall)
        alert(`❌ ${returnLocalizedMessage(router.locale, 'ERROR')}`)
      }
    } else {
      alert(
        `❌ ${returnLocalizedMessage(router.locale, 'INVALID_EMAIL_ADDRESS')}`
      )
    }
  }
  async function deleteLeader(leaderID) {
    if (
      window.confirm(
        returnLocalizedMessage(
          router.locale,
          'ARE_YOU_SURE_REMOVE_AS_A_TEAM_MEMBER'
        )
      )
    ) {
      const deleteLeaderCall = await fetch(
        `/api/remove?id=${params.application}&leaderID=${leaderID}`
      ).then(r => r.json())
      if (deleteLeaderCall.success) {
        alert(`✅ ${returnLocalizedMessage(router.locale, 'REMOVED')}`)
        router.replace(router.asPath, null, { scroll: false })
      } else {
        console.error(deleteLeaderCall)
        alert(`❌ ${returnLocalizedMessage(router.locale, 'ERROR')}`)
      }
    }
  }
  async function submitApplication() {
    const submissionAPICall = await fetch(
      `/api/submit?id=${params.application}`
    ).then(r => r.json())
    if (submissionAPICall.success) {
      alert(`✅ ${returnLocalizedMessage(router.locale, 'SUBMITTED')}`)
      router.replace(router.asPath, null, { scroll: false })
    } else {
      console.error(submissionAPICall)
      alert(`❌ ${returnLocalizedMessage(router.locale, 'ERROR')}`)
    }
  }
  if (notFound) {
    return <Error statusCode="404" />
  }
  return (
    <Container py={4} variant="copy">
      <Card px={[4, 4]} py={[4, 4]} mt={1}>
        <Heading sx={{ fontSize: [4, 5] }}>
          {returnLocalizedMessage(router.locale, 'APPLICATION_STATUS_MESSAGE')}{' '}
          {applicationsRecord.fields['All Complete (incl Leaders)'] == 1 ? (
            <>
              {applicationsRecord.fields['Submitted'] ? (
                <>
                    {returnLocalizedMessage(
                      router.locale,
                      'APPLICATION_STATUS_MESSAGE_APPENDED_HAS_BEEN'
                    )}{' '}
                  <GreenSubmitStatus>
                    {returnLocalizedMessage(router.locale, 'SUBMITTED')}
                  </GreenSubmitStatus>
                </>
              ) : (
                <>
                  {returnLocalizedMessage(
                    router.locale,
                    'APPLICATION_STATUS_MESSAGE_APPENDED_IS'
                  )}{' '}
                  <SubmitStatus>
                    {returnLocalizedMessage(router.locale, 'READY')}
                  </SubmitStatus>
                </>
              )}
            </>
          ) : (
            <>
              {returnLocalizedMessage(
                router.locale,
                'APPLICATION_STATUS_MESSAGE_APPENDED_IS'
              )}{' '}
              <SubmitStatus>
                {returnLocalizedMessage(router.locale, 'IN_PROGRESS')}
              </SubmitStatus>
            </>
          )}
        </Heading>
        <Divider sx={{ color: 'slate', my: [3, 4] }} />
        <Link href={`/${params.application}/${params.leader}/club`}>
          <Flex
            sx={{
              alignItems: 'center',
              cursor: 'pointer',
              '> svg': { display: ['none', 'inline'] }
            }}
          >
            {applicationsRecord.fields['Completed'] == 1 ? (
              <Icon glyph="checkmark" color="#33d6a6" />
            ) : (
              <Icon glyph="important" color="#ff8c37" />
            )}
            <Heading
              sx={{
                flexGrow: 1,
                color: [
                  applicationsRecord.fields['Completed'] == 1
                    ? '#33d6a6'
                    : '#ff8c37',
                  'blue'
                ],
                ml: [0, 2]
              }}
              as="h1"
            >
              {returnLocalizedMessage(router.locale, 'YOUR_CLUB')}
            </Heading>
            <Icon glyph="view-forward" />
          </Flex>
        </Link>
        <Divider sx={{ color: 'slate', my: [3, 4] }} />
        <Link href={`/${params.application}/${params.leader}/leader`}>
          <Flex
            sx={{
              alignItems: 'center',
              cursor: 'pointer',
              '> svg': { display: ['none', 'inline'] }
            }}
          >
            {leaderRecord.fields['Completed'] == 1 ? (
              <Icon glyph="checkmark" color="#33d6a6" />
            ) : (
              <Icon glyph="important" color="#ff8c37" />
            )}

            <Heading
              sx={{
                flexGrow: 1,
                color: [
                  leaderRecord.fields['Completed'] == 1 ? '#33d6a6' : '#ff8c37',
                  'blue'
                ],
                ml: [0, 2]
              }}
              as="h1"
            >
              {returnLocalizedMessage(router.locale, 'MY_PERSONAL_PROFILE')}
            </Heading>
            <Icon glyph="view-forward" />
          </Flex>
        </Link>
        <Divider sx={{ color: 'slate', my: [3, 4] }} />
        <Flex sx={{ alignItems: 'center' }}>
          <Heading
            sx={{
              color: 'slate',
              ml: 1,
              flexGrow: 1,
              textTransform: 'uppercase'
            }}
          >
            {returnLocalizedMessage(router.locale, 'LEADERS')}
          </Heading>
          <Flex
            sx={{
              bg: (!addingLeader && !applicationsRecord.fields['Submitted']) ? 'green' : 'muted',
              borderRadius: '999px',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1,
              color: 'white',
              boxShadow: 'card',
              cursor: !applicationsRecord.fields['Submitted'] ? 'pointer' : 'not-allowed',
              transform: !addingLeader ? 'none' : 'rotate(180deg)',
              transition: 'transform ease-in-out 0.2s'
            }}
            onClick={() => applicationsRecord.fields['Submitted'] ? console.log('Already complete'):setAddingLeader(!addingLeader)}
          >
            <Icon glyph={!addingLeader ? 'member-add' : 'view-close'} />
          </Flex>
        </Flex>
        {addingLeader && (
          <Box>
            <Box
              mt={3}
              sx={{ display: ['block', 'flex'], alignItems: 'center' }}
            >
              <Input
                sx={{
                  border: '0.5px solid',
                  fontSize: 1,
                  borderColor: 'rgb(221, 225, 228)',
                  mr: [0, 3],
                  mb: [3, 0]
                }}
                onChange={e => setEmailToInvite(e.target.value)}
                value={emailToInvite}
                placeholder={returnLocalizedMessage(
                  router.locale,
                  'NEW_CO_LEADER_EMAIL'
                )}
              />
              <Flex
                sx={{
                  bg: 'blue',
                  borderRadius: '999px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 1,
                  color: 'white',
                  boxShadow: 'card',
                  height: '40px',
                  minWidth: '150px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
                onClick={() => sendInvite()}
              >
                <Icon glyph={'send-fill'} />
                <Text mr={2}>
                  {returnLocalizedMessage(router.locale, 'SEND_INVITE')}
                </Text>
              </Flex>
            </Box>
            <Grid columns={[1, 2]} mt={3}>
              <Flex
                sx={{
                  color: 'blue',
                  bg: 'rgb(230, 244, 252)',
                  borderRadius: 4,
                  px: 3,
                  py: 2,
                  alignItems: 'center',
                  '> svg': { display: ['none', 'inline'] }
                }}
              >
                <Icon glyph={'welcome'} size="40" />
                <Text ml={[0, 3]}>
                  {returnLocalizedMessage(
                    router.locale,
                    'GUIDE_FOR_SELECTING_TEAM'
                  )}{' '}
                  <Text as="b">
                    <a
                      href="https://workshops.hackclub.com/leadership_team/"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {returnLocalizedMessage(router.locale, 'HERE')}
                    </a>
                  </Text>
                  .
                </Text>
              </Flex>
              <Flex
                sx={{
                  color: 'blue',
                  bg: 'rgb(230, 244, 252)',
                  borderRadius: 4,
                  px: 3,
                  py: 2,
                  alignItems: 'center',
                  '> svg': { display: ['none', 'inline'] }
                }}
              >
                <Icon glyph={'leader'} size="40" />
                <Text ml={[0, 3]}>
                  {returnLocalizedMessage(router.locale, 'TEACHER_SPONSOR')}
                </Text>
              </Flex>
            </Grid>
            <Divider sx={{ color: 'slate', my: 4 }} />
          </Box>
        )}
        {applicationsRecord.fields['Leaders Emails'].map(
          (leaderEmail, leaderIndex) => (
            <Box
              key={leaderIndex}
              sx={{
                display: ['block', 'flex'],
                alignItems: 'center',
                mt: 3,
                flexWrap: 1
              }}
            >
              <Text
                sx={{
                  display: ['none', 'block']
                }}
              >
                <Icon
                  className="importantIcon"
                  glyph={
                    applicationsRecord.fields['Leaders Complete?'][leaderIndex]
                      ? 'checkmark'
                      : 'important'
                  }
                  color={
                    applicationsRecord.fields['Leaders Complete?'][leaderIndex]
                      ? '#33d6a6'
                      : '#ff8c37'
                  }
                />
              </Text>
              <Heading
                sx={{
                  color: [
                    applicationsRecord.fields['Leaders Complete?'][leaderIndex]
                      ? '#33d6a6'
                      : '#ff8c37',
                    'placeholder'
                  ],
                  ml: [0, 2],
                  transform: 'translateY(-4px)',
                  flexGrow: 1
                }}
                as="h2"
              >
                {leaderEmail}
              </Heading>
              <Text
                sx={{
                  cursor: 'pointer',
                  color: 'placeholder',
                  ':hover': { color: 'red' },
                  display: ['none', leaderEmail != leaderRecord['fields']['Email'] ? 'block' : 'none'],
                  transform: 'translateY(-0.2px)',
                  mr: '5px'
                }}
                onClick={() =>
                  deleteLeader(
                    applicationsRecord.fields['Prospective Leaders'][
                      leaderIndex
                    ]
                  )
                }
              >
                <Icon glyph="member-remove" />
              </Text>
              <Box
                sx={{
                  ':hover,:focus': applicationsRecord.fields['Submitted'] ? {} : { color: 'red' },
                  cursor: applicationsRecord.fields['Submitted'] ?"not-allowed" : 'pointer',
                  color: 'placeholder',
                  fontSize: '16px',
                  ml: [0, 2],
                  display: ['block', 'none']
                }}
                onClick={() =>
                  deleteLeader(
                    applicationsRecord.fields['Prospective Leaders'][
                      leaderIndex
                    ]
                  )
                }
              >
                Remove Leader
              </Box>
            </Box>
          )
        )}
        <Button
          sx={{
            mt: 4,
            width: '100%',
            textTransform: 'uppercase',
            ...(applicationsRecord.fields['All Complete (incl Leaders)'] != 1 ||
            applicationsRecord.fields['Submitted']
              ? {
                  opacity: 0.3,
                  ':hover,:focus': { transform: 'none', boxShadow: 'none', cursor: "not-allowed" }
                }
              : {})
          }}
          variant="ctaLg"
          onClick={() =>
            applicationsRecord.fields['All Complete (incl Leaders)'] != 1 ||
            applicationsRecord.fields['Submitted']
              ? console.log(`You're not done hacker.`)
              : submitApplication()
          }
        >
          {returnLocalizedMessage(router.locale, 'SUBMIT_YOUR_APPLICATION')}!
        </Button>
        <Button
          sx={{
            mt: 3,
            width: '100%',
            textTransform: 'uppercase',
            bg: 'muted'
          }}
          variant="lg"
          onClick={async () => {
            await destroyCookie(null, 'authToken', {
              path: '/'
            })
            router.push('/', '/', { scroll: false })
          }}
        >
          {returnLocalizedMessage(router.locale, 'LOGOUT')}
        </Button>
      </Card>
      <ContactCard router={router}/>
    </Container>
  )
}

const ContactCard = ({ router }) => (
  <Card
    px={[4, 4]}
    py={[3, 3]}
    mt={3}
    sx={{
      color: 'blue',
      display: 'flex',
      alignItems: 'center',
      '> svg': { display: ['none', 'inline'] }
    }}
    >
    <Icon glyph="message" />
    <Text sx={{ ml: 2 }}>
      {returnLocalizedMessage(router.locale, 'CONTACT_MESSAGE')}{' '}
      <b>
        <Text
          as="a"
          href={`mailto:${returnLocalizedMessage(
            router.locale,
            'CONTACT_EMAIL'
          )}`}
          sx={{
            color: 'blue',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
              textDecorationStyle: 'wavy'
            }
          }}
        >
          {returnLocalizedMessage(router.locale, 'CONTACT_EMAIL')}
        </Text>
      </b>
      !
    </Text>
  </Card>
)

export async function getServerSideProps({ res, req, params }) {
  const {
    prospectiveLeadersAirtable,
    applicationsAirtable
  } = require('../../../lib/airtable')
  const cookies = nookies.get({ req })
  if (cookies.authToken) {
    try {
      const leaderRecord = await prospectiveLeadersAirtable.find(
        'rec' + params.leader
      )
      const applicationsRecord = await applicationsAirtable.find(
        'rec' + params.application
      )
      if (leaderRecord.fields['Accepted Tokens'].includes(cookies.authToken)) {
        return { props: { params, applicationsRecord, leaderRecord } }
      } else {
        res.statusCode = 302
        res.setHeader('Location', `/`)
        return
      }
    } catch (e) {
      console.log(e)
      res.statusCode = 302
      res.setHeader('Location', `/`)
      return
    }
  } else {
    res.statusCode = 302
    res.setHeader('Location', `/`)
    return
  }
}
