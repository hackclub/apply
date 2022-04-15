import manifest from "../manifest"

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export function returnLocalizedMessage(locale, key){
  const {messageObject} = require(`../translations/${locale}`)
  return messageObject[key]
}

export function returnLocalizedQuestionText(locale, item, key){
  if(locale == "en-US"){
    return item[key]
  }
  else if(item.translations === undefined){
    return item[key]
  }
  else if(item.translations[locale] === undefined){
    return item[key]
  }
  else if(item.translations[locale][key] === undefined){
    return item[key]
  }
  else {
    return item.translations[locale][key]
  }
}

export function calculateMinDate() {
  const currentDate = new Date()
  const maximumAge = manifest.metaData.maximumAge
  currentDate.setFullYear(currentDate.getFullYear() - maximumAge)

  const year = `${currentDate.getFullYear()}`

  const month =
    currentDate.getMonth().toString().length == 1
      ? `0${currentDate.getMonth()}`
      : `${currentDate.getMonth()}`

  const date =
    currentDate.getDate().toString().length == 1
      ? `0${currentDate.getDate()}`
      : `${currentDate.getDate()}`

  return `${year}-${month}-${date}`
}