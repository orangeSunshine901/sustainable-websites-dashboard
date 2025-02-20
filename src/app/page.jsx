'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import styles from './page.module.css'

function FileIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
    )
}

export default function Home() {
    const [bytes, setBytes] = useState('')
    const [carbonData, setCarbonData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchCarbonData = async () => {
        if (!bytes) {
            setError('Please enter a the Total bytes of the loaded page')
            return
        }

        setLoading(true)
        setError('')

        try {
            const response = await fetch(
                `https://api.websitecarbon.com/data?bytes=${bytes}`
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
        <div className="w-screen h-screen flex flex-col flex-center items-center justify-center">
            <div
                className={`w-full max-w-sm items-center hero-text ${styles.heroText}`}
            >
                <h1 className="text-3xl font-bold w-full">
                    Page Speed Insights Checker
                </h1>
            </div>
            <Card>
                <CardContent className="p-6 space-y-4">
                    <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
                        <FileIcon className="w-12 h-12" />
                        <span className="text-sm font-medium text-gray-500">
                            Drag and drop a file or click to browse
                        </span>
                        <span className="text-xs text-gray-500">.xml</span>
                    </div>
                    <div className="space-y-2 text-sm">
                        <Label htmlFor="file" className="text-sm font-medium">
                            File
                        </Label>
                        <Input
                            id="file"
                            type="file"
                            placeholder="File"
                            accept="image/*"
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button size="lg">Upload</Button>
                </CardFooter>
            </Card>
            {/* <input
                type="text"
                placeholder="Enter website URL"
                value={bytes}
                onChange={(e) => setBytes(e.target.value)}
                className="bytes-input"
            />
            <Label htmlFor="picture">Upload your website sitemap</Label>
            <Input id="xml-file" type="file" />
            <Button>Click ME!!!</Button> */}

            {error && <p className="error-message">{error}</p>}

            {carbonData && (
                <div className="result">
                    <h2>Results for {bytes}</h2>
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
