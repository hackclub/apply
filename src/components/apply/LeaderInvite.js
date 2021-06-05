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
import { injectIntl, useIntl } from 'react-intl'

const Icon = Box.withComponent(I)

const SectionIcon = styled(IconButton).attrs({
  glyph: (props) => (props.open ? 'view-close' : 'member-add'),
  bg: (props) => (props.open ? 'gray.5' : 'success'),
  size: 32,
  p: 1,
  ml: 'auto',
  circle: true
})`
  transition: ${theme.transition} all;
  transform: rotate(${(props) => (props.open ? 90 : 0)}deg);
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

const InfoSheet = () => {
  const intl = useIntl()

  return (
    <InfoBase>
      <Box p={3} color="info" fontSize={2} align="left">
        <Icon glyph="welcome" size={36} mr={[2, 3]} color="info" />
        <Text>
          {intl.formatMessage({ id: 'YOU_CAN_READ_OUR' })}{' '}
          <Link
            href="https://hackclub.com/workshops/leadership_team"
            target="_blank"
            bold
          >
            {intl.formatMessage({ id: 'GUIDE_FOR_SELECTING_TEAM' })}
          </Link>
          .
        </Text>
      </Box>
      <Box p={3} color="info" fontSize={2} align="left">
        <Icon glyph="leader" size={36} mr={[2, 3]} color="info" />
        <Text>
          {intl.formatMessage({
            id: 'TEACHER_SPONSOR_DOESNT_NEED_TO_FILL_PROFILE'
          })}
        </Text>
      </Box>
    </InfoBase>
  )
}

class LeaderInvite extends Component {
  state = { open: false }

  toggle = (e) => this.setState(({ open }) => ({ open: !open }))

  render() {
    const { open } = this.state
    return (
      <Fragment>
        <Flex align="center" aria-expanded={open} mt={[4, 5]} mb={2}>
          <Text fontSize={4} color="muted" bold caps>
            {this.props.intl.formatMessage({ id: 'CO_LEADERS' })}
          </Text>
          <SectionIcon open={open} onClick={this.toggle} />
        </Flex>
        {open && <LeaderInviteForm {...this.props} />}
        {open && <InfoSheet />}
      </Fragment>
    )
  }
}

const LeaderInviteWithIntl = injectIntl(LeaderInvite)

export default LeaderInviteWithIntl
