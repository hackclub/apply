import {
  prospectiveLeadersAirtable,
  loginsAirtable,
  applicationsAirtable
} from '../../lib/airtable'

export default async function handler(req, res) {
  try {
    const firstAirtableCall = await prospectiveLeadersAirtable.read({
      maxRecords: 1,
      filterByFormula: `Email = "${decodeURIComponent(req.query.email)}"`
    })

    if (firstAirtableCall.length > 0) {
      const prospectiveLeadersRecord = firstAirtableCall[0]
      const loginRecord = await loginsAirtable.create({
        'Relevant User': [prospectiveLeadersRecord.id],
        Locale: req.query.locale
      })
      res.json({ success: true, id: loginRecord.id })
    } else {
      let today = new Date().toLocaleDateString()
      const applicationsRecord = await applicationsAirtable.create({
        'Application Date': today
      })
      const prospectiveLeadersRecord = await prospectiveLeadersAirtable.create({
        Email: decodeURIComponent(req.query.email),
        Application: [applicationsRecord.id]
      })
      const loginRecord = await loginsAirtable.create({
        'Relevant User': [prospectiveLeadersRecord.id],
        Locale: req.query.locale,
        Type: 'Apply'
      })
      res.json({ success: true, id: loginRecord.id })
    }
  } catch (error) {
    console.log(error)
    res.status(504).json({ success: false, error })
  }
}
