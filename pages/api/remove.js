import { base } from '/lib/base'
import nookies from 'nookies'

export default async function handler(req, res) {
  const cookies = nookies.get({ req })
  try {
    console.log(cookies.authToken)
    const tokenRecord = await base("Logins").find('rec' + cookies.authToken)
    console.log(req.query.id)
    console.log(tokenRecord.fields['Path'])
    if (!tokenRecord.fields['Path'][0].includes(req.query.id)) {
      console.log('not authed!')
      res.redirect('/')
      return
    }
    console.log(req.query.leaderID)
    const deleteCall = await base("Prospective Leaders").destroy(req.query.leaderID)
    console.log(deleteCall)
    res.status(200).json({ success: true, res: deleteCall })
  } catch (error) {
    console.log(error)
    res.status(504).json({ success: false, error })
  }
}
