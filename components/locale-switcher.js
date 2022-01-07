import { useRouter } from 'next/router'
import { Select, Flex } from 'theme-ui'

const LocaleSwitcher = props => {
  const router = useRouter()
  return (
    <Flex
      sx={{
        bg: 'none',
        width: '100px',
        marginLeft: 'auto',
        marginRight: '15px',
        display: 'inline-block',
        paddingTop: '10px'
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
          width: '100px',
          boxShadow: '0 4px 8px rgb(0 0 0 / 13%)',
          ':focus': { outline: 'none !important' }
        }}
        id="locale-select"
      >
        {router.locales.map(locale => (
          <option key={locale} value={locale}>
            {locale}
          </option>
        ))}
      </Select>
    </Flex>
  )
}

export default LocaleSwitcher
