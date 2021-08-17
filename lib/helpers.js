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