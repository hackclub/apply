import React from 'react'
import { Text } from '@hackclub/design-system'
import { AutoSaver, Field, Fieldset, Form } from '../Forms'
import { withFormik } from 'formik'
import api from '../../api'
import { useIntl } from 'react-intl'

const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => {
  const intl = useIntl()

  const field = (name) => ({
    name,
    value: values[name] === null ? '' : values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[name] && errors[name],
    disabled: values.submitted_at !== null
  })
  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset section={intl.formatMessage({ id: 'LEADER_ROUTE' })}>
        <Field
          {...field('leader_name')}
          label={intl.formatMessage({ id: 'LEADER_FULL_NAME_LABEL' })}
        />
        <Field
          {...field('leader_birthday')}
          label={intl.formatMessage({ id: 'LEADER_BIRTHDAY_LABEL' })}
          type="date"
        />
        <Field
          {...field('leader_year_in_school')}
          label={intl.formatMessage({ id: 'LEADER_YEAR_IN_SCHOOL_LABEL' })}
          type="select"
        >
          <option value="" disabled>
            {intl.formatMessage({ id: 'SELECT_ONE' })}
          </option>
          <option value="freshman">
            {intl.formatMessage({ id: 'FRESHMAN' })}
          </option>
          <option value="sophomore">
            {intl.formatMessage({ id: 'SOPHOMORE' })}
          </option>
          <option value="junior">{intl.formatMessage({ id: 'JUNIOR' })}</option>
          <option value="senior">{intl.formatMessage({ id: 'SENIOR' })}</option>
          <option value="other_year">
            {intl.formatMessage({ id: 'OTHER_YEAR' })}
          </option>
        </Field>
        <Field
          {...field('leader_phone_number')}
          label={intl.formatMessage({ id: 'LEADER_PHONE_NUMBER_LABEL' })}
          type="tel"
        />
        <Field
          {...field('leader_address')}
          label={intl.formatMessage({ id: 'LEADER_ADDRESS_LABEL' })}
          hint={intl.formatMessage({ id: 'ADDRESS_HINT' })}
          type="textarea"
          rows="3"
        />
      </Fieldset>
      <Fieldset section={intl.formatMessage({ id: 'STATS' })}>
        <Text color="slate" pb={3}>
          {intl.formatMessage({ id: 'DEMOGRAPHIC_STATS_DISCLAIMER' })}
        </Text>
        <Field
          {...field('leader_gender')}
          label={intl.formatMessage({ id: 'GENDER' })}
          type="select"
        >
          <option value="" disabled>
            {intl.formatMessage({ id: 'SELECT_ONE' })}
          </option>
          <option value="male">{intl.formatMessage({ id: 'MALE' })}</option>
          <option value="female">{intl.formatMessage({ id: 'FEMALE' })}</option>
          <option value="genderqueer">
            {intl.formatMessage({ id: 'GENDERQUEER' })}
          </option>
          <option value="agender">
            {intl.formatMessage({ id: 'AGENDER' })}
          </option>
          <option value="other_gender">
            {intl.formatMessage({ id: 'OTHER' })}
          </option>
        </Field>
        <Field
          {...field('leader_ethnicity')}
          label={intl.formatMessage({ id: 'ETHNICITY' })}
          type="select"
        >
          <option value="" disabled>
            {intl.formatMessage({ id: 'SELECT_ONE' })}
          </option>
          <option value="hispanic_or_latino">
            {intl.formatMessage({ id: 'HISPANIC_OR_LATINO' })}
          </option>
          <option value="white">{intl.formatMessage({ id: 'WHITE' })}</option>
          <option value="black">{intl.formatMessage({ id: 'BLACK' })}</option>
          <option value="native_american_or_indian">
            {intl.formatMessage({ id: 'NATIVE_AMERICAN_OR_INDIAN' })}
          </option>
          <option value="asian_or_pacific_islander">
            {intl.formatMessage({ id: 'ASIAN_OR_PACIFIC' })}
          </option>
          <option value="other_ethnicity">
            {intl.formatMessage({ id: 'OTHER_ETHNICITY' })}
          </option>
        </Field>
      </Fieldset>
      <Fieldset section={intl.formatMessage({ id: 'PRESENCE' })}>
        <Field
          {...field('presence_personal_website')}
          label={intl.formatMessage({ id: 'PERSONAL_WEBSITE_LINK' })}
          placeholder="https://"
          type="url"
          optional
        />
        <Field
          {...field('presence_github_url')}
          label={intl.formatMessage({ id: 'GITHUB_LINK' })}
          placeholder="https://"
          type="url"
          optional
        />
        <Field
          {...field('presence_twitter_url')}
          label={intl.formatMessage({ id: 'TWITTER_LINK' })}
          placeholder="https://"
          type="url"
          optional
        />
      </Fieldset>
      <Fieldset section={intl.formatMessage({ id: 'SKILLS' })}>
        <Field
          {...field('skills_system_hacked')}
          label={
            <>
              {intl.formatMessage({ id: 'SKILLS_SYSTEM_LABEL' })}{' '}
              <a
                href="https://www.quora.com/When-have-you-most-successfully-hacked-a-non-computer-system-to-your-advantage"
                target="_blank"
                rel="noopener noreferrer"
              >
                {intl.formatMessage({ id: 'HERE_ARE_EXAMPLES' })}
              </a>{' '}
              {intl.formatMessage({ id: 'OF_WHAT_WE_ARE_LOOKING' })}
            </>
          }
          type="textarea"
          min="450"
          max="1200"
        />
        <Field
          {...field('skills_impressive_achievement')}
          label={intl.formatMessage({
            id: 'SKILLS_IMPRESSIVE_ACHIEVEMENT_LABEL'
          })}
          type="textarea"
          min="100"
          max="250"
        />
        <Field
          {...field('skills_is_technical')}
          label={intl.formatMessage({ id: 'SKILLS_IS_TECHNICAL_LABEL' })}
          type="select"
        >
          <option value="" disabled>
            {intl.formatMessage({ id: 'SELECT_ONE' })}
          </option>
          <option value="true">{intl.formatMessage({ id: 'YES' })}</option>
          <option value="false">{intl.formatMessage({ id: 'NO' })}</option>
        </Field>
      </Fieldset>
      <AutoSaver
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        values={values}
      />
    </Form>
  )
}

const LeaderApplicationForm = withFormik({
  mapPropsToValues: (props) => props.params,
  handleSubmit: (data, { setSubmitting, props }) => {
    api
      .patch(`v1/leader_profiles/${props.id}`, { data })
      .then((json) => {
        setSubmitting(false)
      })
      .catch((e) => {
        console.error(e)
        alert(e)
        setSubmitting(false)
      })
  },
  displayName: 'LeaderApplicationForm'
})(InnerForm)

export default LeaderApplicationForm
