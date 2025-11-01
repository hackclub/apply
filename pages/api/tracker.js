import { trackerAirtable, loginsAirtable } from '../../lib/airtable'
import nookies from 'nookies'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const cookies = nookies.get({ req })
  if (!cookies.authToken) {
    return res.status(401).json({ success: false, error: 'Unauthorized' })
  }

  try {
    // Basic auth check: ensure the token exists and is valid. We don't strictly
    // require Path check here, but you can add app-specific validation if needed.
    const tokenRecord = await loginsAirtable.find('rec' + cookies.authToken)
    if (!tokenRecord) {
      return res.status(401).json({ success: false, error: 'Unauthorized' })
    }

    const appParam = req.query.application
    if (!appParam) {
      return res.status(400).json({ success: false, error: 'Missing application param' })
    }

    const recId = `rec${appParam}`
    // Try several filter formulas similar to submit handler
    let trackerRecord = []
    try {
      trackerRecord = await trackerAirtable.read({
        filterByFormula: `{App ID} = "${recId}"`,
        maxRecords: 1
      })
    } catch (e) {
      trackerRecord = []
    }

    if (!trackerRecord || trackerRecord.length === 0) {
      try {
        trackerRecord = await trackerAirtable.read({
          filterByFormula: `FIND("${recId}", {Application})`,
          maxRecords: 1
        })
      } catch (e) {
        trackerRecord = []
      }
    }

    return res.status(200).json({ success: true, trackerRecord })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, error: error.message })
  }
}
