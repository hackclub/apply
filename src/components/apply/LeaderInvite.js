import React, { Component, Fragment } from 'react'
import {
  Box,
  Flex,
  Link,
  IconButton,
  Text,
  theme
} from '@hackclub/design-system'
import I from '@hackclub/icons'
import styled from 'styled-components'
import LeaderInviteForm from './LeaderInviteForm'

const Icon = Box.withComponent(I)

const SectionIcon = styled(IconButton).attrs({
  glyph: props => (props.open ? 'view-close' : 'member-add'),
  bg: props => (props.open ? 'gray.5' : 'success'),
  size: 32,
  p: 1,
  ml: 'auto',
  circle: true
})`
  transition: ${theme.transition} all;
  transform: rotate(${props => (props.open ? 90 : 0)}deg);
  user-select: none;
  box-shadow: ${theme.boxShadows[0]} !important;
  &:hover,
  &:focus {
    box-shadow: ${theme.boxShadows[1]} !important;
  }
`

const InfoBase = styled(Box)`
  display: grid;
  grid-gap: ${theme.space[3]}px;
  padding-bottom: ${theme.space[3]}px;
  ${theme.mediaQueries.md} {
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
  }
  div {
    background-color: ${theme.colors.blue[0]};
    border-radius: ${theme.radii[2]};
  }
`

const InfoSheet = () => (
  <InfoBase>
    <Box p={3} color="info" fontSize={2} align="left">
      <Icon glyph="welcome" size={36} mr={[2, 3]} color="info" />
      <Text>
        You can read our{' '}
        <Link
          href="https://hackclub.com/workshops/leadership_team"
          target="_blank"
          bold
        >
          guide for selecting your team here
        </Link>
        .
      </Text>
    </Box>
    <Box p={3} color="info" fontSize={2} align="left">
      <Icon glyph="leader" size={36} mr={[2, 3]} color="info" />
      <Text>Your teacher sponsor does not need to fill out a profile.</Text>
    </Box>
  </InfoBase>
)

class LeaderInvite extends Component {
  state = { open: false }

  toggle = e => this.setState(({ open }) => ({ open: !open }))

  render() {
    const { open } = this.state
    return (
      <Fragment>
        <Flex align="center" aria-expanded={open} mt={[4, 5]} mb={2}>
          <Text fontSize={4} color="muted" bold caps>
            Co-leaders
          </Text>
          <SectionIcon open={open} onClick={this.toggle} />
        </Flex>
        {open && <LeaderInviteForm {...this.props} />}
        {open && <InfoSheet />}
      </Fragment>
    )
  }
}

export default LeaderInvite
