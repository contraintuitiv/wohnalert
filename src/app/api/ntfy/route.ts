
import { NextRequest, NextResponse } from "next/server";
import { Ntfy, NtfyCreateInputSchema } from "../../../../prisma/generated/zod";
import { ZodError } from "zod";
import { prisma } from "../../../../lib/prisma";
import { deconstructFilterQuery } from "../../../../lib/util";

export async function GET(req: NextRequest) {
    const { minRent, maxRent, minRooms, maxRooms, minSize, maxSize, boroughs } = deconstructFilterQuery(req.url)

    try {
        const existingNtfy = await prisma.ntfy.findFirst({
            select: {
                id: true,
                host: true,
                topic: true
            },
            where: {
                minRent,
                maxRent,
                minRooms,
                maxRooms,
                minSize,
                maxSize,
                boroughs: JSON.stringify(boroughs)
            }
        })

        return NextResponse.json(existingNtfy)
    } catch {
        return new NextResponse("Bad Request", { status: 403 })
    }


}

export async function POST(req: NextRequest): Promise<NextResponse> {
    const body = await req.json() as Partial<Ntfy>

    try {
        // validate
        const data = NtfyCreateInputSchema.parse(body)

        const createdNtfy = await prisma.ntfy.create({
            data: data
        })

        return NextResponse.json(createdNtfy)

    } catch (err) {
        if (err instanceof ZodError) {
            return NextResponse.json({ error: err.errors }, { status: 400 })
        }

        return NextResponse.json({ error: "db or unkonw error" }, { status: 400 })

    }

}