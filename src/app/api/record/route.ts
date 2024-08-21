import { NextRequest, NextResponse } from "next/server";

export async function GET() {


    return NextResponse.json({ "records": "to come" })
}

export async function POST(req: NextRequest) {
    console.log(await req.text())           

    console.log(await req.json())           

    

    return NextResponse.json({ "req.body": req.body })
}
