import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(){
    console.log("bla")
    const data = await prisma.record.findMany({
        distinct: ['borough'],
        select: {
            borough: true,
        },
    });


    const boroughs: string[] = data.map(str => str.borough);


    return NextResponse.json(boroughs)
}