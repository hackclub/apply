import styled from 'styled-components'
import React from 'react'
import { Box, Loading } from '@hackclub/design-system'
import PropTypes from 'prop-types'

const Base = styled(Box)`
  position: relative;
  ${props => props.fill && { height: '100vh' }};
  div {
    border-radius: 50%;
  }
`

const LoadingBar = props => (
  <Base py={5} {...props}>
    <Loading color={ props.color } />
  </Base>
)

LoadingBar.propTypes = {
  fill: PropTypes.bool,
  color: PropTypes.string
}

export default LoadingBar
