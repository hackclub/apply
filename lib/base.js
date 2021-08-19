const Airtable = require("airtable");

const API_KEY = process.env.AIRTABLE;

export const base = new Airtable({ apiKey: API_KEY }).base('appSUAc40CDu6bDAp');
