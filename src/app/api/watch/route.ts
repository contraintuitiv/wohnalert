import { NextResponse } from "next/server"
import { fetchCd } from "../../../../lib/fetch"

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
    const response = await fetchCd(`/watch`)
    const data = await response.json()

    return NextResponse.json(data)
}