import * as React from 'react'
import NextApp from 'next/app'
import '../styles/app.css'
import '@hackclub/theme/fonts/reg-bold.css'
import theme from '@hackclub/theme'
import { ThemeProvider } from 'theme-ui'
import ForceTheme from '../components/force-theme'
import Flag from '../components/flag'
import NProgress from '../components/nprogress'
import Fullstory from '../components/fullstory'

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Fullstory />
        <Flag />
        <NProgress color={'#ec3750'} />
        <ForceTheme theme="light" />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
