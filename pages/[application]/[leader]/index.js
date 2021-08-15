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
import { clubApplication } from "/formConfigs/club-application.js";
import { leaderApplication } from "/formConfigs/leader-application.js";

const SubmitStatus = styled(Text)`
  background: transparent url(/underline.svg) bottom left no-repeat;
  background-size: 100% 0.75rem;
  padding-bottom: 0.125rem;
`

const leadersEmail = (
    leaderEmail, 
    leaderIndex, 
    leaderRecord, 
    applicationsRecord,
    deleteLeader
  ) => { 

  const textSx = leaderEmail != leaderRecord['fields']['Email']
            ? {
                cursor: 'pointer',
                ':hover > .importantIcon': { display: 'none' },
                '> .removeIcon': { display: 'none' },
                ':hover > .removeIcon': { display: 'inline' }
              }
            : { '> .removeIcon': { display: 'none' } }

  return (
    <Flex sx={{ alignItems: 'center', mt: 3 }} key={`leader-${leaderIndex}`}>
      <Text sx={textSx} >
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
        <Icon
          className="removeIcon"
          glyph={'member-remove'}
          onClick={ () => deleteLeader(applicationsRecord.fields['Prospective Leaders'][leaderIndex]) }
          color={'#ec3750'}
        />
      </Text>
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
}

const AddingLeader = (setEmailToInvite, emailToInvite, sendInvite) => (
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
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
        onClick={sendInvite}
      >
        <Icon glyph={'send-fill'} />
        <Text mr={2}>Send Invite</Text>
      </Flex>
    </Flex>
    <Grid columns={[1, 2]} mt={3}>
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
        <Text className="tip" ml={3}>
          You can read our guide for selecting your team <a href="https://workshops.hackclub.com/leadership_team/">here</a>.
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
)

const ApplicationStatus = (applicationsRecord, complete, router) => <>
  { returnLocalizedMessage(router.locale, 'APPLICATION_STATUS_MESSAGE') }
  &nbsp;
  {
    complete
      ? 
        applicationsRecord.fields['Submitted'] 
          ?
            <>
              <SubmitStatus>
                {returnLocalizedMessage(router.locale, 'APPLICATION_STATUS_MESSAGE_APPENDED_HAS_BEEN')} 
                {returnLocalizedMessage(router.locale, 'SUBMITTED')}
              </SubmitStatus>
            </>
          :
            <>
              {returnLocalizedMessage(router.locale, 'APPLICATION_STATUS_MESSAGE_APPENDED_IS')}
              &nbsp;
              <SubmitStatus>ready to go!</SubmitStatus>
            </>
      : <>
          {returnLocalizedMessage(router.locale, 'APPLICATION_STATUS_MESSAGE_APPENDED_IS')}
          &nbsp;  
          <SubmitStatus>still in progress!</SubmitStatus>
        </>
  }
</>

// '&:hover': {
//   textDecoration: 'underline',
//   textDecorationStyle: 'wavy'
// }

const ContactCard = (router) => (
  <Card
    px={[4, 4]}
    py={[3, 3]}
    my={[3, 3]}
    sx={{ color: 'blue', display: 'flex', alignItems: 'center' }}
  >
    <Icon glyph="message" />
    <Text sx={{ ml: 2 }}>
      {returnLocalizedMessage(router.locale, 'CONTACT_MESSAGE')}{' '}
      <b>
        <Text
          as="a"
          href={`mailto:${returnLocalizedMessage(router.locale, 'EMAIL')}`}
          sx={{
            color: 'blue',
            textDecoration: 'none',
          }}
        >
          {returnLocalizedMessage(router.locale, 'EMAIL')}
        </Text>
      </b>
      !
    </Text>
  </Card>
)

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
      const loginAPICall = (await fetch(`/api/invite?email=${emailToInvite}&id=${params.application}`)).json();
      
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

  async function deleteLeader(leaderID) {

    const windowConfirm = window.confirm('Do you really want to delete this leader from your application?')
    if (windowConfirm) {
      const deleteLeaderCall = (await fetch(`/api/remove?id=${params.application}&leaderID=${leaderID}`)).json();

      if (deleteLeaderCall.success) {
        alert('✅ Deleted leader from application!')
        router.replace(router.asPath)
      } else {
        alert('❌ Error! Please try again!')
      }

    }
  }

  async function submitApplication() {
    const submissionAPICall = (await fetch(`/api/submit?id=${params.application}`)).json();

    console.log(submissionAPICall)

    if (submissionAPICall.success) {
      alert('✅ Submitted!')
      router.replace(router.asPath)
    } else {
      alert('❌ Error! Please try again!')
    }
  }

  let clubComplete = true;
  const allRequiredFieldsLeader = clubApplication
    .map(x => x.questions)
    .flat()
    .map(({ name, optional = false }) => [ name, !optional ])
    .forEach(([ name, req ]) => {
      if (req && (applicationsRecord.fields[name] === "" || applicationsRecord.fields[name] === undefined)) {
        clubComplete = false; 
      }
    })

  let leaderComplete = true;
  const allRequiredFieldsClub = leaderApplication
    .map(x => x.questions)
    .flat()
    .map(({ name, optional = false }) => [ name, !optional ])
    .forEach(([name, req]) => {
      if (req && (leaderRecord.fields[name] === "" || leaderRecord.fields[name] === undefined)) {
        leaderComplete = false; 
      }
    })


    console.log(clubComplete, leaderComplete);

  if (notFound) return <Error statusCode="404" />

  return (
    <Container py={1} variant="copy">
      <Card px={[4, 4]} py={[4, 4]} mt={4}>
        <Heading sx={{ fontSize: [4, 5] }}>
        {ApplicationStatus(applicationsRecord, clubComplete && leaderComplete, router)}
        </Heading>
        <Divider sx={{ color: 'slate', my: 4 }} />
        <Link href={`/${params.application}/${params.leader}/club`}>
          <Flex sx={{ alignItems: 'center', cursor: 'pointer' }}>
            {clubComplete ? (
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
          <Flex sx={{ alignItems: 'center', cursor: 'pointer' }}>
            {leaderComplete ? (
              <Icon glyph="checkmark" color="#33d6a6" />
            ) : (
              <Icon glyph="important" color="#ff8c37" />
            )}

            <Heading sx={{ flexGrow: 1, color: 'blue', ml: 2 }} as="h1">
              Your Personal Profile
            </Heading>
            <Icon glyph="view-forward" />
          </Flex>
        </Link>
        <Divider sx={{ color: 'slate', my: 4 }} />

        <Flex sx={{ alignItems: 'center' }}>
        <Heading sx={{ color: 'slate', ml: 1, flexGrow: 1 }}>
          LEADERS
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

      {addingLeader && AddingLeader(setEmailToInvite, emailToInvite, sendInvite)}
      {
        applicationsRecord.fields['Leaders Emails'].map((leaderEmail, leaderIndex) => leadersEmail(
            leaderEmail, 
            leaderIndex, 
            leaderRecord, 
            applicationsRecord,
            deleteLeader
          ))
      }
        <button
          className={"submit-button" + (clubComplete && leaderComplete ? "" : " disabled-submit-button")}
          onClick={() =>
            applicationsRecord.fields['All Complete (incl Leaders)'] != 1 ||
            applicationsRecord.fields['Submitted']
              ? console.log(`You're not done hacker.`)
              : submitApplication()
          }
        >
          Submit Your Application!
        </button>
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
            router.push('/')
          }}
        >
          Log Out
        </Button>
      </Card>
      { ContactCard(router) }
    </Container>
  )
}

export async function getServerSideProps({ req, res, params }) {
  const {
    prospectiveLeadersAirtable,
    applicationsAirtable
  } = require('../../../lib/airtable')

  const cookies = nookies.get({ req })
  console.log("no token");
  if (cookies.authToken) {
    try {
      console.log("trying");
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
      return { props: { notFound: true } }
    }
  } else {
    console.log("didn't try")
    res.statusCode = 302
    res.setHeader('Location', `/`)
    return
  }
}
