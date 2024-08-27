import { NextRequest, NextResponse } from "next/server";
import validator from 'validator';
import { fetchCd } from "../../../../lib/fetch";
import { findLocation, osmLink, recordAsText, toNumber } from "../../../../lib/util";
import { prisma } from "../../../../lib/prisma";

export const deconstructFilterQuery = (reqUrl: string) => {
    const url = new URL(reqUrl)
    const outputFormat = url.searchParams.get("output")

    const numberFromQuery = (key: string) => {
        let queryVar;
        if (queryVar = url.searchParams.get(key)) {
            if (parseInt(queryVar)) {
                return parseInt(queryVar)
            }
        }

        return undefined
    }

    const arrayFromQuery = (key: string) => {
        let queryVar;
        if (queryVar = url.searchParams.get(key)) {
            return queryVar.split(",")
        }

        return []
    }

    const minRent = numberFromQuery("minRent") || 1
    const maxRent = numberFromQuery("maxRent") || 99999999999
    const minRooms = numberFromQuery("minRooms") || 1
    const maxRooms = numberFromQuery("maxRooms") || 99999999999
    const minSize = numberFromQuery("minSize") || 1
    const maxSize = numberFromQuery("maxSize") || 99999999999
    const boroughs = arrayFromQuery("boroughs") || []

    return ({ minRent, maxRent, minRooms, maxRooms, minSize, maxSize, boroughs, outputFormat })
}

export async function GET(req: NextRequest) {
    const { minRent, maxRent, minRooms, maxRooms, minSize, maxSize, boroughs, outputFormat } = deconstructFilterQuery(req.url)

    const records = await prisma.record.findMany({
        take: 50,
        orderBy: { createdAt: "desc" },
        where: {
            ...(boroughs.length > 0
                ? {
                    OR:
                        boroughs.map(name => ({
                            borough: name,
                        }))
                }
                : {}
            ),
            rent: {
                gte: minRent,
                lte: maxRent
            },
            size: {
                gte: minSize,
                lte: maxSize
            },
            rooms: {
                gte: minRooms,
                lte: maxRooms
            },
        }
    })


    if (outputFormat === "text") {
        let output = ""
        for (const record of records) {
            output += recordAsText(record)
        }
        return new NextResponse(output, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
    }

    return NextResponse.json([...records])
}

interface ExtractedRecord {
    title: string
    address: string
    url: string
    size: string
    rent: string
    rooms: string
    wbs: string
    properties: string[]
}

function newExtractedRecord(): ExtractedRecord {
    return ({
        title: "",
        url: "",
        address: "",
        size: "",
        rooms: "",
        rent: "",
        wbs: "",
        properties: []
    })
}

type PossibleProperties = "title" | "address" | "url" | "size" | "rent" | "rooms" | "wbs"


function parseGewobag(data: string[], extractedRecords: ExtractedRecord[]) {
    const setProperty = (key: PossibleProperties, value: string, extractedRecords: ExtractedRecord[]) => {
        extractedRecords[extractedRecords.length - 1][key] = value.trim()
    }

    // filter out urls (and with that the co)
    const urls = data
        .filter(line => line.startsWith("    https://www.gewobag.de"))
        .map(line => line.trim()
        )

    let nextLineProperty: PossibleProperties | null = null

    for (const line of data) {

        if (nextLineProperty) {
            setProperty(nextLineProperty, line, extractedRecords);
            nextLineProperty = null;
            continue;
        }

        if (line.startsWith("        Bezirk")) {
            extractedRecords.push(newExtractedRecord())
            setProperty("url", urls[extractedRecords.length - 1], extractedRecords)
            nextLineProperty = "address";
            continue;
        }

        if (line.startsWith("        Adresse")) {
            nextLineProperty = "title";
            continue;
        }
        if (line.startsWith("        Fläche")) {
            const [, value] = line.split("Fläche")
            const [rooms, size] = value.split("|")

            setProperty("size", size, extractedRecords)
            setProperty("rooms", rooms, extractedRecords)
            continue;
        }

        if (line.startsWith("        Gesamtmiete")) {
            const [, rent] = line.split("Gesamtmiete")
            setProperty("rent", rent, extractedRecords)
            continue;
        }

        if (line.startsWith("                                   *") || line.startsWith("        besondere Eigenschaften")) {
            const [, property] = line.split("*")
            extractedRecords[extractedRecords.length - 1].properties.push(property.trim())
            continue;
        }

    }

    return extractedRecords
}


function parseWbm(data: string[], extractedRecords: ExtractedRecord[]) {
    const setProperty = (key: PossibleProperties, value: string) => {
        extractedRecords[extractedRecords.length - 1][key] = value.trim()
    }

    const pushToProperties = (str: string) => {
        extractedRecords[extractedRecords.length - 1].properties.push(str.trim())
    }


    let nextLineProperty: PossibleProperties | null = null

    for (const line of data) {
        if (line.startsWith("  /")) {
            // ignore second time url
            if (extractedRecords.some(record => record.url.includes(line.trim()))) {
                continue;
            }
            extractedRecords.push(newExtractedRecord())
            setProperty("url", `https://www.wbm.de${line.trim()}`)
            nextLineProperty = "address"
            continue;
        }

        if (line.trim() === "Warmmiete") {
            nextLineProperty = "rent";
            continue;
        }

        if (line.trim() === "Größe") {
            nextLineProperty = "size";
            continue;
        }
        if (line.trim() === "Zimmer") {
            nextLineProperty = "rooms";
            continue;
        }

        if (nextLineProperty === "address") {
            extractedRecords[extractedRecords.length - 1]["address"] += line;
            continue

        }

        if (nextLineProperty === "rent" || nextLineProperty === "rooms" || nextLineProperty === "size") {
            setProperty(nextLineProperty, line)
            nextLineProperty = null;
            continue
        }

        if (line.startsWith("    *")) {
            pushToProperties(line.split("*")[1])
            continue
        }

    }

    return extractedRecords
}


function parseHowoge(data: string[], extractedRecords: ExtractedRecord[]) {
    const setProperty = (key: PossibleProperties, value: string, extractedRecords: ExtractedRecord[]) => {
        extractedRecords[extractedRecords.length - 1][key] = value.trim()
    }

    // filter out urls (and with that the co)
    const urls = data
        .filter(line => line.startsWith("  /"))
        .map(line => `https://www.howoge.de${line.trim()}`)

    data
        .filter(line =>
            !line.endsWith("Auf Karte anzeigen") &&
            !line.endsWith("Merken") &&
            !line.startsWith(" /") &&
            !line.startsWith("                  ")
        )
        .forEach(
            line => {
                if (line.startsWith("        ") && /\d{5} Berlin/.test(line)) {
                    setProperty("address", line, extractedRecords)
                    return;
                }

                if (/^        [^\s]/.test(line)) {
                    extractedRecords.push({
                        ...newExtractedRecord(),
                        "title": line.trim(),
                    })
                    setProperty("url", urls[extractedRecords.length - 1], extractedRecords)
                    return;
                }


                if (line.startsWith("                ")) {
                    if (line.includes("€")) {
                        setProperty("rent", line, extractedRecords)
                        return
                    }
                    if (line.includes("m²")) {
                        setProperty("size", line, extractedRecords)
                        return
                    }
                    setProperty("rooms", line, extractedRecords)
                    return;
                }

                if (/^              [^\s]/.test(line)) {
                    if (line.includes("WBS erforderlich")) {
                        setProperty("wbs", "true", extractedRecords);
                        return
                    }
                    extractedRecords[extractedRecords.length - 1].properties.push(line.trim())
                }

                return;
            }
        )

    return extractedRecords
}



export async function POST(req: NextRequest) {

    // via body the UUID is passed as raw text
    const uuid = await req.text()

    // validate
    if (!validator.isUUID(uuid)) return new NextResponse('invalid body, must be valid UUID in plain text', { status: 400 })

    // find out title of watch
    const responseWatch = await fetchCd(`/watch/${uuid}`)
    const dataWatch = await responseWatch.json()

    const watchTitle: string = dataWatch.title

    // find watch history to identify last watch
    const responseWatchHistory = await fetchCd(`/watch/${uuid}/history`)

    const dataWatchHistory = await responseWatchHistory.json()

    const watches = Object.keys(dataWatchHistory)
    const lastWatch = watches.pop()

    // request last watch
    const response = await fetchCd(`/watch/${uuid}/history/${lastWatch}`)

    const data = (await response.text()).split("\n")


    /* parsing part */

    let extractedRecords: ExtractedRecord[] = []


    if (watchTitle.toLowerCase().startsWith("howoge")) {
        extractedRecords = parseHowoge(data, extractedRecords)
    }
    if (watchTitle.toLowerCase().startsWith("gewobag")) {
        extractedRecords = parseGewobag(data, extractedRecords)
    }
    if (watchTitle.toLowerCase().startsWith("wbm")) {
        extractedRecords = parseWbm(data, extractedRecords)
    }

    for (const record of extractedRecords) {
        try {
            // try to find the record
            await prisma.record.findFirstOrThrow({
                where: {
                    url: record.url
                }
            })
        } catch {
            // if not, create new record 


            const location = await findLocation(record.address)

            const createdRecord = await prisma.record.create({
                data: {
                    url: record.url,
                    description: record.title,
                    landlord: watchTitle,
                    rent: toNumber(record.rent),
                    size: toNumber(record.size),
                    rooms: toNumber(record.rooms),
                    wbs: Boolean(record.wbs),
                    house_number: location?.address?.house_number || "",
                    neighbourhood: location?.address?.neighbourhood || "",
                    suburb: location?.address?.suburb || "",
                    road: location?.address?.road || "",
                    borough: location?.address?.borough || "",
                    lat: parseFloat(location?.lat),
                    long: parseFloat(location?.lon),
                    properties: JSON.stringify(record.properties)
                }
            })

            // read out which notifications want this record
            const ntfys = await prisma.ntfy.findMany({
                select: {
                    id: true,
                    host: true,
                    topic: true
                },
                where: {
                    AND: [
                        { OR: [{ minRent: null }, { minRent: { lte: createdRecord.rent } }] },
                        { OR: [{ maxRent: null }, { maxRent: { gte: createdRecord.rent } }] },
                        { OR: [{ minRooms: null }, { minRooms: { lte: createdRecord.rooms } }] },
                        { OR: [{ maxRooms: null }, { maxRooms: { gte: createdRecord.rooms } }] },
                        { OR: [{ minSize: null }, { minSize: { lte: createdRecord.size } }] },
                        { OR: [{ maxSize: null }, { maxSize: { gte: createdRecord.size } }] },
                        { OR: [{ boroughs: null }, { boroughs: { contains: createdRecord.borough } }] },
                        { OR: [{ landlords: null }, { landlords: { contains: createdRecord.landlord } }] },
                    ]
                }
            })

            // send notifications
            for (const ntfy of ntfys) {
                await fetch(`https://${ntfy.host || process.env.NTFY_HOST}/${ntfy.topic || ntfy.id}`, {
                    method: 'POST',
                    body: recordAsText(createdRecord)
                })
            }

        }

    }

    return NextResponse.json({
        records: extractedRecords,
        data: data
    })
}

