import React from 'react'
import { Button, Link } from '@hackclub/design-system'
import storage from '../../storage'

export const destroySession = () => {
  storage.remove('authToken')
  storage.remove('userId')
  window.reload()
}

Button.link = Button.withComponent(Link)

export default (props) => (
  <Button.link href="/" onClick={destroySession} children="Logout" {...props} />
)
