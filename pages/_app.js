import * as React from 'react'
import NextApp from 'next/app'
import '../styles/app.css'
import '@hackclub/theme/fonts/reg-bold.css'
import theme from '@hackclub/theme'
import { ThemeProvider } from 'theme-ui'
import ColorSwitcher from '../components/color-switcher'
import ForceTheme from '../components/force-theme'

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <ForceTheme theme="light" />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
