import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    console.log(req.body)           


    return NextResponse.json({ "req.body": req.body })
}
