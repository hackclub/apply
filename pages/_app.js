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
import Meta from '@hackclub/meta'
import Head from 'next/head'

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Meta
          as={Head}
          name="Apply to Hack Club" // site name
          title="Apply to Hack Club" // page title
          description="Hack Club is a global nonprofit network of high school coding clubs. Apply now to start yours—we’ll provide support, curriculum, community, stickers, and more." // page description
          image="https://apply.hackclub.com/card_1.png" // large summary card image URL
          color="#ec3750" // theme color
        />
        <Fullstory />
        <Flag />
        <NProgress color={'#ec3750'} />
        <ForceTheme theme="light" />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
