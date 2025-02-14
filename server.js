const express = require('express')
const multer = require('multer')
const path = require('path')
const os = require('os')
const fs = require('fs')
const xml2js = require('xml2js')

const app = express()

// Configure Multer for file uploads
const upload = multer({
    dest: path.join(os.tmpdir(), 'uploads'), // Temporary uploads directory
})

// Endpoint to handle XML file upload
// app.post('/upload', upload.single('file'), (req, res) => {
//     if (!req.file) {
//         console.error('No file uploaded')
//         return res.status(400).json({ error: 'No file uploaded' })
//     }

//     const filePath = req.file.path

//     // Read and parse the uploaded XML file
//     fs.readFile(filePath, (err, data) => {
//         if (err) {
//             console.error('Error reading file:', err)
//             return res
//                 .status(500)
//                 .json({ error: 'Failed to read uploaded file' })
//         }

//         const parser = new xml2js.Parser()
//         parser.parseString(data, (parseErr, result) => {
//             if (parseErr) {
//                 console.error('Error parsing XML:', parseErr)
//                 return res
//                     .status(500)
//                     .json({ error: 'Failed to parse XML or extract URLs' })
//             }

//             // Extract URLs from the XML
//             try {
//                 const urls = result.urlset.url.map((entry) => entry.loc[0])
//                 console.log('Extracted URLs:', urls)

//                 // Send a single response
//                 return res.status(200).json({
//                     message: 'File uploaded and URLs extracted successfully',
//                     urls,
//                 })
//             } catch (extractionError) {
//                 console.error('Error extracting URLs:', extractionError)
//                 return res
//                     .status(500)
//                     .json({ error: 'Failed to extract URLs from XML' })
//             }
//         })
//     })
// })

// app.post('/upload', upload.single('file'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' })
//     }

//     const filePath = req.file.path

//     // Read and parse the uploaded XML file

//     fs.readFile(filePath, (err, data) => {
//         if (err) {
//             return res
//                 .status(500)
//                 .json({ error: 'Failed to read uploaded file' })
//         }

//         const parser = new xml2js.Parser()
//         parser.parseString(data, (parseErr, result) => {
//             if (parseErr) {
//                 return res.status(500).json({ error: 'Failed to parse XML' })
//             }

//             // Extract URLs from the XML

//             try {
//                 const urls = result.urlset.url.map((entry) => entry.loc[0])
//                 // Send a single response

//                 res.status(200).json({ message: 'Upload successful', urls })
//             } catch (extractionError) {
//                 res.status(500).json({ error: 'Failed to extract URLs' })
//             }
//         })
//     })
// })

// app.post('/upload', upload.single('file'), (req, res) => {
//     try {
//         // Check if file is uploaded
//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' })
//         }

//         const allowedMimeTypes = ['application/xml', 'text/xml']
//         const fileMimeType = req.file.mimetype

//         // Validate file type
//         if (!allowedMimeTypes.includes(fileMimeType)) {
//             return res
//                 .status(400)
//                 .json({
//                     error: 'Invalid file format. Please upload an XML file.',
//                 })
//         }

//         const filePath = req.file.path

//         // Read and parse the uploaded XML file
//         fs.readFile(filePath, (err, data) => {
//             if (err) {
//                 return res
//                     .status(500)
//                     .json({ error: 'Failed to read uploaded file' })
//             }

//             const parser = new xml2js.Parser()
//             parser.parseString(data, (parseErr, result) => {
//                 if (parseErr) {
//                     return res
//                         .status(400)
//                         .json({
//                             error: 'Failed to parse XML. Ensure it is a valid sitemap.',
//                         })
//                 }

//                 // Extract URLs from the XML
//                 try {
//                     const urls = result.urlset.url.map((entry) => entry.loc[0])

//                     if (!urls || urls.length === 0) {
//                         return res
//                             .status(400)
//                             .json({
//                                 error: 'No URLs found in the uploaded sitemap.',
//                             })
//                     }

//                     // Send the extracted URLs in the response
//                     res.status(200).json({
//                         message: 'Upload successful',
//                         urls,
//                     })
//                 } catch (extractionError) {
//                     res.status(500).json({
//                         error: 'Failed to extract URLs from sitemap',
//                     })
//                 }
//             })
//         })
//     } catch (error) {
//         console.error('Unexpected error:', error)
//         res.status(500).json({ error: 'Internal server error' })
//     }
// })

// app.post('/upload', upload.single('file'), (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' })
//         }

//         const allowedMimeTypes = ['application/xml', 'text/xml']
//         if (!allowedMimeTypes.includes(req.file.mimetype)) {
//             return res
//                 .status(400)
//                 .json({
//                     error: 'Invalid file format. Please upload an XML file.',
//                 })
//         }

//         const filePath = req.file.path

//         fs.readFile(filePath, (err, data) => {
//             if (err) {
//                 return res
//                     .status(500)
//                     .json({ error: 'Failed to read uploaded file' })
//             }

//             const parser = new xml2js.Parser()
//             parser.parseString(data, (parseErr, result) => {
//                 if (parseErr) {
//                     return res
//                         .status(400)
//                         .json({
//                             error: 'Failed to parse XML. Ensure it is a valid sitemap.',
//                         })
//                 }

//                 try {
//                     const urls = result.urlset.url.map((entry) => entry.loc[0])
//                     if (!urls || urls.length === 0) {
//                         return res
//                             .status(400)
//                             .json({
//                                 error: 'No URLs found in the uploaded sitemap.',
//                             })
//                     }
//                     res.status(200).json({ message: 'Upload successful', urls })
//                 } catch (extractionError) {
//                     res.status(500).json({
//                         error: 'Failed to extract URLs from sitemap',
//                     })
//                 }
//             })
//         })
//     } catch (error) {
//         console.error('Unexpected error:', error)
//         res.status(500).json({ error: 'Internal server error' })
//     }
// })

app.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' })
        }

        const allowedMimeTypes = ['application/xml', 'text/xml']
        if (!allowedMimeTypes.includes(req.file.mimetype)) {
            return res
                .status(400)
                .json({
                    error: 'Invalid file format. Please upload an XML file.',
                })
        }

        const filePath = req.file.path

        fs.readFile(filePath, (err, data) => {
            if (err) {
                return res
                    .status(500)
                    .json({ error: 'Failed to read uploaded file' })
            }

            const parser = new xml2js.Parser()
            parser.parseString(data, (parseErr, result) => {
                if (parseErr) {
                    return res
                        .status(400)
                        .json({
                            error: 'Failed to parse XML. Ensure it is a valid sitemap.',
                        })
                }

                try {
                    const urls = result.urlset?.url?.map(
                        (entry) => entry.loc[0]
                    )
                    if (!urls || urls.length === 0) {
                        return res
                            .status(400)
                            .json({
                                error: 'No URLs found in the uploaded sitemap.',
                            })
                    }
                    res.status(200).json({ message: 'Upload successful', urls })
                } catch (extractionError) {
                    res.status(500).json({
                        error: 'Unexpected error while processing the sitemap',
                    })
                }
            })
        })
    } catch (error) {
        console.error('Unexpected error:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Start the Express server
const PORT = 4000
app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`)
})
