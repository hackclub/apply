import manifest from '../manifest'

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export function returnLocalizedMessage(locale, key) {
  const { messageObject } = require(`../translations/${locale}`)
  return messageObject[key]
}

export function returnLocalizedQuestionText(locale, item, key) {
  if (locale == 'en-US') {
    return item[key]
  } else if (item.translations === undefined) {
    return item[key]
  } else if (item.translations[locale] === undefined) {
    return item[key]
  } else if (item.translations[locale][key] === undefined) {
    return item[key]
  } else {
    return item.translations[locale][key]
  }
}

export function calculateMinDate() {
  const currentDate = new Date()
  const maximumAge = manifest.metaData.maximumAge
  currentDate.setFullYear(currentDate.getFullYear() - maximumAge)
  return currentDate
}

export function isInvalidBirthdate(date, dates = []) {
  if (!date) return false // Empty birthdate
  const minDate = calculateMinDate()
  if (minDate < new Date(date))
    return false // Leader falls in within age category
  else if (dates.length) {
    // Leader doesn't fall in within age category - check if co-leaders may have valid birthday
    const values = dates.map(x => minDate > new Date(x))
    if (values.includes(false)) return false // Co-leader has valid birthday, so form can be filled out
  }
  return true // None of them have valid birthdays
}

export function handleChangeInDate(date, dates, stateSetter) {
  stateSetter(isInvalidBirthdate(date, dates))
}
