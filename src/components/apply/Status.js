import React from 'react'
import { Badge } from '@hackclub/design-system'

const Status = ({ type, actionable=true, ...props }) => {
  const data = {
    unopened: { bg: 'primary', children: 'not started' },
    incomplete: { bg: 'warning', children: 'in progress' },
    complete: { bg: 'success', children: 'complete' },
    submitted: { bg: 'success', children: 'submitted' }
  }[type]
  const style = {
    opacity: actionable ? 1 : 0.6
  }
  return <Badge normal {...data} style={style} {...props}/>
}

export default Status
