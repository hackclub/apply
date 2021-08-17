import { loginsAirtable } from '../../../lib/airtable'
import nookies from 'nookies'

export default async function handler(req, res) {
  try {
    const tokenRecord = await loginsAirtable.find('rec' + req.query.token)
    if (tokenRecord.fields['Path']) {
      nookies.set({ res }, 'authToken', req.query.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
    }
    res.redirect(`/${tokenRecord.fields['Locale with a slash'] ? tokenRecord.fields['Locale with a slash'] : ''}${tokenRecord.fields['Path'] ? tokenRecord.fields['Path'] : ''}`)
  } catch {
    res.redirect('/')
  }
}
