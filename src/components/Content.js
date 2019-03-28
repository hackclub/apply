import styled from 'styled-components'
import { Heading, theme } from '@hackclub/design-system'

export const Headline = styled(Heading.h1).attrs({
  fontSize: [6, 7],
  mb: [3, 4]
})`
  display: block;
  line-height: 1;
  width: 100%;
  ${theme.mediaQueries.lg} {
    line-height: 0.9375;
  }
`

export const Subhline = styled(Heading.h3).attrs({
  fontSize: [5, 6],
  mb: 3,
  bold: true
})`
  line-height: 1;
`

export const Featline = styled(Heading.h3).attrs({
  fontSize: 5,
  mb: 3,
  bold: true
})`
  line-height: 1;
`
