'use client'

import { useEffect } from 'react'

export default function Error(err) {
    useEffect(() => {
        console.log(err), [err]
    })

    return (
        <div>
            <pre>{JSON.stringify(err, null, 2)}</pre>
        </div>
    )
}
