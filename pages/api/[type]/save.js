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
    console.log(tokenRecord.fields['Path'])
    console.log(req.query.id)
    if(!tokenRecord.fields['Path'][0].includes(req.query.id)){
      res.redirect('/')
      return
    }

    const requestBody = JSON.parse(req.body);
    const template = req.query.type == 'club' ? manifest.clubs : manifest.leaders;
    const newData = template
      .map(({ items }) => items)
      .flat()
      .reduce((acc, cur) => {
        const { key, optional = false } = cur;
        acc[key] = requestBody[key];

        if (!optional && requestBody[key] && (requestBody[key].trim() === "" || requestBody[key] === undefined)) {
          acc.Completed = false; 
        }

        return acc;
      }, { Completed: true });



    const table = req.query.type == 'club' ? applicationsAirtable : prospectiveLeadersAirtable;
    const updateCall = await table.update('rec'+ req.query.id, newData);

    res.status(200).json({ success: true, id: updateCall.id, newData })
  } catch (error) {
    console.log(error)
    res.status(504).json({ success: false, error })
  }
}
