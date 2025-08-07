import Error from 'next/error'
import { Box, Divider, Card, Container, Text, Heading } from 'theme-ui'
import Icon from '@hackclub/icons'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import nookies, { destroyCookie } from 'nookies'
import { returnLocalizedMessage } from '../../../lib/helpers'
import TimelineCard from '../../../components/Timeline'
import ConfettiOnSuccess from '../../../components/ConfettiOnSuccess'

export default function ApplicationOnboarding({
  notFound,
  params,
  applicationsRecord,
  leaderRecord,
  trackerRecord
}) {
  const router = useRouter()
  const [applicationMessage, setApplicationMessage] = useState(
    returnLocalizedMessage(router.locale, 'PROCESSING')
  )
  const [messageColor, setMessageColor] = useState('#000000')
  const applicationStatus = trackerRecord[0]?.fields.Status
  if (notFound) {
    return <Error statusCode="404" />
  }
  console.log(applicationStatus)
  useEffect(() => {
    {
      applicationStatus === 'applied'
        ? (setApplicationMessage(
          `${returnLocalizedMessage(router.locale, 'IS_BEING_REVIEWED')}`
        ),
          setMessageColor('#000000'))
        : applicationStatus === 'rejected'
          ? (setApplicationMessage(
            `${returnLocalizedMessage(router.locale, 'REJECTED')}`
          ),
            setMessageColor('#ec3750'))
          : applicationStatus === 'awaiting onboarding'
            ? (setApplicationMessage(
              `${returnLocalizedMessage(router.locale, 'ACCEPTED')}`
            ),
              setMessageColor('#33d6a6'))
            : applicationStatus === 'onboarded'
              ? (setApplicationMessage(
                `${returnLocalizedMessage(router.locale, 'ACCEPTED')}`
              ),
                setMessageColor('#33d6a6'))
              : applicationStatus === 'inactive'
                ? (setApplicationMessage(
                  `${returnLocalizedMessage(router.locale, 'INACTIVE')}`
                ),
                  setMessageColor('#ff8c37'))
                : (setApplicationMessage(
                  `${returnLocalizedMessage(router.locale, 'PROCESSING')}`
                ),
                  setMessageColor('#000000'))
    }
  }, [])

  console.log(trackerRecord[0]?.fields['Status'])

  useEffect(() => {
    if (
      applicationsRecord.fields['Submitted'] === undefined ||
      applicationsRecord.fields['Submitted'] === null
    ) {
      if (applicationsRecord.fields['All Complete (incl Leaders)'] === 1) {
        setApplicationMessage(
          returnLocalizedMessage(router.locale, 'IS_INCOMPLETE')
        )
        router.push(`/${params.application}/${params.leader}/review`)
      }
    } else if (
      trackerRecord[0]?.fields.Status === undefined &&
      applicationsRecord.fields['Submitted']
    ) {
      setTimeout(() => {
        router.reload()
      }, 500)
    }
  }, [applicationStatus])

  return (
    <Container
      py={4}
      variant="copy"
      sx={{
        overflowY: 'hidden',
        overflowX: 'hidden'
      }}
    >
      {applicationStatus != 'rejected' &&
        applicationStatus !== 'inactive' &&
        applicationStatus != null ? (
        <ConfettiOnSuccess applicationStatus={applicationStatus} />
      ) : null}

      <TimelineCard
        router={router}
        applicationsRecord={applicationsRecord}
        leaderRecord={leaderRecord}
        trackerRecord={trackerRecord}
        params={params}
      />
      <Card px={[4, 4]} py={[4, 4]} mt={1}>
        <Heading sx={{ fontSize: [3, 4] }} as="h2">
          <Text
            sx={{
              color: messageColor,
              textAlign: 'center',
              alignItems: 'center'
            }}
          >
            {returnLocalizedMessage(router.locale, 'YOUR_APPLICATION')}{' '}
            {applicationMessage}
          </Text>
        </Heading>
        <Divider sx={{ color: 'slate', my: [2, 3] }} />

        {applicationStatus === 'applied' ? (
          <>
            <Box sx={{ fontSize: [1, 2], mb: '30px', pt: '1rem' }}>
              <Text>
                {returnLocalizedMessage(router.locale, 'EYE_ON_EMAIL')}
              </Text>
            </Box>
            <Heading sx={{ fontSize: [2, 3] }} as="h4">
              <Text>
                {returnLocalizedMessage(router.locale, 'WHILE_YOU_WAIT')}
              </Text>
            </Heading>
            <Box
              sx={{
                marginTop: '1rem'
              }}
            >
              <Text>
                {returnLocalizedMessage(router.locale, 'AS_A_LEADER')}{' '}
                <b>
                  <Text
                    sx={{
                      color: 'black',
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline',
                        textDecorationStyle: 'wavy'
                      }
                    }}
                    as="b"
                  >
                    {returnLocalizedMessage(router.locale, 'THREE_KEY_RESOURCES')}
                  </Text>
                </b>
                <ol>
                  <li>{returnLocalizedMessage(router.locale, 'YSWS')}</li>
                  <li>{returnLocalizedMessage(router.locale, 'PIZZA')}</li>
                  <li>
                    {returnLocalizedMessage(router.locale, 'HCB')}
                  </li>
                </ol>
              </Text>
              <Box sx={{ my: '1rem' }}>
                <iframe
                  width="80%"
                  height="315"
                  src="https://www.youtube.com/embed/H5RPsCMl3uM"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </Box>
            </Box>

            <Box
              sx={{
                marginTop: '1rem'
              }}
            >
              <Text>
                {returnLocalizedMessage(router.locale, 'SLACK_DETAILS_FRONT')}{' '}
                <a
                  style={{ textDecoration: 'none', color: 'black' }}
                  href="https://hackclub.com/slack"
                  target="_blank"
                >
                  <Text
                    sx={{
                      color: 'black',
                      '&:hover': {
                        textDecoration: 'underline',
                        textDecorationStyle: 'wavy'
                      }
                    }}
                    as="b"
                  >
                    {returnLocalizedMessage(
                      router.locale,
                      'SLACK_DETAILS_MIDDLE'
                    )}
                  </Text>
                </a>{' '}
                {returnLocalizedMessage(router.locale, 'SLACK_DETAILS_END')}
              </Text>
              <Box
                sx={{
                  marginTop: ['0.5rem', '1rem']
                }}
              >
                <a href="https://hackclub.com/slack" target="_blank">
                  <video autoPlay muted width="80%" height="auto">
                    <source
                      src="https://cdn.glitch.me/2d637c98-ed35-417a-bf89-cecc165d7398%2Foutput-no-duplicate-frames.hecv.mp4"
                      type="video/mp4"
                    />
                  </video>
                </a>
              </Box>
            </Box>
            <Box
              style={{
                marginTop: '1rem'
              }}
            >
              <Text>
                <Box>
                  <a
                    style={{ textDecoration: 'none' }}
                    href="https://www.youtube.com/watch?v=hiG3fYq3xUU"
                    target="_blank"
                  >
                    <Text
                      sx={{
                        color: 'black',
                        '&:hover': {
                          textDecoration: 'underline',
                          textDecorationStyle: 'wavy'
                        }
                      }}
                    >
                      <b>{returnLocalizedMessage(router.locale, 'BOREAL')}</b>
                    </Text>
                  </a>{' '}
                  {returnLocalizedMessage(router.locale, 'BOREAL_DETAILS_1')}
                </Box>
                <Box sx={{ marginTop: '0.5em' }}> {returnLocalizedMessage(router.locale, 'BOREAL_DETAILS_2')} </Box>
                <Box sx={{ marginTop: '0.5em' }}> {returnLocalizedMessage(router.locale, 'BOREAL_DETAILS_3')} </Box>
              </Text>
              <Box sx={{ my: '1rem' }}>
                <iframe
                  width="80%"
                  height="315"
                  src="https://www.youtube.com/embed/hiG3fYq3xUU"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </Box>
            </Box>
          </>
        ) : applicationStatus === 'rejected' ? (
          <>
            <Heading sx={{ fontSize: [1, 2], fontWeight: '400' }} as="p">
              <Text>
                {returnLocalizedMessage(
                  router.locale,
                  'PLEASE_REACH_OUT_REJECTION'
                )}
              </Text>
              <b>
                <Text
                  as="a"
                  href={`mailto:${returnLocalizedMessage(
                    router.locale,
                    'CONTACT_EMAIL'
                  )}`}
                  sx={{
                    color: 'black',
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
              <Text>
                {returnLocalizedMessage(router.locale, 'FOR_MORE_INFO')}
              </Text>
            </Heading>
          </>
        ) : applicationStatus === 'inactive' ? (
          <>
            <Heading sx={{ fontSize: [1, 2], fontWeight: '400' }} as="p">
              <Text>
                {returnLocalizedMessage(
                  router.locale,
                  'PLEASE_REACH_OUT_REJECTION'
                )}
              </Text>
              <b>
                <Text
                  as="a"
                  href={`mailto:${returnLocalizedMessage(
                    router.locale,
                    'CONTACT_EMAIL'
                  )}`}
                  sx={{
                    color: 'black',
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
              <Text>
                {returnLocalizedMessage(router.locale, 'FOR_MORE_INFO')}
              </Text>
            </Heading>
          </>
        ) : applicationStatus === 'awaiting onboarding' ? (
          <>
            <Heading sx={{ fontSize: [2, 3], mb: '30px' }} as="h3">
              <Text>
                {returnLocalizedMessage(router.locale, 'EXCITED_TO_HAVE_YOU')}
              </Text>
            </Heading>
            <Box sx={{ fontSize: [1, 2], mb: '30px' }}>
              <Text>
                {returnLocalizedMessage(router.locale, 'SCHEDULED_ONBOARDING')}{' '}
                <b>
                  {trackerRecord[0].fields['Ambassador'] === 'HQ'
                    ? 'Holly from HQ.'
                    : trackerRecord[0].fields['Ambassador'] === 'APAC'
                      ? 'Anna and Harsh from Hack Club APAC.'
                      : 'Hack Club HQ.'}
                </b>{' '}
                {returnLocalizedMessage(
                  router.locale,
                  'CHECK_YOUR_EMAIL_ONBOARDING'
                )}
              </Text>
            </Box>
            <Box sx={{ mb: '30px' }}>
              <img
                width="70%"
                height="100%"
                src="https://telltaletv.com/wp-content/uploads/2016/08/picture-of-seinfeld-group-jumping-at-the-door-gif.gif"
              />
            </Box>
          </>
        ) : applicationStatus === 'onboarded' ? (
          <>
            <Heading sx={{ fontSize: [2, 3], mb: '30px', pt: '1rem' }} as="h3">
              <Text>
                {returnLocalizedMessage(router.locale, 'EXCITED_TO_HAVE_YOU')}
              </Text>
            </Heading>
            <Box sx={{ fontSize: [1, 2], mb: '30px' }}>
              <Text>
                {returnLocalizedMessage(router.locale, 'COMPLETE_MESSAGE')}
              </Text>
            </Box>
            <Box sx={{ mb: '30px' }}>
              <img
                width="60%"
                height="100%"
                src="https://media-exp1.licdn.com/dms/image/C4E22AQG_keow32-aVQ/feedshare-shrink_2048_1536/0/1632869420418?e=2147483647&v=beta&t=245AFJt0i_YVl5VibSxjuHRGMIWt7Z5J14Gr0vA_DlA"
              />
            </Box>
          </>
        ) : null}
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
          style={{
            color: 'placeholder',
            opacity: 0.9
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
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    } catch (e) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
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
