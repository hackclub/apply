
import { useEffect } from 'react'
import { useColorMode } from 'theme-ui'

const ForceTheme = ({ theme }) => {
  const [colorMode, setColorMode] = useColorMode()
  // This looks redundant, but is done on purpose. 
  // See for similar issue on seperate project: https://github.com/reduxjs/react-redux/issues/1640#issuecomment-705892206
  useEffect(() => {
    setColorMode(theme)
  })
  return null
}

export default ForceTheme