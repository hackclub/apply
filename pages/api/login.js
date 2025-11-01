import {
  prospectiveLeadersAirtable,
  loginsAirtable,
  applicationsAirtable,
  trackerAirtable
} from '../../lib/airtable'

export default async function handler(req, res) {
  try {
    // Sanitize email to prevent Airtable formula injection
    const email = decodeURIComponent(req.query.email).replace(/"/g, '\\"')
    const firstAirtableCall = await prospectiveLeadersAirtable.read({
      maxRecords: 1,
      filterByFormula: `Email = "${email}"`
    })

    if (firstAirtableCall.length > 0) {
      const prospectiveLeadersRecord = firstAirtableCall[0]
      const loginRecord = await loginsAirtable.create({
        'Relevant User': [prospectiveLeadersRecord.id],
        Locale: req.query.locale
      })
      // Ensure a tracker record exists for any linked application(s)
      try {
        const appIds = prospectiveLeadersRecord.fields?.Application || []
        for (const appId of appIds) {
          const recId = appId.startsWith('rec') ? appId : `rec${appId}`
          let existing = []
          try {
            existing = await trackerAirtable.read({
              filterByFormula: `{App ID} = "${recId}"`,
              maxRecords: 1
            })
          } catch (e) {
            existing = []
          }
          if (!existing || existing.length === 0) {
            try {
              await trackerAirtable.create({ Application: [recId], Status: 'applied' })
            } catch (createError) {
              console.warn('login: tracker creation failed for', recId, createError.message)
            }
          }
        }
      } catch (e) {
        console.warn('login: tracker ensure failed', e.message)
      }
      res.json({ success: true })
    } else {
      let today = new Date().toLocaleDateString('en-US')
      const applicationsRecord = await applicationsAirtable.create({
        'Application Date': today
      })
      // Try to create a tracker row for this new application. Use multiple payload
      // shapes to be resilient to Tracker table schema differences.
      try {
        const recId = applicationsRecord.id.startsWith('rec')
          ? applicationsRecord.id
          : `rec${applicationsRecord.id}`
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
            console.warn('login: tracker creation attempt failed for payload', payload, createError.message)
          }
        }
        if (!created) console.error('login: tracker creation failed for new application', recId)
      } catch (e) {
        console.warn('login: tracker creation flow error', e.message)
      }
      const prospectiveLeadersRecord = await prospectiveLeadersAirtable.create({
        Email: decodeURIComponent(req.query.email),
        Application: [applicationsRecord.id]
      })
      const loginRecord = await loginsAirtable.create({
        'Relevant User': [prospectiveLeadersRecord.id],
        Locale: req.query.locale,
        Type: 'Apply'
      })
      res.json({ success: true })
    }
  } catch (error) {
    console.log(error)
    res.status(504).json({ success: false, error })
  }
}
