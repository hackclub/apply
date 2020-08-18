module.exports = {
  siteMetadata: {
    title: 'Apply to Hack Club',
    siteUrl: 'https://apply.hackclub.com'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Hack Club',
        short_name: 'Hack Club',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#e42d42',
        display: 'minimal-ui'
      }
    },
    {
      resolve: 'gatsby-plugin-segment',
      options: {
        writeKey: '35oTlU4UqlhIN8VGYmBxAzyDdfzhcscw'
      }
    }
  ]
}
