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