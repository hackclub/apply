import * as React from 'react'
import NextApp from 'next/app'
import '../styles/app.css'
import "../styles/ApplicationClub.css";
import '@hackclub/theme/fonts/reg-bold.css'
import theme from '@hackclub/theme'
import { ThemeProvider } from 'theme-ui'
import ForceTheme from '../components/force-theme'
import Flag from '../components/flag'

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Flag />
        <ForceTheme theme="light" />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
