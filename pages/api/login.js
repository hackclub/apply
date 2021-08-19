import { base } from '/lib/base'

export default async function handler(req, res) {
  try {
    const firstAirtableCall = await base("Prospective Leaders").read({
      maxRecords: 1,
      filterByFormula: `Email = "${req.query.email}"`
    })

    if (firstAirtableCall.length > 0) {
      const prospectiveLeadersRecord = firstAirtableCall[0]
      const loginRecord = await base("Logins").create({
        'Relevant User': [prospectiveLeadersRecord.id]
      })
      res.json({ success: true, id: loginRecord.id })
    } else {
      const applicationsRecord = await base("Applications").create({})
      const prospectiveLeadersRecord = await base("Prospective Leaders").create({
        Email: req.query.email,
        Application: [applicationsRecord.id]
      })
      const loginRecord = await base("Logins").create({
        'Relevant User': [prospectiveLeadersRecord.id]
      })
      res.json({ success: true, id: loginRecord.id })
    }
  } catch (error) {
    console.log(error)
    res.status(504).json({ success: false, error })
  }
}
