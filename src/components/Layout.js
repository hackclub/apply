import React from 'react'
import Helmet from 'react-helmet'
import { name, title, description, img, url } from 'data.json'
import { ThemeProvider, theme } from '@hackclub/design-system'
import BG from 'components/BG'

const meta = tags =>
  tags.map((props, index) =>
    React.createElement('meta', { ...props, key: index })
  )

export default ({ bg, children }) => (
  <ThemeProvider webfonts>
    <Helmet defaultTitle={title}>
      <html lang="en" />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content={theme.colors.primary} />
      {meta([
        { name: 'description', content: description },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@hackclub' },
        { name: 'twitter:domain', content: url },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: img },
        { property: 'og:site_name', content: name },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: img },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: url }
      ])}
    </Helmet>
    {bg && <BG color={bg} />}
    {children}
  </ThemeProvider>
)
