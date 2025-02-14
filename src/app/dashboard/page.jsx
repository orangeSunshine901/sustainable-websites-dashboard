'use client'

import { co2 } from '@tgwf/co2'
import React, { useState } from 'react'

const Dashboard = () => {
    const [bytesTransferred, setBytesTransferred] = useState('')
    const [carbonFootprint, setCarbonFootprint] = useState(null)

    const calculateCarbonFootprint = () => {
        if (!bytesTransferred || isNaN(bytesTransferred)) {
            alert('Please enter a valid number for bytes transferred.')
            return
        }

        // Initialize CO2.js and calculate emissions
        const co2e = new co2()
        const emissions = co2e.perByte(Number(bytesTransferred)) // Convert to a number
        setCarbonFootprint(emissions)
    }

    // const calculateTotalBytes = () => {
    //     let totalBytes = 0
    //     const resources = performance.getEntriesByType('resource')

    //     resources.forEach((resource) => {
    //         totalBytes += resource.transferSize // transferSize includes the size of the resource transferred
    //     })

    //     console.log(`Total Bytes Transferred: ${totalBytes} bytes`)
    // }

    return (
        <div className="carbon-calculator">
            <h1>Website Carbon Footprint Calculator</h1>
            <p>Enter the total bytes transferred for the page:</p>
            <input
                type="text"
                placeholder="Enter bytes transferred"
                value={bytesTransferred}
                onChange={(e) => setBytesTransferred(e.target.value)}
                className="bytes-input"
            />
            <button onClick={calculateCarbonFootprint}>
                Calculate Carbon Footprint
            </button>

            {carbonFootprint !== null && (
                <div className="result">
                    <h2>Carbon Footprint</h2>
                    <p>{carbonFootprint.toFixed(2)} grams of CO₂</p>
                </div>
            )}
        </div>
    )
}

export default Dashboard
