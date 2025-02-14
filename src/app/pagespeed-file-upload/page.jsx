'use client'
import { useState } from 'react'

export default function PageSpeed() {
    const [file, setFile] = useState(null)
    const [results, setResults] = useState([])
    const [error, setError] = useState('')

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleUpload = async () => {
        if (!file) {
            setError('Please upload a file.')
            return
        }

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) throw new Error('Failed to upload sitemap')

            const { urls } = await response.json()

            // Fetch PageSpeed Insights for URLs
            const pageSpeedResponse = await fetch('/api/page-speed', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ urls }),
            })

            if (!pageSpeedResponse.ok)
                throw new Error('Failed to fetch PageSpeed data')

            const { results } = await pageSpeedResponse.json()
            setResults(results)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            <h1>PageSpeed Insights</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Sitemap</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {results.length > 0 && (
                <div>
                    <h2>Results:</h2>
                    {results.map((result, index) => (
                        <div key={index}>
                            <h3>{result.url}</h3>
                            <pre>{JSON.stringify(result.data, null, 2)}</pre>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
