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
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import nookies, { destroyCookie } from 'nookies'
import { returnLocalizedMessage, validateEmail } from '../../../lib/helpers'
import TimelineCard from '../../../components/Timeline'

export default function ApplicationReview({
  notFound,
  params,
  applicationsRecord,
  leaderRecord,
  trackerRecord
}) {
  const router = useRouter()
  const [inviteMessage, setInviteMessage] = useState('')
  const [submitButton, setSubmitButton] = useState(
    `${returnLocalizedMessage(router.locale, 'SUBMIT_YOUR_APPLICATION')}`
  )
  const [emailToInvite, setEmailToInvite] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [warning, setWarning] = useState(false)
  const [acceptCOC, setAcceptCOC] = useState(false)

  async function sendInvite() {
    if (validateEmail(emailToInvite)) {
      const loginAPICall = await fetch(
        `/api/invite?email=${encodeURIComponent(emailToInvite)}&id=${
          params.application
        }&locale=${router.locale}`
      ).then(r => r.json())
      if (loginAPICall.success) {
        setInviteMessage([
          applicationsRecord.fields['Prospective Leaders'][
            applicationsRecord.fields['Prospective Leaders'].length + 1
          ],
          `✅ ${returnLocalizedMessage(router.locale, 'INVITED')}`
        ])
        setEmailToInvite('')
        setErrorMessage(null)
        router.replace(router.asPath, null, { scroll: false })
      } else {
        console.error(loginAPICall)
        setInviteMessage([
          applicationsRecord.fields['Prospective Leaders'][
            applicationsRecord.fields['Prospective Leaders'].length + 1
          ],
          `✅ ${returnLocalizedMessage(router.locale, 'INVITED')}`
        ])
        setErrorMessage(`❌ ${returnLocalizedMessage(router.locale, 'ERROR')}`)
      }
    } else {
      setErrorMessage(
        `❌ ${returnLocalizedMessage(router.locale, 'INVALID_EMAIL_ADDRESS')}`
      )
    }
  }

  async function deleteLeader(leaderID) {
    const deleteLeaderCall = await fetch(
      `/api/remove?id=${params.application}&leaderID=${leaderID}`
    ).then(r => r.json())
    if (deleteLeaderCall.success) {
      setInviteMessage(`✅ ${returnLocalizedMessage(router.locale, 'REMOVED')}`)
      router.replace(router.asPath, null, { scroll: false })
    } else {
      console.error(deleteLeaderCall)
      setInviteMessage(`❌ ${returnLocalizedMessage(router.locale, 'ERROR')}`)
    }
  }
  async function submitApplication() {
    const submissionAPICall = await fetch(
      `/api/submit?id=${params.application}`
    ).then(r => r.json())
    if (submissionAPICall.success) {
      setSubmitButton(
        `✅ ${returnLocalizedMessage(router.locale, 'SUBMITTED')}`
      )
      router.push(`/${params.application}/${params.leader}/status`)
    } else {
      console.error(submissionAPICall)
      setSubmitButton(`❌ ${returnLocalizedMessage(router.locale, 'ERROR')}`)
    }
  }

  if (notFound) {
    return <Error statusCode="404" />
  }
  return (
    <Container py={4} variant="copy">
      <TimelineCard
        router={router}
        applicationsRecord={applicationsRecord}
        leaderRecord={leaderRecord}
        trackerRecord={trackerRecord}
        params={params}
      />
      <Card px={[4, 4]} py={[4, 4]} mt={1}>
        <Heading sx={{ fontSize: [3, 4] }}>
          <Text>
            {applicationsRecord.fields['Submitted'] ? (
              <Text>
                {returnLocalizedMessage(router.locale, 'YOUVE_SUBMITTED')}{' '}
                <Link href={`/${params.application}/${params.leader}/status`}>
                  {returnLocalizedMessage(router.locale, 'CHECK_CLUB_STATUS')}
                </Link>
              </Text>
            ) : (
              <Text>
                {returnLocalizedMessage(
                  router.locale,
                  'LETS_REVIEW_EVERYTHING'
                )}
              </Text>
            )}
          </Text>
        </Heading>
        <Divider sx={{ color: 'slate', my: [3, 4] }} />
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
                      ? 'leaders'
                      : 'leaders'
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
              {warning ? (
                <>
                  <Text
                    sx={{
                      cursor: 'pointer',
                      color: 'placeholder',
                      ':hover': { color: 'red' },
                      display: [
                        'none',
                        leaderEmail != leaderRecord['fields']['Email']
                          ? 'block'
                          : 'none'
                      ],
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
                    {applicationsRecord.fields['Prospective Leaders'][
                      leaderIndex
                    ] === inviteMessage[0] || inviteMessage[0] === null
                      ? `${inviteMessage[1]}`
                      : null}
                  </Text>
                </>
              ) : null}

              <Text
                sx={{
                  cursor: 'pointer',
                  color: 'placeholder',
                  ':hover': { color: 'slate' },
                  display: [
                    'none',
                    leaderEmail != leaderRecord['fields']['Email']
                      ? 'block'
                      : 'none'
                  ],
                  transform: 'translateY(-0.2px)',
                  mr: '5px',
                  mb: `${
                    warning &&
                    applicationsRecord.fields['Prospective Leaders'][
                      leaderIndex
                    ] === inviteMessage[0]
                      ? '-8px'
                      : '0px'
                  }`
                }}
                onClick={() => (
                  setInviteMessage([
                    applicationsRecord.fields['Prospective Leaders'][
                      leaderIndex
                    ],
                    returnLocalizedMessage(router.locale, 'ARE_YOU_SURE')
                  ]),
                  setWarning(!warning)
                )}
              >
                <Icon
                  glyph={
                    warning &&
                    applicationsRecord.fields['Prospective Leaders'][
                      leaderIndex
                    ] === inviteMessage[0]
                      ? 'menu'
                      : 'member-remove'
                  }
                />
              </Text>
              <Box
                sx={{
                  ':hover,:focus': applicationsRecord.fields['Submitted']
                    ? {}
                    : { color: 'red' },
                  cursor: applicationsRecord.fields['Submitted']
                    ? 'not-allowed'
                    : 'pointer',
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
              ></Box>
            </Box>
          )
        )}
        <Box mt={3} sx={{ display: ['block', 'flex'], alignItems: 'center' }}>
          <Input
            sx={{
              border: '0.5px solid',
              fontSize: 1,
              borderColor: 'rgb(221, 225, 228)',
              mr: [0, 3],
              mb: [3, 0]
            }}
            disabled={applicationsRecord.fields['Submitted'] ? true : false}
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
              cursor: `${
                applicationsRecord.fields['Submitted']
                  ? 'not-allowed'
                  : 'pointer'
              }`
            }}
            onClick={() => sendInvite()}
          >
            <Icon glyph={'send-fill'} />
            <Text mr={2}>
              {returnLocalizedMessage(router.locale, 'SEND_INVITE')}
            </Text>
          </Flex>
        </Box>
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
              <Icon glyph="profile" color="#33d6a6" />
            ) : (
              <Icon glyph="profile" color="#ff8c37" />
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
        <Link href={`/${params.application}/${params.leader}/club`}>
          <Flex
            sx={{
              alignItems: 'center',
              cursor: 'pointer',
              '> svg': { display: ['none', 'inline'] }
            }}
          >
            {applicationsRecord.fields['Completed'] == 1 ? (
              <Icon glyph="flag" color="#33d6a6" />
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
        <Heading
          sx={{
            color: 'slate',
            ml: 1,
            flexGrow: 1,
            textTransform: 'uppercase'
          }}
        >
          <a
            target="_blank"
            href="https://hackclub.com/conduct"
            style={{ textDecoration: 'none' }}
          >
            <Text
              sx={{
                color: 'slate',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                  textDecorationStyle: 'wavy'
                }
              }}
            >
              {returnLocalizedMessage(router.locale, 'CODE_OF_CONDUCT')}
            </Text>
          </a>
        </Heading>
        <Flex
          sx={{
            alignItems: 'center',
            cursor: 'pointer',
            mt: '20px',
            '> svg': { display: ['none', 'inline'] }
          }}
        >
          {acceptCOC || applicationsRecord.fields['Submitted'] ? (
            <Icon
              glyph="checkmark"
              color="#33d6a6"
              onClick={() => setAcceptCOC(false)}
            />
          ) : (
            <Icon
              glyph="checkbox"
              color="#000000"
              onClick={() => setAcceptCOC(true)}
            />
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
            as="h3"
          >
            <Text onClick={() => setAcceptCOC(!acceptCOC)}>
              {returnLocalizedMessage(router.locale, 'THE_TEAM_AGREES')}
            </Text>{' '}
            <a
              target="_blank"
              href="https://hackclub.com/conduct"
              style={{ textDecoration: 'none' }}
            >
              <Text
                sx={{
                  color: 'blue',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  '&:hover': { textDecorationStyle: 'wavy' }
                }}
              >
                {returnLocalizedMessage(
                  router.locale,
                  'HACK_CLUB_CODE_OF_CONDUCT'
                )}
              </Text>
            </a>
          </Heading>
        </Flex>

        <Button
          sx={{
            mt: 4,
            width: '100%',
            textTransform: 'uppercase',
            ...(applicationsRecord.fields['All Complete (incl Leaders)'] != 1 ||
            acceptCOC === false ||
            applicationsRecord.fields['Submitted']
              ? {
                  opacity: 0.3,
                  ':hover,:focus': {
                    transform: 'none',
                    boxShadow: 'none',
                    cursor: 'not-allowed'
                  }
                }
              : {})
          }}
          variant="ctaLg"
          onClick={() =>
            applicationsRecord.fields['All Complete (incl Leaders)'] != 1 ||
            acceptCOC === false ||
            applicationsRecord.fields['Submitted']
              ? console.log(`You're not done hacker.`)
              : submitApplication()
          }
        >
          {submitButton}
        </Button>
      </Card>
      <Box
        sx={{
          display: ['none', 'flex'],
          position: 'fixed',
          left: '10px',
          bottom: '10px',
          cursor: 'pointer',
          placeItems: 'center',
          background: '#00000002',
          px: 2,
          borderRadius: '15px'
        }}
        onClick={async () => {
          await destroyCookie(null, 'authToken', {
            path: '/'
          })
          router.push('/', '/', { scroll: false })
        }}
      >
        <Icon
          glyph="door-leave"
          sx={{
            color: '#000000',
            opacity: 0.8
          }}
        />
        <Text
          sx={{
            color: 'slate',
            opacity: 0.9,
            fontWeight: '800',
            textTransform: 'uppercase',
            opacity: 1,
            display: ['none', 'none', 'none', 'grid'],
            transition: '0.5s ease-in-out',
            mx: '5px',
            ':hover,:focus': {
              opacity: 1,
              transition: '0.5s ease-in-out',
              color: '#ec3750'
            }
          }}
        >
          {returnLocalizedMessage(router.locale, 'LOGOUT')}
        </Text>
      </Box>
      <ContactCard router={router} />
      <OpenSourceCard router={router} />
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
      {returnLocalizedMessage(router.locale, 'CONTACT_MESSAGE_FRONT')}{' '}
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
      </b>{' '}
      {returnLocalizedMessage(router.locale, 'CONTACT_MESSAGE_BACK')}
    </Text>
  </Card>
)

const OpenSourceCard = ({ router }) => {
  return (
    <Box
      sx={{
        display: ['none', 'flex'],
        position: 'fixed',
        right: '10px',
        bottom: '10px',
        cursor: 'pointer',
        placeItems: 'center',
        background: '#00000002',
        px: 2,
        borderRadius: '15px'
      }}
      onClick={async () => {
        await destroyCookie(null, 'authToken', {
          path: '/'
        })
        router.push('/', '/', { scroll: false })
      }}
    >
      <Text
        sx={{
          color: 'slate',
          opacity: 0.9,
          fontWeight: '800',
          textTransform: 'uppercase',
          opacity: 1,
          display: ['none', 'none', 'none', 'grid'],
          transition: '0.5s ease-in-out',
          mx: '5px',
          ':hover,:focus': {
            opacity: 1,
            transition: '0.5s ease-in-out',
            color: '#ec3750'
          }
        }}
      >
        {returnLocalizedMessage(router.locale, 'PROUDLY_OPEN_SOURCE')}
      </Text>
      <Icon
        glyph="github"
        sx={{
          color: '#000000',
          opacity: 0.8
        }}
      />
    </Box>
  )
}

export async function getServerSideProps({ res, req, params }) {
  const {
    prospectiveLeadersAirtable,
    applicationsAirtable,
    trackerAirtable
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
      const trackerRecord = await trackerAirtable.read({
        filterByFormula: `{App ID} = "rec${params.application}"`,
        maxRecords: 1
      })
      if (leaderRecord.fields['Accepted Tokens'].includes(cookies.authToken)) {
        return {
          props: { params, applicationsRecord, leaderRecord, trackerRecord }
        }
      } else {
        res.statusCode = 302
        res.setHeader('Location', `/`)
        return
      }
    } catch (e) {
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
