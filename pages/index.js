import { Box, Button, Text, Flex, Heading, Input } from 'theme-ui'
import { useState } from 'react'
import nookies from 'nookies'

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export default function IndexHome() {
  const [status, setStatus] = useState('awaiting')
  const [email, setEmail] = useState('')
  async function handleSubmission() {
    if (validateEmail(email)) {
      setStatus('loading')
      const loginAPICall = await fetch(`/api/login?email=${email}`).then(r =>
        r.json()
      )
      if (loginAPICall.success) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } else {
      alert('Please input a valid email address!')
    }
  }
  return (
    <Flex
      sx={{
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}
    >
      <Box
        bg="slate"
        p={4}
        sx={{ borderRadius: 10, width: '100%', maxWidth: '36rem' }}
      >
        <Heading as="h1" sx={{ fontSize: 5 }}>
          Welcome
        </Heading>
        <Text as="p" variant="lead">
          We can’t wait to see your application. <br /> Let’s get you signed in!
        </Text>
        <Text as="p" variant="lead">
          {status == 'awaiting'
            ? 'Enter your email:'
            : status == 'sent'
            ? '📬 We just sent a unique URL to sam@sampoder.com.'
            : status == 'loading'
            ? '✉️ Sending email!'
            : '⚠️ Something went wrong, please try again.'}
        </Text>
        <Input
          className="bg"
          placeholder="Email Address"
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
          onClick={handleSubmission}
        >
          Continue {'>>'}
        </Button>
      </Box>
    </Flex>
  )
}

export async function getServerSideProps(ctx) {
  const { loginsAirtable } = require('../lib/airtable')
  const cookies = nookies.get(ctx)
  if (cookies.authToken) {
    try{
    const tokenRecord = await loginsAirtable.find(
      'rec' + cookies.authToken
    )
    let res = ctx.res
    res.statusCode = 302
    res.setHeader('Location', `/${tokenRecord.fields["Path"]}`)
    }
    catch{
      nookies.destroy(ctx, 'authToken')
    }
  }
  return {props: {}}
}
