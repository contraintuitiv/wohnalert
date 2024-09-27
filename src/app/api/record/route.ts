import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';
import { fetchCd } from '../../../../lib/fetch';
import {
    deconstructFilterQuery,
    findLocation,
    recordAsText,
    toNumber,
} from '../../../../lib/util';
import { prisma } from '../../../../lib/prisma';
import * as Sentry from '@sentry/nextjs';
import {
    ExtractedRecord,
    parseDegewo,
    parseGewobag,
    parseHowoge,
    parseStadt_Und_Land,
    parseWbm,
} from './parser';
export async function GET(req: NextRequest) {
    const {
        minRent,
        maxRent,
        minRooms,
        maxRooms,
        minSize,
        maxSize,
        boroughs,
        outputFormat,
    } = deconstructFilterQuery(req.url);

    const records = await prisma.record.findMany({
        take: 50,
        orderBy: { createdAt: 'desc' },
        where: {
            ...(boroughs.length > 0
                ? {
                      OR: boroughs.map(name => ({
                          borough: name,
                      })),
                  }
                : {}),
            rent: {
                gte: minRent,
                lte: maxRent,
            },
            size: {
                gte: minSize,
                lte: maxSize,
            },
            rooms: {
                gte: minRooms,
                lte: maxRooms,
            },
        },
    });

    if (outputFormat === 'text') {
        let output = '';
        for (const record of records) {
            output += recordAsText(record);
        }
        return new NextResponse(output, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
    }

    return NextResponse.json([...records]);
}

const x = parseHowoge;
//records from changedetection are passed in to prisma

export async function POST(req: NextRequest) {
    // via body the UUID is passed as raw text
    const uuid = await req.text();

    // validate
    if (!validator.isUUID(uuid))
        return new NextResponse(
            'invalid body, must be valid UUID in plain text',
            {
                status: 400,
            }
        );

    // find out title of watch
    const responseWatch = await fetchCd(`/watch/${uuid}`);
    const dataWatch = await responseWatch.json();

    const watchTitle: string = dataWatch.title;

    // find watch history to identify last watch
    const responseWatchHistory = await fetchCd(`/watch/${uuid}/history`);

    const dataWatchHistory = await responseWatchHistory.json();

    const watches = Object.keys(dataWatchHistory);
    const lastWatch = watches.pop();

    // request last watch
    const response = await fetchCd(`/watch/${uuid}/history/${lastWatch}`);

    const data = (await response.text()).split('\n');

    /* parsing part */

    let extractedRecords: ExtractedRecord[] = [];

    if (watchTitle.toLowerCase().startsWith('howoge')) {
        extractedRecords = parseHowoge(data, extractedRecords);
    }
    if (watchTitle.toLowerCase().startsWith('gewobag')) {
        extractedRecords = parseGewobag(data, extractedRecords);
    }
    if (watchTitle.toLowerCase().startsWith('wbm')) {
        extractedRecords = parseWbm(data, extractedRecords);
    }
    if (watchTitle.toLowerCase().startsWith('degewo')) {
        extractedRecords = parseDegewo(data, extractedRecords);
    }
    if (watchTitle.toLowerCase().startsWith('stadt_und_land')) {
        extractedRecords = parseStadt_Und_Land(data, extractedRecords);
    }

    for (const record of extractedRecords) {
        try {
            // try to find the record
            await prisma.record.findFirstOrThrow({
                where: {
                    url: record.url,
                },
            });
        } catch {
            // if not, create new record

            const location = await findLocation(record.address);

            const createdRecord = await prisma.record.create({
                data: {
                    url: record.url,
                    description: record.title,
                    landlord: watchTitle,
                    rent: toNumber(record.rent),
                    size: toNumber(record.size),
                    rooms: toNumber(record.rooms),
                    wbs: Boolean(record.wbs),
                    house_number: location?.address?.house_number || '',
                    neighbourhood: location?.address?.neighbourhood || '',
                    suburb: location?.address?.suburb || '',
                    road: location?.address?.road || '',
                    borough: location?.address?.borough || '',
                    lat: parseFloat(location?.lat),
                    long: parseFloat(location?.lon),
                    properties: JSON.stringify(record.properties),
                },
            });

            // read out which notifications want this record
            const ntfys = await prisma.ntfy.findMany({
                select: {
                    id: true,
                    host: true,
                    topic: true,
                },
                where: {
                    AND: [
                        {
                            OR: [
                                { minRent: null },
                                { minRent: { lte: createdRecord.rent } },
                            ],
                        },
                        {
                            OR: [
                                { maxRent: null },
                                { maxRent: { gte: createdRecord.rent } },
                            ],
                        },
                        {
                            OR: [
                                { minRooms: null },
                                { minRooms: { lte: createdRecord.rooms } },
                            ],
                        },
                        {
                            OR: [
                                { maxRooms: null },
                                { maxRooms: { gte: createdRecord.rooms } },
                            ],
                        },
                        {
                            OR: [
                                { minSize: null },
                                { minSize: { lte: createdRecord.size } },
                            ],
                        },
                        {
                            OR: [
                                { maxSize: null },
                                { maxSize: { gte: createdRecord.size } },
                            ],
                        },
                        {
                            OR: [
                                { boroughs: null },
                                {
                                    boroughs: {
                                        contains: createdRecord.borough,
                                    },
                                },
                            ],
                        },
                        {
                            OR: [
                                { landlords: null },
                                {
                                    landlords: {
                                        contains: createdRecord.landlord,
                                    },
                                },
                            ],
                        },
                    ],
                },
            });
            const createdRecordAsText = recordAsText(createdRecord);

            Sentry.captureMessage(
                `loaded following ntfys ${JSON.stringify(
                    ntfys
                )}, the createdRecord was ${createdRecordAsText}`
            );

            // send notifications
            for (const ntfy of ntfys) {
                await fetch(
                    `https://${ntfy.host || process.env.NTFY_HOST}/${
                        ntfy.topic || ntfy.id
                    }`,
                    {
                        method: 'POST',
                        body: createdRecordAsText,
                    }
                );
                Sentry.captureMessage(
                    `Sent ${createdRecord.id}/${
                        createdRecord.description
                    } to https://${ntfy.host || process.env.NTFY_HOST}/${
                        ntfy.topic || ntfy.id
                    }`
                );
            }
        }
    }

    return NextResponse.json({
        records: extractedRecords,
        data: data,
    });
}
