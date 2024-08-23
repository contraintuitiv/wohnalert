import { NextResponse } from "next/server"
import { fetchCd } from "../../../../lib/fetchCd"

export async function GET() {
    // find out title of watch
    const response = await fetchCd(`/watch`)
    const data = await response.json()

    return NextResponse.json(data)
}