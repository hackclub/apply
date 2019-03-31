import React, { Component, Fragment } from 'react'
import { Box, Container, Flex, IconButton, Text, theme } from '@hackclub/design-system'
import I from '@hackclub/icons'
import styled from 'styled-components'
import LeaderInviteForm from 'components/apply/LeaderInviteForm'

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

const HelpSheet = styled(Container).attrs({
  my: [3, 4],
  px: [3, 4],
  py: 3,
  bg: 'blue.0'
})`
  border-radius: ${theme.radii[2]};
  display: flex;
  ${theme.mediaQueries.md} {
    align-items: center;
  }
`

const TeacherInviteWarning = () => (
  <HelpSheet>
    <Icon glyph="leader" size={36} mr={[2, 3]} color="info" />
    <Box color="info" fontSize={2} align="left">
      <Text>Invited co-leaders should be fellow students.</Text>
      <Text>Your teacher sponsor does not need to fill out a profile.</Text>
    </Box>
  </HelpSheet>
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
        {open && <TeacherInviteWarning />}
        {open && <LeaderInviteForm {...this.props} />}
      </Fragment>
    )
  }
}

export default LeaderInvite
