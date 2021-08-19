import { base } from '/lib/base'
import nookies from 'nookies'

export default async function handler(req, res) {
  try {
    const tokenRecord = await base("Logins").find('rec' + req.query.token)
    if (tokenRecord.fields['Path']) {
      nookies.set({ res }, 'authToken', req.query.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
    }
    res.redirect(`/${tokenRecord.fields['Path'] ? tokenRecord.fields['Path'] : ''}`)
  } catch {
    res.redirect('/')
  }
}
