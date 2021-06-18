import styled from 'styled-components'
import React from 'react'
import api from '../../api'
// import getSeason from '@hackclub/season'
import { Label, Input, Text, cx } from '@hackclub/design-system'
import { Submit } from '../Forms'
import { withFormik } from 'formik'
import * as yup from 'yup'
import storage from '../../storage'
import { useIntl } from 'react-intl'

const StyledInput = styled(Input)`
  text-align: inherit;
  background: ${(props) => cx(props.color)};
  color: ${(props) => cx(props.bg)};
  border: none;
  :focus {
    box-shadow: none !important;
  }
  ::placeholder {
    text-align: inherit;
    color: ${(props) => cx(props.bg)};
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
}) => {
  const intl = useIntl()

  return (
    <form onSubmit={handleSubmit}>
      <Label className="email" id="email" mb={0} {...textProps}>
        <Text mb={2} color={color}>
          {intl.formatMessage({ id: 'ENTER_YOUR_EMAIL_LABEL' })}
        </Text>
        <StyledInput
          name="email"
          placeholder={intl.formatMessage({
            id: 'ENTER_YOUR_EMAIL_PLACEHOLDER'
          })}
          color={color}
          bg={bg}
          value={values.email}
          onChange={(e) => {
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
        value={intl.formatMessage({ id: 'CONTINUE' })}
        color={color}
        bg={bg}
        mx={inputProps.mx || '0'}
        style={{ display: 'block' }}
        onClick={handleSubmit}
        inverted
      />
      {/*
      <Text>{getSeason()} applications accepted on a rolling basis</Text>
      */}
    </form>
  )
}

const EmailLoginForm = withFormik({
  mapPropsToValues: ({ email }) => ({ email: email || '' }),
  enableReinitialize: true,
  validateOnChange: false,
  validationSchema: yup.object().shape({
    // email: yup.string().email(intl.formatMessage({id: "THAT_DOESNT_LOOK_LIKE_VALID_EMAIL"}))
    email: yup.string().email('That doesn’t look like a valid email.')
  }),
  handleSubmit: (data, { props, setSubmitting }) => {
    if (!data.email) {
      setSubmitting(false)
      return null
    }
    api
      .post('v1/users/auth', { data })
      .then((user) => {
        storage.set('userId', user.id)
        storage.set('userEmail', user.email)
        setSubmitting(false)
        props.submitCallback({ userId: user.id, email: user.email })
      })
      .catch((e) => {
        console.error(e)
        setSubmitting(false)
      })
  },
  displayName: 'EmailLoginForm'
})(InnerForm)

export default EmailLoginForm
