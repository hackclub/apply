import React, { Component } from 'react'
import { useRouter } from 'next/router'
import { Text, Flex, Box, Link } from '@hackclub/design-system'
import Flag from '../Flag'
import LogoutButton from '../auth/LogoutButton'
import { startCase, toLower } from 'lodash'
import { injectIntl } from 'react-intl'

const Crumb = ({ isLast, ...props }) => {
  const Tag = isLast ? Text.span : Link
  return <Tag {...props} />
}

class Breadcrumb extends Component {
  state = { path: [] }

  componentDidMount() {
    const path = window.location.pathname
      .split('/')
      .filter((chunk) => chunk !== '' && !this.props.locales.includes(chunk))
    this.setState({ path })
  }

  render() {
    const { path } = this.state
    const runningPath = ['']
    return (
      <>
        <Crumb href="/" color="slate" fontSize={3}>
          {this.props.intl.formatMessage({ id: 'APPLY' })}
        </Crumb>
        {path.length > 0 && (
          <Text.span mx={2} color="muted" regular children="›" />
        )}
        {path.map((section, index) => {
          runningPath.push(section)
          const isLast = path.length - index - 1 === 0
          const humanizedSection = startCase(
            toLower(
              this.props.intl.formatMessage({
                id: `${section.toUpperCase()}_ROUTE`
              })
            )
          )
          return (
            <Crumb
              href={runningPath.join('/')}
              color={isLast ? 'black' : 'slate'}
              fontSize={3}
              isLast
              key={index}
            >
              {humanizedSection}
            </Crumb>
          )
        })}
      </>
    )
  }
}

const BreadCrumbWithIntl = injectIntl(Breadcrumb)

const ApplyNav = ({ breadcrumb = true, ...props }) => {
  const { locales } = useRouter()

  return (
    <Flex
      px={[3, 4]}
      pb={2}
      justify="space-between"
      align="center"
      width={1}
      style={{ position: 'relative' }}
      {...props}
    >
      <Flag />
      {breadcrumb && (
        <Box fontSize={[2, 4]} mt={2} width={32 * 16}>
          <BreadCrumbWithIntl locales={locales} />
        </Box>
      )}
      <LogoutButton mt={2} inverted />
    </Flex>
  )
}

export default ApplyNav
