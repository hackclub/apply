import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import Helmet from 'react-helmet'
import search from '../search'
import api from '../api'
import { Container, Heading, LargeButton, Link } from '@hackclub/design-system'

import Layout from '../components/Layout'
import Login from '../components/auth/Login'
import Sheet from '../components/Sheet'
import ApplyNav from '../components/apply/ApplyNav'
import LoadingBar from '../components/LoadingBar'
import ClubApplicationForm from '../components/apply/ClubApplicationForm'

LargeButton.link = LargeButton.withComponent(Link)

class ClubPage extends Component {
  state = {
    status: 'loading',
    formFields: undefined,
    id: undefined
  }

  componentDidMount() {
    const id = search.get('id')
    this.setState({ id })
    api
      .get(`v1/new_club_applications/${id}`)
      .then((json) => {
        this.setState({
          status: 'loaded',
          formFields: json
        })
      })
      .catch((e) => {
        if (e.status === 401) {
          const status = 'needsToAuth'
          this.setState({ status })
        } else {
          alert(e.statusText)
        }
      })
  }

  render() {
    const { intl } = this.props

    return (
      <Layout bg="snow">
        <Helmet title={intl.formatMessage({ id: 'EDIT_CLUB_APPLICATION' })} />
        <ContentWithIntl {...this.state} />
      </Layout>
    )
  }
}

const Content = ({ status, formFields, id, intl }) => {
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
            <ClubApplicationForm params={formFields} id={id} />
          </Sheet>
          <Heading.h4 align="center">
            {`${intl.formatMessage({
              id: 'YOUR_FORM_IS_AUTOMATICALLY_SAVED'
            })} `}
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

const ClubPageWithIntl = injectIntl(ClubPage)
const ContentWithIntl = injectIntl(Content)

export default ClubPageWithIntl
