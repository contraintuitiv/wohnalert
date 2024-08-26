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


export async function GET() {
    // find out title of watch
    const response = await fetch(`${process.env.CD_API}/watch`, {
        headers: {
            "x-api-key": process.env.CD_API_KEY || ""
        }
    })
    const data = await response.json()

    console.log(data)
    return NextResponse.json(data)
}   