'use client'

import React, { useState } from 'react'

export default function FileUploader() {
    const [file, setFile] = useState(null)
    const [urls, setUrls] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!file) {
            alert('Please select a file.')
            return
        }

        const formData = new FormData()
        formData.append('file', file) // Key must match the expected key on the backend

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Failed to upload file.')
            }

            const data = await response.json()
            console.log('Uploaded files:', data.files)
        } catch (error) {
            console.error('Error uploading file:', error.message)
        }
    }

    return (
        <div>
            <h1>Upload Sitemap</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".xml" onChange={handleFileChange} />
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Upload'}
                </button>
            </form>
            {urls && (
                <div>
                    <h2>Extracted URLs:</h2>
                    <ul>
                        {urls.map((url, index) => (
                            <li key={index}>{url}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
