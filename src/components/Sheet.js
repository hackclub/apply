import styled from 'styled-components'
import { Card, Container, theme } from '@hackclub/design-system'

const Sheet = styled(Card.withComponent(Container))`
  position: relative;
  overflow: hidden;
  border-radius: ${theme.radii[2]};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.0625);
`
Sheet.defaultProps = {
  bg: 'rgba(255, 255, 255, 0.875)',
  p: [3, 4],
  color: 'black',
  width: 1,
  mb: 4
}

export default Sheet
