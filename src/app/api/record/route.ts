import { NextRequest, NextResponse } from "next/server";

export async function GET() {


    return NextResponse.json({ "records": "to come" })
}

export async function POST(req: NextRequest) {
    const recordBody = (await req.text()).split("\n")
    const url = recordBody[0]
    const body = recordBody.slice(1)
    
    console.log("url",  url)
    console.log("body",  body.join("\n"))
    

    return NextResponse.json({ "req.body": recordBody})
}
