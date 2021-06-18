import React from 'react'
import { AutoSaver, Fieldset, Field, Form } from '../Forms'
import { withFormik } from 'formik'
import * as yup from 'yup'
import api from '../../api'
import { useIntl } from 'react-intl'

export const clubApplicationSchema = yup.object().shape({
  high_school_name: yup.string().required(),
  high_school_type: yup
    .string()
    .matches(/(public_school|private_school|charter_school)/)
    .required(),
  high_school_address: yup.string().required(),
  leaders_team_origin_story: yup.string().required(),
  idea_why: yup.string().required(),
  idea_other_coding_clubs: yup.string().required(),
  idea_other_general_clubs: yup.string().required(),
  formation_registered: yup.string().required(),
  other_surprising_or_amusing_discovery: yup.string().required(),
  point_of_contact_id: yup.number().required()
})

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
      <Fieldset section={intl.formatMessage({ id: 'SCHOOL' })}>
        <Field
          {...field('high_school_name')}
          label={intl.formatMessage({ id: 'HIGH_SCHOOL_NAME_LABEL' })}
        />
        <Field
          {...field('high_school_url')}
          label={intl.formatMessage({ id: 'HIGH_SCHOOL_LINK_LABEL' })}
          type="url"
          optional
        />
        <Field
          {...field('high_school_type')}
          label={intl.formatMessage({ id: 'HIGH_SCHOOL_TYPE_LABEL' })}
          type="select"
        >
          <option disabled value="">
            {intl.formatMessage({ id: 'SELECT_ONE' })}
          </option>
          <option value="public_school">
            {intl.formatMessage({ id: 'PUBLIC_SCHOOL' })}
          </option>
          <option value="private_school">
            {intl.formatMessage({ id: 'PRIVATE_SCHOOL' })}
          </option>
          <option value="charter_school">
            {intl.formatMessage({ id: 'CHARTER_SCHOOL' })}
          </option>
        </Field>
        <Field
          {...field('high_school_address')}
          label={intl.formatMessage({ id: 'HIGH_SCHOOL_ADDRESS_LABEL' })}
          hint={intl.formatMessage({ id: 'ADDRESS_HINT' })}
          type="textarea"
          rows="3"
        />
      </Fieldset>
      <Fieldset section={intl.formatMessage({ id: 'LEADERS' })}>
        <Field
          {...field('point_of_contact_id')}
          label={intl.formatMessage({ id: 'PRESIDENT_OR_EQUIVALENT_LABEL' })}
          type="select"
        >
          <option disabled value="">
            {intl.formatMessage({ id: 'SELECT_ONE' })}
          </option>
          {values.leader_profiles
            .filter((profile) => profile.user != null)
            .map((profile) => (
              <option value={profile.user.id} key={profile.user.id}>
                {profile.user.email}
              </option>
            ))}
        </Field>
        <Field
          {...field('leaders_team_origin_story')}
          label={intl.formatMessage({ id: 'TEAM_ORIGIN_STORY_LABEL' })}
          type="textarea"
          min="350"
          max="600"
        />
      </Fieldset>
      <Fieldset section={intl.formatMessage({ id: 'IDEA' })}>
        <Field
          {...field('idea_why')}
          label={intl.formatMessage({ id: 'WHY_PLANNING_TO_START_CLUB_LABEL' })}
          type="textarea"
          min="350"
          max="600"
        />
        <Field
          {...field('idea_other_coding_clubs')}
          label={intl.formatMessage({ id: 'OTHER_CODING_CLUBS_LABEL' })}
          type="textarea"
          min="350"
          max="600"
        />
        <Field
          {...field('idea_other_general_clubs')}
          label={intl.formatMessage({ id: 'OTHER_GENERAL_CLUBS_LABEL' })}
          type="textarea"
          min="350"
          max="600"
        />
      </Fieldset>
      <Fieldset section={intl.formatMessage({ id: 'FORMATION' })}>
        <Field
          {...field('formation_registered')}
          label={intl.formatMessage({ id: 'CLUB_ALREADY_REGISTERED_LABEL' })}
        />
        <Field
          {...field('formation_misc')}
          label={intl.formatMessage({
            id: 'OTHER_RELEVANT_INFO_ABOUT_SCHOOL_RELATIONSHIP_LABEL'
          })}
          type="textarea"
          optional
        />
      </Fieldset>
      <Fieldset section={intl.formatMessage({ id: 'OTHER_SECTION' })}>
        <Field
          {...field('other_surprising_or_amusing_discovery')}
          label={intl.formatMessage({
            id: 'SOMETHING_SURPRISING_YOU_LEARNED_LABEL'
          })}
          hint={intl.formatMessage({
            id: 'SOMETHING_SURPRISING_YOU_LEARNED_HINT'
          })}
          type="textarea"
          min="50"
          max="400"
        />
      </Fieldset>
      <Fieldset section={intl.formatMessage({ id: 'CURIOUS' })}>
        <Field
          {...field('curious_what_convinced')}
          label={intl.formatMessage({ id: 'WHAT_DO_YOU_EXPECT_LABEL' })}
          type="textarea"
          optional
        />
        <Field
          {...field('curious_how_did_hear')}
          label={intl.formatMessage({ id: 'HOW_DID_YOU_HEAR_LABEL' })}
          type="textarea"
          optional
        />
      </Fieldset>
      <AutoSaver
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        values={values}
      />
    </Form>
  )
}

const ClubApplicationForm = withFormik({
  mapPropsToValues: ({ params }) => params,
  enableReinitialize: true,
  handleSubmit: (data, { setSubmitting, props }) => {
    api
      .patch(`v1/new_club_applications/${props.id}`, { data })
      .then(() => {
        setSubmitting(false)
      })
      .catch((e) => {
        console.error(e)
        setSubmitting(false)
      })
  },
  displayName: 'ClubApplicationForm'
})(InnerForm)

export default ClubApplicationForm
