export const runtime = 'nodejs' // Ensure node runtime for this route

export async function GET(req, res) {
    try {
        const apiKey = 'AIzaSyD5mEdGzNZYLkePJtzLCVuTEbUb_zHVPmM' // Replace with your API key
        const testUrl = 'https://www.google.com' // Replace with a valid URL

        // Make the API request
        const response = await fetch(
            `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${testUrl}&key=${apiKey}`
        )

        // Get the raw response as text
        const textResponse = await response.text()

        // Log the raw response to the terminal
        console.log('Raw API Response:', textResponse)

        // Attempt to parse it as JSON
        const jsonResponse = JSON.parse(textResponse)

        // Return the parsed response to the frontend
        return new Response(JSON.stringify(jsonResponse, null, 2), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        // Log any errors that occur
        console.error('Error in PageSpeedServer API:', error.message)

        // Return an error response
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
