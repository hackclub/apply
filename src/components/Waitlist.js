import React, { Component } from 'react'
import Sheet from 'components/Sheet'
import Pulse from 'pulse'
import { Text, Heading, Container, Icon, Flex } from '@hackclub/design-system'
import LoadingBar from 'components/LoadingBar'
import api from 'api'
import storage from 'storage'
import theme from '@hackclub/design-system/dist/theme';
import styled, { keyframes } from 'styled-components'

const HeadingRow = Flex.withComponent(Heading)

const SuccessMessage = () => (
  <>
    <Pulse />
    <Container maxWidth={32}>
    <Sheet mt={[1, 6]}>
      <HeadingRow mb={2}>
        <strong>You’re on the list!</strong>
        <Icon glyph="checkmark" size={42} color={theme.colors.success} />
      </HeadingRow>
      <Text>We just emailed you a link to our guide for club leaders.</Text>
      <Text>We’ll be in touch once our applications open in the fall.</Text>
      <Text mt={[1, 2]}>If you have any questions, or didn’t get our email, please let us know at applications@hackclub.com.</Text>
    </Sheet>
    </Container>
  </>
)

const transitionToSuccess = keyframes`
  from {
    color: ${theme.colors.primary};
  } 
  to {
    color: ${theme.colors.success};
  } 
`

const LoadingBarSuccess = styled(LoadingBar)`
  animation: 3s ${transitionToSuccess} infinite;
`

class Waitlist extends Component {
  state = {
    status: 'loading',
    timeoutID: null
  }

  componentWillUnmount() {
    const { timeoutID } = this.state
    if (timeoutID) {
      clearTimeout(this.state.timeoutID)
    }
  }

  componentDidMount() {
    api
      .currentUser()
      .then(currentUser => {
        const data = {
          body: JSON.stringify({
            base: 'apptEEFG5HTfGQE7h',
              table: 'Waitlist',
              record: {
                'Email': storage.get('userEmail'),
                'API ID': currentUser.id.toString()
              }
          })
        }
        api
          .post('https://hooks.zapier.com/hooks/catch/507705/7n18ca', data, { noAuth: true })
          .then(_ => {
            const timeoutID = setTimeout(() => {
              this.setState({
                status: 'success',
                timeoutID: null
              })
            }, 3000)
            this.setState({
              status: 'transition-success',
              timeoutIU: timeoutID
            })
          })
          .catch(e => {
            this.setState({
              status: 'error'
            })
          })
      })
  }

  render() {
    switch(this.state.status) {
      case 'loading':
        return <LoadingBar fill />
      case 'transition-success':
        return <LoadingBarSuccess fill />
      case 'success':
        return <SuccessMessage />
      default:
        return (
          <Text color="error" py={4}>
            Something terrible has happened.
          </Text>
        )
    }
  }
}

export default Waitlist