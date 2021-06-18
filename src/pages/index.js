import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import api from '../api'
import storage from '../storage'
import { Flex, Heading, LargeButton, Text, Link } from '@hackclub/design-system'
import styled from 'styled-components'

import Pulse from '../pulse'
import Layout from '../components/Layout'
import ApplyNav from '../components/apply/ApplyNav'
import Sheet from '../components/Sheet'
import Main from '../components/apply/Main'
import LoginForm from '../components/auth/LoginForm'
import LoadingBar from '../components/LoadingBar'
import { injectIntl } from 'react-intl'

LargeButton.link = LargeButton.withComponent(Link)

const Full = styled(Flex).attrs({
  flexDirection: 'column',
  align: 'center',
  justify: 'center',
  p: 3
})`
  width: 100vw;
  height: 100vh;
`

class IndexPage extends Component {
  state = {
    status: 'loading',
    app: undefined,
    userId: undefined
  }

  createNewApplication = (firstTime = false) => {
    const msg = this.props.intl.formatMessage({
      id: 'REPLACE_CURRENT_APPLICATION_WARNING'
    })
    // eslint-disable-next-line
    if (!firstTime && !window.confirm(msg)) {
      return Promise.resolve(null)
    }
    return api
      .post(`v1/users/${storage.get('userId')}/new_club_applications`)
      .then((app) => app)
  }

  resetApplication = () => {
    this.createNewApplication().then((app) => {
      const newState = { status: 'finished' }
      if (app !== null) {
        newState.app = app
      }
      this.setState({ newState })
    })
  }

  populateApplications = (application = null) => {
    if (application) {
      this.setState({
        status: 'finished',
        app: application
      })
    } else {
      api
        .get(`v1/users/${storage.get('userId')}/new_club_applications`)
        .then((json) => {
          if (json.length === 0) {
            return this.createNewApplication(true)
          }
          return json.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at)
          })[0]
        })
        .then((app) => {
          this.setState({
            status: 'finished',
            app: app
          })
        })
        .catch((e) => {
          if (e.status === 401) {
            this.setState({ status: 'needsToAuth' })
          }
        })
    }
  }

  componentDidMount() {
    const userId = storage.get('userId')
    this.setState({ userId })
    const needsToAuth = userId === null

    if (needsToAuth) {
      this.setState({ status: 'needsToAuth' })
    } else {
      this.populateApplications()
    }
  }

  content() {
    const { intl } = this.props

    const { app, status, userId } = this.state
    switch (status) {
      case 'needsToAuth':
        return (
          <Full>
            <Pulse />
            <Sheet
              maxWidth={36}
              bg="black"
              color="white"
              align="left"
              style={{ mixBlendMode: 'multiply' }}
            >
              <Heading.h1 fontSize={6} style={{ lineHeight: '1.125' }}>
                {intl.formatMessage({ id: 'WELCOME_TITLE' })}
              </Heading.h1>
              <Text fontSize={4} mt={2} mb={3}>
                {intl.formatMessage({
                  id: 'WELCOME_WE_CANT_WAIT_TO_SEE_MESSAGE'
                })}
                <br />
                {intl.formatMessage({
                  id: 'WELCOME_LETS_GET_YOU_SIGNED_IN_MESSAGE'
                })}
              </Text>
              <LoginForm
                bg="black"
                color="white"
                textProps={{ color: 'black', align: 'left', fontSize: 3 }}
              />
            </Sheet>
          </Full>
        )
      case 'loading':
        return <LoadingBar fill />
      case 'finished':
        return (
          <Fragment>
            <ApplyNav breadcrumb={false} />
            <Pulse />
            <Main
              app={app}
              userId={userId}
              callback={this.populateApplications}
              resetCallback={this.resetApplication}
            />
          </Fragment>
        )
      default:
        return (
          <Text color="error" py={4}>
            {intl.formatMessage({ id: 'SOMETHING_TERRIBLE_HAPPENED' })}
          </Text>
        )
    }
  }

  render() {
    return (
      <Layout>
        <Helmet
          title={this.props.intl.formatMessage({ id: 'INITIAL_PAGE_TITLE' })}
        />
        {this.content()}
      </Layout>
    )
  }
}

const IndexPageWithIntl = injectIntl(IndexPage)

export default IndexPageWithIntl
