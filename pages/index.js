import { Box, Button, Text, Flex, Heading, Input } from 'theme-ui'
import { useState, useRef, useEffect } from 'react'
import nookies from 'nookies'
import { validateEmail, returnLocalizedMessage } from '../lib/helpers'
import { useRouter } from 'next/router'

export default function IndexHome() {
  const router = useRouter()
  const [status, setStatus] = useState('awaiting')
  const [email, setEmail] = useState('')
  async function handleSubmission(e) {
    e.preventDefault()
    if (validateEmail(email)) {
      setStatus('loading')
      const loginAPICall = await fetch(
        `/api/login?email=${encodeURIComponent(email)}&locale=${router.locale}`
      ).then(r => r.json())
      if (loginAPICall.success) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } else {
      alert(
        `❌ ${returnLocalizedMessage(router.locale, 'INVALID_EMAIL_ADDRESS')}`
      )
    }
  }
  return (
    <Flex
      sx={{
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        marginTop: '-50px'
      }}
    >
      <Box
        bg="slate"
        p={4}
        as="form"
        onSubmit={handleSubmission}
        sx={{ borderRadius: 10, width: '100%', maxWidth: '36rem' }}
      >
        <Heading as="h1" sx={{ fontSize: 5 }}>
          {returnLocalizedMessage(router.locale, 'WELCOME_TITLE')}
        </Heading>
        <Text as="p" variant="lead">
          {returnLocalizedMessage(router.locale, 'WELCOME_SUBTITLE')}
        </Text>
        <Text as="p" variant="lead">
          {status == 'awaiting'
            ? returnLocalizedMessage(router.locale, 'ENTER_YOUR_EMAIL_LABEL')
            : status == 'sent'
            ? '📬 ' +
              returnLocalizedMessage(router.locale, 'WE_JUST_SENT_A_LOGIN_URL')
            : status == 'loading'
            ? '✉️ ' + returnLocalizedMessage(router.locale, 'SENDING')
            : '⚠️ ' + returnLocalizedMessage(router.locale, 'ERROR')}
        </Text>
        <Input
          className="bg"
          placeholder={returnLocalizedMessage(router.locale, 'EMAIL')}
          onChange={e => setEmail(e.target.value)}
          sx={{
            color: 'rgb(56, 64, 70)',
            display:
              status == 'awaiting' || status == 'error' ? 'block' : 'none',
            '::placeholder': {
              color: 'rgb(56, 64, 70)'
            }
          }}
        />
        <Button
          className="bg"
          sx={{
            color: 'black',
            boxShadow: 'none',
            textTransform: 'uppercase',
            mt: 3,
            display:
              status == 'awaiting' || status == 'error' ? 'block' : 'none'
          }}
        >
          {returnLocalizedMessage(router.locale, 'CONTINUE')}
        </Button>
      </Box>
    </Flex>
  )
}

export async function getServerSideProps(ctx) {
  const { loginsAirtable } = require('../lib/airtable')
  const cookies = nookies.get(ctx)
  if (cookies.authToken) {
    try {
      const tokenRecord = await loginsAirtable.find('rec' + cookies.authToken)
      let res = ctx.res
      res.statusCode = 302
      res.setHeader(
        'Location',
        `/${
          tokenRecord.fields['Locale with a slash']
            ? tokenRecord.fields['Locale with a slash']
            : ''
        }${tokenRecord.fields['Path']}/status`
      )
    } catch {
      nookies.destroy(ctx, 'authToken')
    }
  }
  return { props: {} }
}
