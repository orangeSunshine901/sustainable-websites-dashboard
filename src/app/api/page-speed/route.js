export const runtime = 'nodejs' // Ensure node runtime for this route

// export const GET = async () => {
//     try {
//         // Fetch URLs from the Express server
//         const expressResponse = await fetch('http://localhost:4000/upload')
//         const { urls } = await expressResponse.json()

//         if (!urls || urls.length === 0) {
//             return new Response(
//                 JSON.stringify({ error: 'No URLs to process' }),
//                 { status: 400, headers: { 'Content-Type': 'application/json' } }
//             )
//         }

//         // Fetch PageSpeed insights for each URL
//         const pageSpeedResults = await Promise.all(
//             urls.map(async (url) => {
//                 const pageSpeedRes = await fetch(
//                     `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}`
//                 )
//                 const pageSpeedData = await pageSpeedRes.json()
//                 return { url, pageSpeedData }
//             })
//         )

//         return new Response(
//             JSON.stringify({
//                 message: 'PageSpeed data fetched',
//                 pageSpeedResults,
//             }),
//             { status: 200, headers: { 'Content-Type': 'application/json' } }
//         )
//     } catch (error) {
//         console.error('Error in PageSpeedServer API:', error)
//         return new Response(
//             JSON.stringify({ error: 'Failed to fetch PageSpeed data' }),
//             { status: 500, headers: { 'Content-Type': 'application/json' } }
//         )
//     }
// }

// export const GET = async () => {
//     try {
//         // Fetch URLs from the Express server
//         const expressResponse = await fetch('http://localhost:4000/upload')
//         const { urls } = await expressResponse.json()

//         if (!urls || urls.length === 0) {
//             return new Response(
//                 JSON.stringify({ error: 'No URLs to process' }),
//                 { status: 400, headers: { 'Content-Type': 'application/json' } }
//             )
//         }

//         // const apiKey = 'AIzaSyD5mEdGzNZYLkePJtzLCVuTEbUb_zHVPmM' // Replace with your Google API key
//         const pageSpeedResults = []

//         const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

//         for (const url of urls) {
//             const encodedUrl = encodeURIComponent(url)
//             await delay(1000)
//             const pageSpeedRes = await fetch(
//                 `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodedUrl}&key=AIzaSyD5mEdGzNZYLkePJtzLCVuTEbUb_zHVPmM`
//             )

//             const textResponse = await pageSpeedRes.text()
//             console.log(`Response for ${url}:`, textResponse)

//             if (!pageSpeedRes.ok) {
//                 console.error(
//                     `Failed to fetch PageSpeed for ${url}:`,
//                     textResponse
//                 )
//                 pageSpeedResults.push({
//                     url,
//                     error: `Failed with status ${pageSpeedRes.status}`,
//                     response: textResponse,
//                 })
//                 continue
//             }

//             try {
//                 const pageSpeedData = JSON.parse(textResponse)
//                 pageSpeedResults.push({ url, pageSpeedData })
//             } catch (jsonError) {
//                 console.error(
//                     `Error parsing JSON for ${url}:`,
//                     textResponse,
//                     jsonError
//                 )
//                 pageSpeedResults.push({ url, error: 'Invalid JSON response' })
//             }
//         }

//         return new Response(
//             JSON.stringify({
//                 message: 'PageSpeed data fetched',
//                 pageSpeedResults,
//             }),
//             { status: 200, headers: { 'Content-Type': 'application/json' } }
//         )
//     } catch (error) {
//         console.error('Error in PageSpeedServer API:', error)
//         return new Response(
//             JSON.stringify({ error: 'Failed to fetch PageSpeed data' }),
//             { status: 500, headers: { 'Content-Type': 'application/json' } }
//         )
//     }
// }

// export const GET = async () => {
//     try {
//         const expressResponse = await fetch('http://localhost:4000/upload')
//         const { urls } = await expressResponse.json()

//         if (!urls || urls.length === 0) {
//             return new Response(
//                 JSON.stringify({ error: 'No URLs to process' }),
//                 { status: 400, headers: { 'Content-Type': 'application/json' } }
//             )
//         }

//         const apiKey = 'YOUR_API_KEY' // Replace with your API key
//         const pageSpeedResults = []

//         for (const url of urls) {
//             try {
//                 const pageSpeedRes = await fetch(
//                     `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
//                         url
//                     )}&key=${apiKey}`
//                 )

//                 const textResponse = await pageSpeedRes.text()
//                 console.log(`Response for ${url}:`, textResponse)

//                 if (!pageSpeedRes.ok) {
//                     console.error(`Error for ${url}:`, textResponse)
//                     pageSpeedResults.push({
//                         url,
//                         error: `Failed with status ${pageSpeedRes.status}`,
//                         response: textResponse,
//                     })
//                     continue
//                 }

//                 const pageSpeedData = JSON.parse(textResponse)
//                 pageSpeedResults.push({ url, pageSpeedData })
//             } catch (error) {
//                 console.error(`Unexpected error for ${url}:`, error)
//                 pageSpeedResults.push({
//                     url,
//                     error: 'Unexpected error occurred',
//                 })
//             }
//         }

//         return new Response(
//             JSON.stringify({
//                 message: 'PageSpeed data fetched',
//                 pageSpeedResults,
//             }),
//             { status: 200, headers: { 'Content-Type': 'application/json' } }
//         )
//     } catch (error) {
//         console.error('Error in PageSpeedServer API:', error)
//         return new Response(
//             JSON.stringify({ error: 'Failed to fetch PageSpeed data' }),
//             { status: 500, headers: { 'Content-Type': 'application/json' } }
//         )
//     }
// }

// export async function GET(req, res) {
//     try {
//         const apiKey = 'AIzaSyD5mEdGzNZYLkePJtzLCVuTEbUb_zHVPmM' // Replace with your API key
//         const testUrl = 'https://www.google.com' // Replace with an actual URL

//         const response = await fetch(
//             `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${testUrl}&key=${apiKey}`
//         )

//         const textResponse = await response.text() // Fetch the raw response as text
//         console.log('Raw API Response:', textResponse) // Log the full response for debugging

//         const jsonResponse = JSON.parse(textResponse) // Parse the JSON response

//         return new Response(JSON.stringify(jsonResponse, null, 2), {
//             status: 200,
//             headers: { 'Content-Type': 'application/json' },
//         })
//     } catch (error) {
//         console.error('Error in PageSpeedServer API:', error.message)

//         return new Response(JSON.stringify({ error: error.message }), {
//             status: 500,
//             headers: { 'Content-Type': 'application/json' },
//         })
//     }
// }
// export async function GET(req) {
//     try {
//         const apiKey = 'AIzaSyD5mEdGzNZYLkePJtzLCVuTEbUb_zHVPmM' // Replace with your API key
//         const url = req.nextUrl.searchParams.get('url') // Extract URL from query params

//         if (!url) {
//             return new Response(
//                 JSON.stringify({ error: 'URL parameter is required' }),
//                 {
//                     status: 400,
//                     headers: { 'Content-Type': 'application/json' },
//                 }
//             )
//         }

//         const response = await fetch(
//             `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
//                 url
//             )}&key=${apiKey}`
//         )

//         if (!response.ok) {
//             return new Response(
//                 JSON.stringify({ error: 'Failed to fetch PageSpeed data' }),
//                 {
//                     status: response.status,
//                     headers: { 'Content-Type': 'application/json' },
//                 }
//             )
//         }

//         const pageSpeedData = await response.json()

//         return new Response(JSON.stringify(pageSpeedData, null, 2), {
//             status: 200,
//             headers: { 'Content-Type': 'application/json' },
//         })
//     } catch (error) {
//         console.error('Error in PageSpeedServer API:', error.message)
//         return new Response(
//             JSON.stringify({ error: 'Internal server error' }),
//             {
//                 status: 500,
//                 headers: { 'Content-Type': 'application/json' },
//             }
//         )
//     }
// }

// export async function POST(req) {
//     const { urls } = await req.json()

//     if (!urls || !Array.isArray(urls)) {
//         return new Response(JSON.stringify({ error: 'Invalid URLs input' }), {
//             status: 400,
//         })
//     }

//     const apiKey = 'AIzaSyD5mEdGzNZYLkePJtzLCVuTEbUb_zHVPmM'
//     if (!apiKey) {
//         return new Response(JSON.stringify({ error: 'API key missing' }), {
//             status: 500,
//         })
//     }

//     try {
//         const results = await Promise.all(
//             urls.map(async (url) => {
//                 const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
//                     url
//                 )}&key=${apiKey}`
//                 const response = await fetch(apiUrl)
//                 if (!response.ok) {
//                     throw new Error(`Failed to fetch PageSpeed data for ${url}`)
//                 }
//                 const data = await response.json()
//                 return { url, data }
//             })
//         )

//         return new Response(JSON.stringify({ results }), {
//             status: 200,
//             headers: { 'Content-Type': 'application/json' },
//         })
//     } catch (error) {
//         console.error('Error fetching PageSpeed data:', error)
//         return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
//             status: 500,
//         })
//     }
// }

export async function POST(req) {
    const apiKey = 'AIzaSyD5mEdGzNZYLkePJtzLCVuTEbUb_zHVPmM' // Ensure this is defined in your .env file
    const pagespeedApiUrl =
        'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'

    try {
        const { urls } = await req.json() // Get URLs from request body
        if (!urls || !Array.isArray(urls)) {
            return new Response(JSON.stringify({ error: 'Invalid URLs' }), {
                status: 400,
            })
        }

        const results = await Promise.all(
            urls.map(async (url) => {
                const response = await fetch(
                    `${pagespeedApiUrl}?url=${encodeURIComponent(
                        url
                    )}&key=${apiKey}`
                )
                if (!response.ok) {
                    console.error(
                        `Failed for URL: ${url}, Status: ${response.status}`
                    )
                    return {
                        url,
                        error: `Failed with status ${response.status}`,
                    }
                }
                const data = await response.json()
                return { url, id: data.id || null }
            })
        )

        return new Response(
            JSON.stringify({ message: 'PageSpeed data fetched', results }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        )
    } catch (error) {
        console.error('Error in PageSpeed API route:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        })
    }
}
