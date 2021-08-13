const AirtablePlus = require('airtable-plus')

export const prospectiveLeadersAirtable = new AirtablePlus({
  baseID: 'appSUAc40CDu6bDAp',
  apiKey: process.env.AIRTABLE,
  tableName: 'Prospective Leaders'
})

export const loginsAirtable = new AirtablePlus({
  baseID: 'appSUAc40CDu6bDAp',
  apiKey: process.env.AIRTABLE,
  tableName: 'Logins'
})

export const applicationsAirtable = new AirtablePlus({
  baseID: 'appSUAc40CDu6bDAp',
  apiKey: process.env.AIRTABLE,
  tableName: 'Applications'
})
