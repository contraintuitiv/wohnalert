"use client"

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { osmLink } from "../../lib/util";
import { Watch, Watches } from "./api/watch/route";
import useSWR from "swr";
import { fetchJson } from "../../lib/fetch";
import { useRecords } from "@/context/records-context";

export default function RecordsTable() {
    const { records } = useRecords()
    const { data: watchesObject } = useSWR('/api/watch', fetchJson<Watches>)


    const watches: Watch[] = []
    if (watchesObject) {
        for (const key of Object.keys(watchesObject)) {
            watches.push(watchesObject[key])
        }
    }

    return (<Table>
        <TableCaption>
            Verfügbare Wohnangebote von: {watches.map((watch, index) => (index !== 0 ? ", " : "") + watch.title)}
        </TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Vermieter*in</TableHead>
                <TableHead>Titel</TableHead>
                <TableHead>Bezirk</TableHead>
                <TableHead>Warmmiete</TableHead>
                <TableHead>Größe</TableHead>
                <TableHead>Zimmer</TableHead>
                <TableHead>hinzugefügt</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>

            {records?.map(record => <TableRow key={record.id}>
                <TableCell>{record.landlord}</TableCell>
                <TableCell>
                    <a className="hover:underline" href={record.url} target='_blank' rel="noreferrer">
                        &#128279; {record.description}</a>
                </TableCell>
                <TableCell title={`${record.road} ${record.house_number} - ${record.borough}${record.suburb ? `, ` : ""}${record.suburb}${record.neighbourhood ? `, ` : ""}${record.neighbourhood}`}>
                    {record.borough || record.suburb || record.neighbourhood} &#128712; <a href={osmLink(record.lat, record.long)} title="zur Karte" target="_blank" rel="noreferrer">&#128205;</a>
                </TableCell>
                <TableCell>{record.rent} €</TableCell>
                <TableCell>{record.size}m²</TableCell>
                <TableCell>{record.rooms}</TableCell>
                <TableCell>{new Date(record.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>)}

        </TableBody>
    </Table>)
}