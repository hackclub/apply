const AirtablePlus = require('airtable-plus')

const API_KEY = process.env.AIRTABLE;

export const prospectiveLeadersAirtable = new AirtablePlus({
  baseID: 'appSUAc40CDu6bDAp',
  apiKey: API_KEY,
  tableName: 'Prospective Leaders',
})

export const loginsAirtable = new AirtablePlus({
  baseID: 'appSUAc40CDu6bDAp',
  apiKey: API_KEY,
  tableName: 'Logins',
})

export const applicationsAirtable = new AirtablePlus({
  baseID: 'appSUAc40CDu6bDAp',
  apiKey: API_KEY,
  tableName: 'Application database',
})
