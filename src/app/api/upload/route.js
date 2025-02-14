// export async function POST(req) {
//     const expressServerURL = 'http://localhost:4000/upload' // Express server URL

//     try {
//         const res = await fetch(expressServerURL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': req.headers.get('content-type'), // Pass content-type
//                 'Content-Length': req.headers.get('content-length'), // Pass content-length
//             },
//             body: req.body, // Forward the body as-is
//             duplex: 'half', // Enable streaming
//         })

//         if (!res.ok) {
//             const errorResponse = await res.text() // Log full response body
//             console.error('Error from Express server:', errorResponse)
//             throw new Error(`Failed to upload file: ${res.statusText}`)
//         }

//         const data = await res.json()
//         return new Response(JSON.stringify(data), { status: 200 })
//     } catch (error) {
//         console.error('Error uploading file:', error)
//         return new Response(JSON.stringify({ error: error.message }), {
//             status: 500,
//         })
//     }
// }

export async function POST(req) {
    const expressServerURL = 'http://localhost:4000/upload' // Express server URL

    try {
        const res = await fetch(expressServerURL, {
            method: 'POST',
            headers: {
                'Content-Type': req.headers.get('content-type'),
                'Content-Length': req.headers.get('content-length'),
            },
            body: req.body,
            duplex: 'half', // Enable streaming
        })

        if (!res.ok) {
            // Extract error message from Express server's response
            const errorResponse = await res.json()
            throw new Error(errorResponse.error || 'Unknown error occurred')
        }

        const data = await res.json()
        return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
        console.error('Error uploading file:', error.message)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        })
    }
}
