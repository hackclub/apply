import { applicationsAirtable, loginsAirtable, trackerAirtable } from '../../lib/airtable'
import nookies from 'nookies'
import { isInvalidBirthdate } from '../../lib/helpers'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }
  
  const cookies = nookies.get({ req })
  
  if (!cookies.authToken) {
    return res.status(401).json({ success: false, error: 'Unauthorized' })
  }
  
  try {
    const tokenRecord = await loginsAirtable.find('rec' + cookies.authToken)
    if (!tokenRecord?.fields?.Path?.[0]?.includes(req.query.id)) {
      return res.status(401).json({ success: false, error: 'Unauthorized' })
    }
    
    // Make sure birthday is valid
    const application = await applicationsAirtable.find('rec' + req.query.id)
    if (
      isInvalidBirthdate(
        application.fields['Leader Birthdays']?.[0],
        application.fields['Leader Birthdays']
      )
    )
      throw new Error('Invalid birthdates')
    
    // Mark as submitted
    await applicationsAirtable.update('rec' + req.query.id, {
      Submitted: true
    })
    
    // Create tracker record if it doesn't exist
    // App ID is a linked record field, so we pass an array with the record ID
    const existingTracker = await trackerAirtable.read({
      filterByFormula: `{App ID} = "rec${req.query.id}"`,
      maxRecords: 1
    })
    
    if (existingTracker.length === 0) {
      await trackerAirtable.create({
        'App ID': ['rec' + req.query.id],
        'Status': 'applied'
      })
    }
    
    res.status(200).json({ success: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: error.message })
  }
}
