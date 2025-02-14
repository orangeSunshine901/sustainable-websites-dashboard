'use client'

import { useEffect, useState } from 'react'

export default function PageSpeedClient() {
    const [pageSpeedResults, setPageSpeedResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPageSpeed = async () => {
            try {
                const response = await fetch('/api/pagespeed-server') // Use correct API route
                const data = await response.json()

                if (response.ok) {
                    setPageSpeedResults(data.pageSpeedResults)
                } else {
                    setError(data.error || 'Something went wrong')
                }
            } catch (err) {
                setError(err.message || 'Something went wrong')
            } finally {
                setLoading(false)
            }
        }

        fetchPageSpeed()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h1>PageSpeed Insights</h1>
            {pageSpeedResults.map(({ url, pageSpeedData }, index) => (
                <div key={index}>
                    <h2>{url}</h2>
                    <pre>{JSON.stringify(pageSpeedData, null, 2)}</pre>
                </div>
            ))}
        </div>
    )
}
