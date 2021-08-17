import manifest from '../../manifest'

export default async function handler(req, res) {
  res.json(manifest)
}

