/** wrapper for fetch with changedection preconfigured */


export function fetchCd(endpoint: string, init?: RequestInit): Promise<Response> {
    return fetch(`${process.env.CD_API}${endpoint}`, {
        ...init,
        headers: {
            ...init?.headers,
            "x-api-key": process.env.CD_API_KEY || ""
        }
    })
}

export async function fetchJson<T>(endpoint: string): Promise<T> {
    try {
        const response = await fetch(endpoint)

        if (response.ok) {
            const data = await response.json()
            return data
        }

    } catch (err) {
        console.error(`error fetching data ${err}`)
    }


    console.error(`error fetching data`)

    return [] as T
}