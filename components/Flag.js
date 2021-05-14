import { theme, Link } from '@hackclub/design-system'
import styled, { css } from 'styled-components'

const Flag = styled(Link)`
  background-image: url(https://assets.hackclub.com/flag-orpheus-top.svg);
  background-repeat: no-repeat;
  background-position: top left;
  background-size: contain;
  cursor: pointer;
  flex-shrink: 0;
  width: 112px;
  height: 48px;
  transition: ${theme.transition} transform;
  transform-origin: top left;
  ${theme.mediaQueries.md} {
    width: 172px;
    height: 64px;
  }
  ${props =>
    props.scrolled &&
    css`
      transform: scale(0.75);
      height: 44px !important;
      ${theme.mediaQueries.md} {
        height: 54px !important;
      }
    `};
`
Flag.defaultProps = {
  to: '/',
  'aria-label': 'Homepage'
}

export default Flag
