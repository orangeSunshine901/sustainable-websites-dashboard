export default async function handler(req, res) {
    const { url } = req.query

    if (!url) {
        return res.status(400).json({ error: 'URL is required' })
    }

    try {
        const response = await fetch(
            `https://cors-anywhere.herokuapp.com/https://api.websitecarbon.com/site?url=${url}`
        )
        const data = await response.json()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch data from Website Carbon API',
        })
    }
}
