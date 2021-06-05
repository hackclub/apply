import React from 'react'
import { Flex, Heading } from '@hackclub/design-system'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import Flag from '../Flag'
import LoginForm from './LoginForm'
import { useIntl } from 'react-intl'

const Base = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

const FixedFlag = styled(Flag)`
  position: fixed;
  top: 0;
  left: 1rem;
  z-index: 1;
`

const Login = ({ userType = 'applicant', color, heading, bg }) => {
  const intl = useIntl()

  const resultColor = color || { applicant: 'white' }[userType]
  const resultBg = bg || { applicant: 'primary' }[userType]
  const resultHeading =
    heading ||
    { applicant: intl.formatMessage({ id: 'START_YOUR_APPLICATION' }) }[
      userType
    ]
  return (
    <Base color={resultColor} bg={resultBg}>
      <Helmet title={intl.formatMessage({ id: 'LOG_IN_HACK_CLUB' })} />
      <FixedFlag />
      <Heading.h1
        fontSize={[4, 5]}
        mb={3}
        color={resultColor}
        children={resultHeading}
      />
      <LoginForm
        color={resultColor}
        bg={resultBg}
        inputProps={{ mx: 'auto', width: 24 * 16 }}
        textProps={{ align: 'center', fontSize: 4 }}
      />
    </Base>
  )
}
export default Login
