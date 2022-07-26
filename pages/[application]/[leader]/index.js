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
import TimelineCard from '../../../components/Timeline'

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
  leaderRecord,
  trackerRecord
}) {
  const [inviteMessage, setInviteMessage] = useState([])
  const [warning, setWarning] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [emailToInvite, setEmailToInvite] = useState('')
  const router = useRouter()
  
  async function sendInvite() {
    if (validateEmail(emailToInvite)) {
      const loginAPICall = await fetch(
        `/api/invite?email=${encodeURIComponent(emailToInvite)}&id=${params.application}&locale=${router.locale}`
      ).then(r => r.json())
      if (loginAPICall.success) {
        setInviteMessage([applicationsRecord.fields['Prospective Leaders'][applicationsRecord.fields['Prospective Leaders'].length + 1], `✅ ${returnLocalizedMessage(router.locale, 'INVITED')}`])
        setEmailToInvite('')
        setErrorMessage(null)
        router.replace(router.asPath, null, { scroll: false })
      } else {
        console.error(loginAPICall)
        setInviteMessage([applicationsRecord.fields['Prospective Leaders'][applicationsRecord.fields['Prospective Leaders'].length + 1], `✅ ${returnLocalizedMessage(router.locale, 'INVITED')}`])
        setErrorMessage(`❌ ${returnLocalizedMessage(router.locale, 'ERROR')}`)
      }
    } else {
      setErrorMessage(`❌ ${returnLocalizedMessage(router.locale, 'INVALID_EMAIL_ADDRESS')}`)
    }
  }
  async function deleteLeader(leaderID) {
  {
      const deleteLeaderCall = await fetch(
        `/api/remove?id=${params.application}&leaderID=${leaderID}`
      ).then(r => r.json())
      if (deleteLeaderCall.success) {
        setInviteMessage(`✅ ${returnLocalizedMessage(router.locale, 'REMOVED')}`)
        setErrorMessage(null)
        router.replace(router.asPath, null, { scroll: false })
      } else {
        console.error(deleteLeaderCall)
        setErrorMessage(`❌ ${returnLocalizedMessage(router.locale, 'ERROR')}`)
      }
    }
  }

  if (notFound) {
    return <Error statusCode="404" />
  }
  return (
    <Container py={4} variant="copy">
      <TimelineCard router={router} applicationsRecord={applicationsRecord} leaderRecord={leaderRecord} trackerRecord={trackerRecord} params={params} />
      <Card px={[4, 4]} py={[4, 4]} mt={1}>
        
        <Heading sx={{ fontSize: [3, 4], alignItems: 'center', textAlign: 'center' }}>
          <Text>{returnLocalizedMessage(router.locale, 'UP_AND_RUNNING')}</Text>
        </Heading>
        <Box
                sx={{
                  color: 'black',
                  fontSize: '16px',
                  mt: [3],
                }}
              >
                <Text sx={{ alignItems: 'center', textAlign: 'center' }}>{returnLocalizedMessage(router.locale, 'LEARN_MORE_ABOUT_YOU')}</Text>
                <ol>
                  <li>{returnLocalizedMessage(router.locale, "INVITE_COLEADS")}</li>
                  <li>{returnLocalizedMessage(router.locale, "COMPLETE_THE")} <b>{returnLocalizedMessage(router.locale, "5_MINUTE_LEADER")}</b> {returnLocalizedMessage(router.locale, "GET_TO_KNOW_YOU")}</li>
                  <li>{returnLocalizedMessage(router.locale, "FILL_OUT_THE")} <b>{returnLocalizedMessage(router.locale, "5_MINUTE_CLUB")}</b> {returnLocalizedMessage(router.locale, "PERSONALIZE_CLUB")}</li>
                  <li>{returnLocalizedMessage(router.locale, "WAIT_24_HOURS")} <b>{returnLocalizedMessage(router.locale, "30_MINUTE_CHAT")}</b> {returnLocalizedMessage(router.locale, "PLAN_OUT_NEXT_YEAR")}</li>
                  <li>{returnLocalizedMessage(router.locale, "FIRST_MEETING")}</li>
                </ol>
              </Box>
        <Divider sx={{ color: 'slate', my: [3, 4] }} />
        <Heading
            sx={{
              color: 'slate',
              ml: 1,
              flexGrow: 1,
              textTransform: 'uppercase',
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
                flexWrap: 1,
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
                      : '#33d6a6'
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
              {warning ? (<>
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
                {applicationsRecord.fields['Prospective Leaders'][leaderIndex] === inviteMessage[0] || inviteMessage[0] === null ? `${inviteMessage[1]}` : null}
              </Text>
              </>) : (null)}
              
              <Text
                sx={{
                  cursor: 'pointer',
                  color: 'placeholder',
                  ':hover': { color: 'slate' },
                  display: ['none', leaderEmail != leaderRecord['fields']['Email'] ? 'block' : 'none'],
                  transform: 'translateY(-0.2px)',
                  mr: '5px',
                  mb: `${warning && applicationsRecord.fields['Prospective Leaders'][leaderIndex] === inviteMessage[0] ? '-8px' : '0px'}`
                }}
                onClick={() => (
                  setInviteMessage([applicationsRecord.fields['Prospective Leaders'][leaderIndex], returnLocalizedMessage(router.locale, "ARE_YOU_SURE")]),
                  setWarning(!warning)
                )
            }
              >
                  <Icon glyph={warning && applicationsRecord.fields['Prospective Leaders'][leaderIndex] === inviteMessage[0] ? "menu" : "member-remove"}  />
              </Text>
              <Box
                sx={{
                  ':hover,:focus': applicationsRecord.fields['Submitted'] ? {} : { color: 'red' },
                  cursor: applicationsRecord.fields['Submitted'] ? "not-allowed" : 'pointer',
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
    {errorMessage ? (<>
      <Box sx={{
        pt: 4,
      }}>
        <Text as="b">
        {errorMessage}
        </Text>
        </Box>    
        </>) : (null)}
          <Box>
            <Box
              mt={4}
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
                  '> svg': { display: ['none', 'inline'] },
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
                      target="_blank"
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
                  '> svg': { display: ['inline'] }
                }}
              >
                <Icon glyph={'leader'} size="40" />
                <Text ml={[0, 3]}>
                  {returnLocalizedMessage(router.locale, 'TEACHER_SPONSOR')}
                </Text>
              </Flex>
            </Grid>
          </Box>

        <Button
          sx={{
            mt: 4,
            width: '100%',
            textTransform: 'uppercase',}}
          variant="ctaLg"
          onClick={() =>
            router.push(`/${params.application}/${params.leader}/leader`)
          }
        >
          {returnLocalizedMessage(router.locale, "LETS_GET_TO_KNOW_YOU")} <Icon glyph="view-forward" />
        </Button>  
      </Card>
      
      <ContactCard router={router}/>
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
<Icon glyph="door-leave" style={{
    color: '#000000',
    opacity: 0.8,
  }}/>
<Text
    sx={{
      color: '#000000',
      fontWeight: '800',
      textTransform: 'uppercase',
      opacity: 1,
      transition: '0.5s ease-in-out',
      mx: '5px',
      ':hover,:focus': {
        opacity: 1,
        transition: '0.5s ease-in-out',
        color: '#ec3750',
      }
    }}
  >
    {returnLocalizedMessage(router.locale, "LOGOUT")}
  </Text>
  </Box>
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
        
      </b>
      {' '}{returnLocalizedMessage(router.locale, 'CONTACT_MESSAGE_BACK')}
    </Text>
  </Card>
)

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
          maxRecords: 1,
    })
      if (leaderRecord.fields['Accepted Tokens'].includes(cookies.authToken)) {
        return { props: { params, applicationsRecord, leaderRecord, trackerRecord } }
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
>
  
  <Text
    sx={{
      color: '#ec3750',
      fontWeight: '800',
      textTransform: 'uppercase',
      transition: '0.5s ease-in-out',
      opacity: 1,
      mx: '5px',
      ':hover,:focus': {
        opacity: 1,
        transition: '0.5s ease-in-out',
        color: '#ec3750',
      }
    }}
  >
    <a target="_blank" href="https://github.com/hackclub/apply" style={{ textDecoration: 'none'}}>
      <Text sx={{
        textDecoration: 'none',
        color: '#ec3750',
        opacity: 0.8,
        transition: '0.2s ease-in-out',
        '&:hover': {
          opacity: 1,
          transition: '0.2s ease-in-out',
        }
      }}>
      {returnLocalizedMessage(router.locale, "PROUDLY_OPEN_SOURCE")}
    </Text>
    </a>
  </Text>
  <a target="_blank" href="https://github.com/hackclub/apply" style={{ textDecoration: 'none'}}>
  <Icon glyph="github" style={{
    color: '#000000',
    opacity: 0.8,
  }}/>
  </a>
  
  </Box>
)
}