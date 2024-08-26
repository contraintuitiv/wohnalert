import { NextResponse } from "next/server"

export interface Watch {
    last_changed: number;
    last_checked: number;
    last_error: boolean | string;
    title: string;
    url: string;
    viewed: boolean;
}

export type Watches = Record<string, Watch>;

async function fetchCd(endpoint: string, init?: RequestInit): Promise<Response> {
    return await fetch(`${process.env.CD_API}${endpoint}`, {
        ...init,
        headers: {
            ...init?.headers,
            "x-api-key": process.env.CD_API_KEY || ""
        }
    })
}


export async function GET() {
    // find out title of watch
    const response = await fetchCd(`/watch`)
    const data = await response.json()

    console.log(data)
    return NextResponse.json(data)
}   