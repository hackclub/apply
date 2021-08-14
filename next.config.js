const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
  i18n: {
    locales: ['en-US', 'pt-BR'],
    defaultLocale: 'en-US'
  }
})
