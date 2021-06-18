import { IntlProvider } from 'react-intl'
import { useMemo } from 'react'

import { useRouter } from 'next/router'

import enUSLanguageMessages from '../../content/compiled-locales/en-US.json'
import ptBRLanguageMessages from '../../content/compiled-locales/pt-BR.json'

const MyApp = ({ Component, pageProps }) => {
  const { locale } = useRouter()

  const messages = useMemo(() => {
    switch (locale) {
      case 'pt-BR':
        return ptBRLanguageMessages
      default:
        return enUSLanguageMessages
    }
  }, [locale])

  return (
    <IntlProvider defaultLocale="en-US" locale={locale} messages={messages}>
      <Component {...pageProps} />
    </IntlProvider>
  )
}

export default MyApp
