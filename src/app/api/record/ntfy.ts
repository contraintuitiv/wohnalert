import { prisma } from "../../../../lib/prisma";
import { Record } from "../../../../prisma/generated/zod";
import {
    recordAsText
} from '../../../../lib/util';
import { captureMessage } from "@sentry/nextjs";

export async function sendNtfys(record: Record) {
    console.log(`now ${record.id} `)

    // read out which notifications want this record
    const ntfys = await prisma.ntfy.findMany({
        select: {
            id: true,
            host: true,
            topic: true,
        },
        where: {
            AND: [
                { maxRent: { gte: record.rent } },
                { minRooms: { lte: record.rooms } },
                { minSize: { lte: record.size } },
                { boroughs: { contains: record.borough } }
            ]

        },
    });

    const theRecordAsText = recordAsText(record);

    // send notifications
    for (const ntfy of ntfys) {

        const data = await fetch(
            `https://${ntfy.host || process.env.NTFY_HOST}/${ntfy.topic || ntfy.id
            }`,
            {
                method: 'POST',
                body: theRecordAsText,
            }
        );
    }
}