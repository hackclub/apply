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
import { useEffect, useState } from 'react'
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

export default function ApplicationRegister({
  notFound,
  params,
  applicationsRecord,
  leaderRecord,
  trackerRecord
}) {
  const router = useRouter()

  if (notFound) {
    return <Error statusCode="404" />
  }
  return (
    <Container py={4} variant="copy">
      <TimelineCard router={router} applicationsRecord={applicationsRecord} leaderRecord={leaderRecord} trackerRecord={trackerRecord} params={params} />
      <Card px={[4, 4]} py={[4, 4]} mt={1}>
        
        <Heading sx={{ fontSize: [3, 4] }}>
          { leaderRecord.fields['Full Name'] ? <Text>{returnLocalizedMessage(router.locale, 'LOOKS_GOOD')} {leaderRecord.fields['Full Name'].split(' ')[0]}!</Text> : <Text>{returnLocalizedMessage(router.locale, 'LOOKS_GOOD')}!</Text>}
        </Heading>
        <Divider sx={{ color: 'slate', my: [3, 4] }} />
        <Box>
          <Text sx={{ fontSize: [2, 3]}}><b>ADD CORRECT TEXT TO THIS PAGE</b></Text>
        </Box>

        
        <Button
          sx={{
            mt: 4,
            width: '100%',
            textTransform: 'uppercase',
          }}
          variant="ctaLg"
          onClick={() => router.push(`/${params.application}/${params.leader}/club`)}
        >
          {returnLocalizedMessage(router.locale, "CONTINUE")}<Icon glyph="view-forward" />
        </Button>
      </Card>
      <ContactCard router={router}/>
      <OpenSourceCard router={router} />
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
    {returnLocalizedMessage(router.locale, 'LOGOUT')}
  </Text>
  </Box>
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
          {returnLocalizedMessage(router.locale, 'PROUDLY_OPEN_SOURCE')}
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