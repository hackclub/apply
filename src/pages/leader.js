import React, { Component } from 'react'
import Helmet from 'react-helmet'
import search from '../search'
import api from '../api'
import { Container, Heading, LargeButton, Link } from '@hackclub/design-system'

import Layout from '../components/Layout'
import Login from '../components/auth/Login'
import Sheet from '../components/Sheet'
import ApplyNav from '../components/apply/ApplyNav'
import LoadingBar from '../components/LoadingBar'
import LeaderApplicationForm from '../components/apply/LeaderApplicationForm'
import { useIntl } from 'react-intl'

LargeButton.link = LargeButton.withComponent(Link)

export default class extends Component {
  state = {
    status: 'loading',
    formFields: undefined,
    id: undefined
  }

  componentDidMount() {
    const id = search.get('id')
    this.setState({ id })
    api
      .get(`v1/leader_profiles/${id}`)
      .then((json) =>
        api
          .get(`v1/new_club_applications/${json.new_club_application_id}`)
          .then((newClubApp) => {
            this.setState({
              status: 'loaded',
              formFields: { ...json, submitted_at: newClubApp.submitted_at }
            })
          })
      )
      .catch((e) => {
        if (e.status === 401) {
          const status = 'needsToAuth'
          this.setState({ status })
        }
        alert(e.statusText)
      })
  }

  render() {
    return (
      <Layout bg="snow">
        <Helmet title="Edit Leader Application – Hack Club" />
        <Content {...this.state} />
      </Layout>
    )
  }
}

const Content = ({ status, formFields, id }) => {
  const intl = useIntl()

  switch (status) {
    case 'needsToAuth':
      return <Login />
    case 'loading':
      return <LoadingBar fill />
    default:
      return (
        <>
          <ApplyNav />
          <Sheet maxWidth={48} mt={3} mb={5}>
            <LeaderApplicationForm params={formFields} id={id} />
          </Sheet>
          <Heading.h4 align="center">
            {intl.formatMessage({ id: 'YOUR_FORM_IS_AUTOMATICALLY_SAVED' })}{' '}
            <span role="img" aria-label="">
              ✨
            </span>
          </Heading.h4>
          <Container align="center" mt={4} mb={5}>
            <LargeButton.link href="/" chevronLeft>
              {intl.formatMessage({ id: 'BACK' })}
            </LargeButton.link>
          </Container>
        </>
      )
  }
}
