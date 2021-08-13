import {
  applicationsAirtable,
  prospectiveLeadersAirtable,
  loginsAirtable
} from '../../../lib/airtable'
import manifest from '../../../manifest'
import nookies from 'nookies'

export default async function handler(req, res) {
  const cookies = nookies.get({req})
  try {
    const tokenRecord = await loginsAirtable.find(
      'rec' + cookies.authToken
    )
    if(!tokenRecord.fields['Path'].includes(req.query.id)){
      res.redirect('/')
      return
    }
    let newData = {}
    let complete = true
    let requestBody = JSON.parse(req.body)
    let mapping = (
      req.query.type == 'club' ? manifest.clubs : manifest.leaders
    ).map(sectionItem =>
      sectionItem.items.map(item => {
        newData[item.key] = requestBody[item.key]
        if (requestBody[item.key] === undefined && item.optional == false) {
          complete = false
        }
      })
    )
    if (complete === true) {
      console.log('came here!')
      newData['Completed'] = true
    }
    else{
      console.log('no i came came here!')
      newData['Completed'] = false
    }
    const updateCall = await (req.query.type == 'club'
      ? applicationsAirtable
      : prospectiveLeadersAirtable
    ).update('rec'+ req.query.id, newData)
    res.status(200).json({ success: true, id: updateCall.id })
  } catch (error) {
    console.log(error)
    res.status(504).json({ success: false, error })
  }
}
