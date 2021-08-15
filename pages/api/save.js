import { base } from "/lib/airtable"

export default async function handler(req, res) { 
	console.log(req);
	// TODO: check authentication?

	if (req.query.club === "true") {
		// update app for req.id
		base("Applications").update(
			"rec" + req.query.id,
			JSON.parse(req.body)
		, (err, records) => {
			if (err) {
			    res.status(504).json({ success: false, err })
			} else {
				console.log("records", records);
				res.status(200).json({ success: true, fields: records.fields })
			}
		})
	} else {
		// update profile for req.id
		base("Prospective Leaders").update(
			"rec" + req.query.id,
			JSON.parse(req.body)
		, (err, records) => {
			if (err) {
			    res.status(504).json({ success: false, err })
			} else {
				console.log("records", records);
				res.status(200).json({ success: true, fields: records.fields })
			}
		})
	}

	// TODO: should we validate?
}












