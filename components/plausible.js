import Script from 'next/script'

const Plausible = () => (
  <Script
    defer
    data-domain="apply.hackclub.com"
    src="https://plausible.io/js/plausible.js"
  />
)

export default Plausible
