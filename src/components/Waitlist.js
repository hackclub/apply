import styled from 'styled-components'
import React from 'react'
import { Label, Input, Text, cx } from '@hackclub/design-system'
import { Submit } from 'components/Forms'
import { withFormik } from 'formik'
import * as yup from 'yup'
import fetch from 'isomorphic-fetch'

const StyledInput = styled(Input)`
  text-align: inherit;
  background: ${props => cx(props.color)} !important;
  color: ${props => cx(props.bg)} !important;
  border: none;
  :focus {
    box-shadow: none !important;
  }
  ::placeholder {
    text-align: inherit;
    color: ${props => cx(props.bg)};
    opacity: 0.5;
  }
`

const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  userType,
  color,
  bg,
  status,
  inputProps = {},
  textProps = {}
}) => (
  <form onSubmit={handleSubmit}>
    <Label className="email" id="email" mb={0} {...textProps}>
      <Text mb={2} color={color}>
        Enter your email
      </Text>
      <StyledInput
        name="email"
        placeholder="Email address"
        color={color}
        bg={bg}
        value={values.email}
        onChange={e => {
          e.target.value = e.target.value.trim()
          handleChange(e)
        }}
        onBlur={handleBlur}
        disabled={isSubmitting}
        autoComplete="off"
        autoFocus
        {...inputProps}
      />
    </Label>
    {errors.email && (
      <Text
        fontSize={1}
        mt={2}
        align={textProps.align || 'center'}
        children={errors.email || ''}
      />
    )}
    <Submit
      mt={3}
      value="Sign up »"
      color={color}
      bg={bg}
      mx={inputProps.mx || '0'}
      style={{ display: 'block' }}
      onClick={handleSubmit}
      inverted
    />
  </form>
)

const WaitlistForm = withFormik({
  mapPropsToValues: ({ email }) => ({ email: email || '' }),
  enableReinitialize: true,
  validateOnChange: false,
  validationSchema: yup.object().shape({
    email: yup.string().email('That doesn’t look like a valid email.')
  }),
  handleSubmit: (data, { props, setSubmitting }) => {
    if (!data.email) {
      setSubmitting(false)
      return null
    }
    fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(data)
    })
      .then(r => r.json())
      .then(r => {
        setSubmitting(false)
      })
      .catch(e => {
        console.error(e)
        setSubmitting(false)
      })
  },
  displayName: 'WaitlistForm'
})(InnerForm)

export default WaitlistForm
