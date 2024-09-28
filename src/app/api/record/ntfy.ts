import { prisma } from "../../../../lib/prisma";
import { Record } from "../../../../prisma/generated/zod";
import {
    recordAsText
} from '../../../../lib/util';

export const sendToNtfy = async (topic: string, body: string, host = process.env.NTFY_HOST) => {
    await fetch(
        `https://${host}/${topic}`,
        {
            method: 'POST',
            body: body,
        }
    );
}

export async function sendNtfys(record: Record) {

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

        sendToNtfy(ntfy.topic || ntfy.id, theRecordAsText, ntfy.host)


    }
}