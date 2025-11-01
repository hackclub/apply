import { useRouter } from 'next/router'
import { Select, Flex } from 'theme-ui'

const LocaleSwitcher = props => {
  const router = useRouter()

  const languages = {
    'en-US': 'English',
    'pt-PT': 'Português'
  }

  return (
    <Flex
      sx={{
        bg: 'none',
        width: '120px',
        marginLeft: 'auto',
        marginRight: '15px',
        display: 'inline-block',
        paddingTop: '10px',
        height: '50px'
      }}
    >
      <Select
        defaultValue={router.locale}
        onChange={() => {
          router.locale = document.getElementById('locale-select').value
          router.push(router.asPath, router.asPath, { locale: router.locale })
        }}
        sx={{
          bg: 'white',
          width: '120px',
          boxShadow: '0 4px 8px rgb(0 0 0 / 13%)',
          ':focus': { outline: 'none !important' }
        }}
        id="locale-select"
      >
        {router.locales.map(locale => (
          <option key={locale} value={locale}>
            {languages[locale]}
          </option>
        ))}
      </Select>
    </Flex>
  )
}

export default LocaleSwitcher
