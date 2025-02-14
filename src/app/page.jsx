'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
    const [url, setUrl] = useState('')
    const [carbonData, setCarbonData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchCarbonData = async () => {
        if (!url) {
            setError('Please enter a valid URL.')
            return
        }

        setLoading(true)
        setError('')

        try {
            const response = await fetch(
                `/api/carbon?url=${encodeURIComponent(url)}`
            )
            if (!response.ok) {
                throw new Error('Failed to fetch carbon data. Check the URL.')
            }
            const data = await response.json()
            setCarbonData(data)
        } catch (err) {
            setError(err.message)
            setCarbonData(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1>Website Carbon Footprint Checker</h1>
            <p>Enter the URL of a website to check its carbon footprint:</p>
            <input
                type="text"
                placeholder="Enter website URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="url-input"
            />
            <button onClick={fetchCarbonData} disabled={loading}>
                {loading ? 'Checking...' : 'Check Carbon Footprint'}
            </button>

            {error && <p className="error-message">{error}</p>}

            {carbonData && (
                <div className="result">
                    <h2>Results for {url}</h2>
                    <p>
                        Estimated CO₂ Emissions:{' '}
                        <strong>
                            {carbonData.statistics.co2.grid.grams.toFixed(2)}{' '}
                            grams
                        </strong>
                    </p>
                    <p>
                        Renewable Hosting:{' '}
                        <strong>
                            {carbonData.green ? 'Yes (Green Hosting)' : 'No'}
                        </strong>
                    </p>
                </div>
            )}
        </div>
    )
}
