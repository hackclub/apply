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
    
    // Create tracker record if it doesn't exist.
    // Try multiple filter formulas to detect existing tracker records (some tracker tables
    // may use "App ID" or a linked "Application" field).
    const recId = `rec${req.query.id}`
    let existingTracker = await trackerAirtable.read({
      filterByFormula: `{App ID} = "${recId}"`,
      maxRecords: 1
    })

    if (!existingTracker || existingTracker.length === 0) {
      // Try an alternate formula that looks for the linked record id inside a linked field
      try {
        existingTracker = await trackerAirtable.read({
          filterByFormula: `FIND("${recId}", {Application})`,
          maxRecords: 1
        })
      } catch (e) {
        // If the second read fails, just continue — we'll still attempt to create below
        console.warn('Tracker alternate read failed, continuing to create:', e.message)
        existingTracker = []
      }
    }

    if (!existingTracker || existingTracker.length === 0) {
      // Try multiple create payload shapes to handle different Tracker table schemas.
      const createCandidates = [
        { Application: [recId], Status: 'applied' },
        { 'App ID': recId, Status: 'applied' },
        { 'App ID': [recId], Status: 'applied' }
      ]

      let created = false
      for (const payload of createCandidates) {
        try {
          await trackerAirtable.create(payload)
          created = true
          break
        } catch (createError) {
          console.warn('Tracker creation attempt failed for payload', payload, createError.message)
        }
      }

      if (!created) {
        // If all attempts fail, log the situation so we can investigate (don't throw).
        console.error('Tracker creation failed for all payloads; tracker record missing for', recId)
      }
    }
    
    res.status(200).json({ success: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: error.message })
  }
}
