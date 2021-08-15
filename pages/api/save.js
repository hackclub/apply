import { base } from "/lib/airtable"

const updateBaseMaker = (req, res) => async (type) => {
	return base(type).update(
		"rec" + req.query.id,
		JSON.parse(req.body), 
		(err, records) => {
			if (err) {
			    res.status(504).json({ success: false, err })
			} else {
				console.log("records", records);
				res.status(200).json({ success: true, fields: records.fields })
			}
		}
	)
}

export default async function handler(req, res) { 
	console.log(req);
	// TODO: check authentication?

	const updateBase = updateBaseMaker(req, res);

	if (req.query.club === "true") {
		// update app for req.id
		await updateBase("Applications");
	} else {
		// update profile for req.id
		await updateBase("Prospective Leaders")
	}

	// TODO: should we validate?
}












