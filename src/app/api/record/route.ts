import { NextRequest, NextResponse } from "next/server";

export async function GET() {


    return NextResponse.json({ "records": "to come" })
}

export async function POST(req: NextRequest) {
    const recordBody = await req.text()      

    

    return NextResponse.json({ "req.body": recordBody})
}
