const AirtablePlus = require('airtable-plus');
const Airtable = require("Airtable");

const API_KEY = process.env.AIRTABLE;

export const base = new Airtable({ apiKey: API_KEY }).base('appSUAc40CDu6bDAp');

// export const prospectiveLeadersAirtable = base('Prospective Leaders')

// export const loginsAirtable = base('Logins')

// export const applicationsAirtable = base('Applications')
