import {
  prospectiveLeadersAirtable,
  loginsAirtable,
} from '../../lib/airtable'

export default async function handler(req, res) {
  try {
    const prospectiveLeadersRecord = await prospectiveLeadersAirtable.create({
      Email: req.query.email,
      Application: ['rec'+ req.query.id]
    })
    const loginRecord = await loginsAirtable.create({
      'Relevant User': [prospectiveLeadersRecord.id],
      "New Invite": true
    })
    res.json({ success: true, id: loginRecord.id })
  } catch (error) {
    console.log(error)
    res.status(504).json({ success: false, error })
  }
}
