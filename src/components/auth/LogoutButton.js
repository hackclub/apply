import React from 'react'
import { Button, Link } from '@hackclub/design-system'
import storage from '../../storage'
import { useIntl } from 'react-intl'

export const destroySession = () => {
  storage.remove('authToken')
  storage.remove('userId')
  window.reload()
}

Button.link = Button.withComponent(Link)

const LogoutButton =(props) => {
  const intl = useIntl()

  return (
    <Button.link
      href="/"
      onClick={destroySession}
      children={intl.formatMessage({ id: 'LOGOUT' })}
      {...props}
    />
  )
}

export default LogoutButton