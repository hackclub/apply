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

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const SubmitStatus = styled(Text)`
  background: transparent url(/underline.svg) bottom left no-repeat;
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
  const [emailToInvite, setEmailToInvite] = useState(false)
  const router = useRouter()
  async function sendInvite() {
    if (validateEmail(emailToInvite)) {
      const loginAPICall = await fetch(
        `/api/invite?email=${emailToInvite}&id=${params.application}`
      ).then(r => r.json())
      if (loginAPICall.success) {
        alert('✅ Invited!')
        setEmailToInvite('')
        router.replace(router.asPath)
      } else {
        alert('❌ Error! Please try again!')
      }
    } else {
      alert('Please input a valid email address!')
    }
  }
  if (notFound) {
    return <Error statusCode="404" />
  }
  return (
    <Container py={4} variant="copy">
      <Card
        px={[4, 4]}
        py={[3, 3]}
        sx={{ color: 'blue', display: 'flex', alignItems: 'center' }}
      >
        <Icon glyph="message" />
        <Text sx={{ ml: 2 }}>
          {' '}
          Please don’t hesitate to reach out. We’re available to email at{' '}
          <b>
            <Text
              as="a"
              href="mailto:applications@hackclub.com"
              sx={{
                color: 'blue',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                  textDecorationStyle: 'wavy'
                }
              }}
            >
              applications@hackclub.com
            </Text>
          </b>
          !
        </Text>
      </Card>
      <Card px={[4, 4]} py={[4, 4]} mt={4}>
        <Heading sx={{ fontSize: [4, 5] }}>
          Your application to start a Hack Club{' '}
          {applicationsRecord.fields['All Complete (incl Leaders)'] == 1 ? (
            <>
              is <SubmitStatus>ready to go!</SubmitStatus>
            </>
          ) : (
            <>
              is <SubmitStatus>still in progress!</SubmitStatus>
            </>
          )}
        </Heading>
        <Divider sx={{ color: 'slate', my: 4 }} />
        <Link href={`/${params.application}/${params.leader}/club`}>
          <Flex sx={{ alignItems: 'center', cursor: 'pointer' }}>
            {applicationsRecord.fields['Completed'] == 1 ? (
              <Icon glyph="checkmark" color="#33d6a6" />
            ) : (
              <Icon glyph="important" color="#ff8c37" />
            )}
            <Heading sx={{ flexGrow: 1, color: 'blue', ml: 2 }} as="h1">
              Your Club
            </Heading>

            <Icon glyph="view-forward" />
          </Flex>
        </Link>
        <Divider sx={{ color: 'slate', my: 4 }} />
        <Link href={`/${params.application}/${params.leader}/leader`}>
          <Flex sx={{ alignItems: 'center' }}>
            {leaderRecord.fields['Completed'] == 1 ? (
              <Icon glyph="checkmark" color="#33d6a6" />
            ) : (
              <Icon glyph="important" color="#ff8c37" />
            )}

            <Heading sx={{ flexGrow: 1, color: 'blue', ml: 2 }} as="h1">
              My Personal Profile
            </Heading>
            <Icon glyph="view-forward" />
          </Flex>
        </Link>
        <Divider sx={{ color: 'slate', my: 4 }} />
        <Flex sx={{ alignItems: 'center' }}>
          <Heading sx={{ color: 'slate', ml: 1, flexGrow: 1 }}>
            CO-LEADERS
          </Heading>
          <Flex
            sx={{
              bg: !addingLeader ? 'green' : 'muted',
              borderRadius: '999px',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1,
              color: 'white',
              boxShadow: 'card',
              transform: !addingLeader ? 'none' : 'rotate(180deg)',
              transition: 'transform ease-in-out 0.2s'
            }}
            onClick={() => setAddingLeader(!addingLeader)}
          >
            <Icon glyph={!addingLeader ? 'member-add' : 'view-close'} />
          </Flex>
        </Flex>
        {addingLeader && (
          <Box>
            <Flex mt={3} sx={{ alignItems: 'center' }}>
              <Input
                sx={{
                  border: '0.5px solid',
                  fontSize: 1,
                  borderColor: 'rgb(221, 225, 228)',
                  mr: 3
                }}
                onChange={e => setEmailToInvite(e.target.value)}
                value={emailToInvite}
                placeholder="New co-leader’s email"
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
                  fontWeight: 'bold'
                }}
                onClick={() => sendInvite()}
              >
                <Icon glyph={'send-fill'} />
                <Text mr={2}>Send Invite</Text>
              </Flex>
            </Flex>
            <Grid columns={2} mt={3}>
              <Flex
                sx={{
                  color: 'blue',
                  bg: 'rgb(230, 244, 252)',
                  borderRadius: 4,
                  px: 3,
                  py: 2,
                  alignItems: 'center'
                }}
              >
                <Icon glyph={'welcome'} size="40" />
                <Text ml={3}>
                  You can read our guide for selecting your team here.
                </Text>
              </Flex>
              <Flex
                sx={{
                  color: 'blue',
                  bg: 'rgb(230, 244, 252)',
                  borderRadius: 4,
                  px: 3,
                  py: 2,
                  alignItems: 'center'
                }}
              >
                <Icon glyph={'leader'} size="40" />
                <Text ml={3}>
                  Your teacher sponsor does not need to fill out a profile.
                </Text>
              </Flex>
            </Grid>
            <Divider sx={{ color: 'slate', my: 4 }} />
          </Box>
        )}
        {applicationsRecord.fields['Leaders Emails'].map(
          (leaderEmail, leaderIndex) => (
            <Flex sx={{ alignItems: 'center', mt: 3 }}>
              <Icon
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
              <Heading
                sx={{
                  flexGrow: 1,
                  color: 'placeholder',
                  ml: 2,
                  transform: 'translateY(-1.5px)'
                }}
                as="h2"
              >
                {leaderEmail}
              </Heading>
            </Flex>
          )
        )}
        <Button
          sx={{
            mt: 4,
            width: '100%',
            textTransform: 'uppercase',
            ...(applicationsRecord.fields['All Complete (incl Leaders)'] != 1
              ? { opacity: 0.7, ':hover,:focus': { transform: 'none', boxShadow: 'none' } }
              : {})
          }}
          variant="ctaLg"
        >
          Submit Your Application!
        </Button>
      </Card>
    </Container>
  )
}

export async function getServerSideProps({ params }) {
  const {
    prospectiveLeadersAirtable,
    loginsAirtable,
    applicationsAirtable
  } = require('../../../lib/airtable')
  try {
    const leaderRecord = await prospectiveLeadersAirtable.find('rec'+ params.leader)
    const applicationsRecord = await applicationsAirtable.find(
      'rec'+ params.application
    )
    return { props: { params, applicationsRecord, leaderRecord } }
  } catch (e) {
    console.log(e)
    return { props: { notFound: true } }
  }
}
