import React from 'react'
import { Badge } from '@hackclub/design-system'
import { useIntl } from 'react-intl'

const Status = ({ type, actionable = true, ...props }) => {
  const intl = useIntl()

  const data = {
    unopened: {
      bg: 'primary',
      children: intl.formatMessage({ id: 'NOT_STARTED' })
    },
    incomplete: {
      bg: 'warning',
      children: intl.formatMessage({ id: 'IN_PROGRESS' })
    },
    complete: {
      bg: 'success',
      children: intl.formatMessage({ id: 'COMPLETE' })
    },
    submitted: {
      bg: 'success',
      children: intl.formatMessage({ id: 'SUBMITTED' })
    }
  }[type]
  const style = {
    opacity: actionable ? 1 : 0.6
  }
  return <Badge normal {...data} style={style} {...props} />
}

export default Status
