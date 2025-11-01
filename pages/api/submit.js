import { applicationsAirtable, loginsAirtable, trackerAirtable } from '../../lib/airtable'
import nookies from 'nookies'
import { isInvalidBirthdate } from '../../lib/helpers'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }
  
  const cookies = nookies.get({ req })
  try {
    const tokenRecord = await loginsAirtable.find('rec' + cookies.authToken)
    if (!tokenRecord.fields['Path'][0].includes(req.query.id)) {
      return res.status(401).json({ success: false, error: 'Unauthorized' })
    }
    // Make sure birthday is valid
    const application = await applicationsAirtable.find('rec' + req.query.id)
    if (
      isInvalidBirthdate(
        application.fields['Leader Birthdays'][0],
        application.fields['Leader Birthdays']
      )
    )
      throw new Error('Invalid birthdates')
    const updateCall = await applicationsAirtable.update('rec' + req.query.id, {
      Submitted: true
    })
    
    // Check if tracker record exists, if not create it
    const existingTracker = await trackerAirtable.read({
      filterByFormula: `{App ID} = "rec${req.query.id}"`,
      maxRecords: 1
    })
    
    if (existingTracker.length === 0) {
      await trackerAirtable.create({
        'App ID': 'rec' + req.query.id,
        'Status': 'applied'
      })
    }
    
    res.status(200).json({ success: true })
  } catch (error) {
    console.log(error)
    res.status(504).json({ success: false, error })
  }
}
