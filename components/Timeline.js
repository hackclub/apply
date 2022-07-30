import { Box, Card, Text, Flex } from 'theme-ui'
import Icon from '@hackclub/icons'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { returnLocalizedMessage } from '../lib/helpers'

export default function TimelineCard({
  params,
  applicationsRecord,
  leaderRecord,
  trackerRecord,
  saved
}) {
  const [clubProgress, setClubProgress] = useState(
    (Object.keys(applicationsRecord.fields).length - 6) / 10
  )
  const [leaderProgress, setLeaderProgress] = useState(
    (Object.keys(leaderRecord.fields).length - 7) / 9
  )
  const [status, setStatus] = useState(0)
  const [submission, setSubmission] = useState(0)
  const applicationStatus = trackerRecord[0]?.fields.Status
  const router = useRouter()

  useEffect(() => {
    if (leaderProgress > 1) {
      setLeaderProgress(1)
    } else if (leaderProgress < 0) {
      setLeaderProgress(0)
    }
    if (clubProgress > 1) {
      setClubProgress(1)
    } else if (clubProgress < 0) {
      setClubProgress(0)
    }

    applicationsRecord.fields['Submitted']
      ? setSubmission(100)
      : setSubmission(0)
  }, [saved])

  useEffect(() => {
    if (applicationStatus === 'rejected') {
      setStatus(100)
    } else if (applicationsRecord.fields['Submitted'] != 1) {
      setStatus(0)
    } else if (applicationStatus === 'awaiting onboarding') {
      setStatus(75)
    } else if (applicationStatus === 'applied') {
      setStatus(25)
    } else if (applicationStatus === 'onboarded') {
      setStatus(100)
    } else {
      setStatus(0)
    }
  }, [])

  const timelineRouting = [
    {
      href: `/${params.application}/${params.leader}`,
      color: '#33d6a6',
      icon: 'home',
      progress: null,
      value: returnLocalizedMessage(router.locale, 'HOME'),
      slug: ''
    },
    {
      href: `/${params.application}/${params.leader}/leader`,
      color: '#33d6a6',
      icon: 'profile',
      progress: `${leaderProgress * 100}%`,
      value: returnLocalizedMessage(router.locale, 'LEADER_PROFILE'),
      slug: 'leader'
    },
    {
      href: `/${params.application}/${params.leader}/club`,
      color: '#33d6a6',
      icon: 'flag',
      progress: `${clubProgress * 100}%`,
      value: returnLocalizedMessage(router.locale, 'YOUR_CLUB'),
      slug: 'club'
    },
    {
      href: `/${params.application}/${params.leader}/review`,
      color: '#33d6a6',
      icon: 'checkmark',
      progress: `${submission}%`,
      value: returnLocalizedMessage(router.locale, 'REVIEW'),
      slug: 'review'
    },
    {
      href: `/${params.application}/${params.leader}/status`,
      color: `${applicationStatus != 'rejected' ? '#33d6a6' : '#ec3750'}`,
      icon: 'emoji',
      progress: `${status}%`,
      value: returnLocalizedMessage(router.locale, 'STATUS'),
      slug: 'status'
    }
  ]

  function ProgressBar({ item }) {
    return (
      <Box
        sx={{
          width: `${
            leaderRecord.fields['Email'] !=
            applicationsRecord.fields['Leaders Emails'][0]
              ? '170px'
              : '115px'
          }`,
          backgroundColor: '#f0f0f0',
          borderRadius: '10px',
          height: '10px',
          margin: '0px 5px 5px 5px'
        }}
      >
        <Box
          sx={{
            height: '10px',
            borderRadius: '10px',
            maxWidth: '100%'
          }}
          style={{
            width: `${item.progress}`,
            backgroundColor: `${item.color}`
          }}
        />
      </Box>
    )
  }

  return (
    <Card
      px={[4, 4]}
      pt={[1, 2]}
      pb={[1, 4]}
      mb={3}
      sx={{
        alignItems: 'center',
        '> svg': { display: ['none', 'sticky'] }
      }}
    >
      <Flex
        sx={{
          flexDirection: ['column', 'row'],
          display: ['sticky'],
          alignItems: 'center',
          textAlign: 'center',
          flexGrow: 1
        }}
      >
        {timelineRouting.map((item, idx) => {
          return (
            <>
              {item.value === 'Your Club' &&
              leaderRecord.fields['Email'] !=
                applicationsRecord.fields['Leaders Emails'][0] ? null : (
                <>
                  <Box
                    key={idx}
                    sx={{
                      display: ['none', 'inline-block'],
                      mb: '1rem'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        cursor: `${
                          item.icon === 'emoji'
                            ? applicationsRecord.fields['Submitted'] === true
                              ? 'pointer'
                              : 'not-allowed'
                            : 'pointer'
                        }`,
                        marginTop: '5px'
                      }}
                    >
                      {item.progress == null ? null : (
                        <ProgressBar item={item} />
                      )}
                      <div>
                        <Box
                          onClick={() => {
                            {
                              item.slug === 'status'
                                ? applicationsRecord.fields['Submitted'] ===
                                  true
                                  ? router.push(item.href)
                                  : null
                                : router.push(item.href)
                            }
                          }}
                        >
                          <Icon
                            glyph={item.icon}
                            style={{
                              color: [
                                item.progress === '100%' ||
                                item.progress === null
                                  ? item.color
                                  : applicationStatus === 'rejected'
                                  ? '#ec3750'
                                  : router.asPath.split('/')[3] === item.slug
                                  ? '#ff8c37'
                                  : 'black'
                              ]
                            }}
                          />
                        </Box>
                        <Text
                          sx={{
                            transition: '0.4s ease-in-out',
                            backgroundColor: [
                              item.progress === '100%' || item.progress === null
                                ? item.color
                                : applicationStatus === 'rejected'
                                ? '#ec3750'
                                : router.asPath.split('/')[3] === item.slug
                                ? '#ff8c37'
                                : '#5e5e5e'
                            ],
                            color: 'white',
                            display: 'inline',
                            borderRadius: '999999px',
                            px: '10px',
                            py: '1px',
                            ml: `${
                              item.value ===
                              returnLocalizedMessage(
                                router.locale,
                                'LEADER_PROFILE'
                              )
                                ? '-50px'
                                : item.value ===
                                  returnLocalizedMessage(
                                    router.locale,
                                    'YOUR_CLUB'
                                  )
                                ? '-40px'
                                : '-30px'
                            }`,
                            boxSizing: 'border-box',
                            position: ['relative', 'absolute']
                          }}
                          onClick={() => {
                            {
                              item.slug === 'status'
                                ? applicationsRecord.fields['Submitted'] ===
                                  true
                                  ? router.push(item.href)
                                  : null
                                : router.push(item.href)
                            }
                          }}
                        >
                          {item.value}
                        </Text>
                      </div>
                    </Box>
                  </Box>
                </>
              )}
            </>
          )
        })}
      </Flex>

      {/* mobile timeline */}

      <Flex
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: 'left',
          textAlign: 'left',
          mt: '0.5rem'
        }}
      >
        {timelineRouting.map((item, idx) => {
          return (
            <Box
              key={idx}
              sx={{
                display: ['inline', 'none'],
                mb: '0.5rem'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  cursor: `${
                    item.icon === 'emoji'
                      ? applicationsRecord.fields['Submitted'] === true
                        ? 'pointer'
                        : 'not-allowed'
                      : 'pointer'
                  }`,
                  marginTop: '3px'
                }}
              >
                <div>
                  <Box
                    onClick={() => {
                      {
                        item.slug === 'status'
                          ? applicationsRecord.fields['Submitted'] === true
                            ? router.push(item.href)
                            : null
                          : router.push(item.href)
                      }
                    }}
                  >
                    <Icon
                      glyph={item.icon}
                      style={{
                        color: [
                          item.progress === '100%' || item.progress === null
                            ? item.color
                            : applicationStatus === 'rejected'
                            ? '#ec3750'
                            : router.asPath.split('/')[3] === item.slug
                            ? '#ff8c37'
                            : 'black'
                        ]
                      }}
                    />
                  </Box>
                </div>
                <ProgressBar item={item} />
                <Text
                  sx={{
                    backgroundColor: [
                      item.progress === '100%' || item.progress === null
                        ? item.color
                        : applicationStatus === 'rejected'
                        ? '#ec3750'
                        : router.asPath.split('/')[3] === item.slug
                        ? '#ff8c37'
                        : '#252429'
                    ],
                    color: 'white',
                    borderRadius: '999999px',
                    px: '10px',
                    py: '2px',
                    ml: '12px',
                    minWidth: `${
                      item.slug === 'leader'
                        ? '115px'
                        : item.slug === 'club'
                        ? '90px'
                        : 'none'
                    }`,
                    alignItems: 'right',
                    textAlign: 'right',
                    boxSizing: 'border-box',
                    display: ['inline', 'none'],
                    position: ['relative', 'fixed']
                  }}
                >
                  {item.value}
                </Text>
              </Box>
            </Box>
          )
        })}
      </Flex>
    </Card>
  )
}
