import { applicationsAirtable } from '../../lib/airtable'

export default async function handler(req, res) {
  try {
    const updateCall = await applicationsAirtable.update('rec' + req.query.id, {
      Submitted: true
    })
    res.status(200).json({ success: true, id: updateCall.id })
  } catch (error) {
    console.log(error)
    res.status(504).json({ success: false, error })
  }
}
