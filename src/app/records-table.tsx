'use client';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { osmLink } from '../../lib/util';
import { Watch, Watches } from './api/watch/route';
import useSWR from 'swr';
import { fetchJson } from '../../lib/fetch';
import { useRecords } from '@/context/records-context';
import { useState } from 'react';
import RecordsMap from './records-map';
import { mockRecords } from './util/mockRecords';

export default function RecordsTable() {
    const { records } = useRecords();
    // const records = mockRecords;
    const { data: watchesObject } = useSWR('/api/watch', fetchJson<Watches>);
    const [hoveredRecordId, setHoveredRecordId] = useState<number | null>(null);

    const watches: Watch[] = [];
    if (watchesObject) {
        for (const key of Object.keys(watchesObject)) {
            watches.push(watchesObject[key]);
        }
    }

    return (
        <>
            <RecordsMap hoveredRecordId={hoveredRecordId} />
            {/* Responsive table for mobile and desktop */}
            <div className="overflow-x-auto">
                <Table className="min-w-full table-auto text-sm">
                    <TableCaption className="text-xs hidden sm:table-caption sm:text-sm">
                        Verfügbare Wohnangebote von:{' '}
                        {watches.map(
                            (watch, index) =>
                                (index !== 0 ? ', ' : '') + watch.title
                        )}
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden sm:table-cell">
                                Vermieter*in
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Titel
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Bezirk
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Warmmiete
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Größe
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Zimmer
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                                hinzugefügt
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="hidden sm:table-row-group">
                        {records?.map(record => (
                            <TableRow
                                key={record.id}
                                onMouseEnter={() => {
                                    console.log(hoveredRecordId);
                                    setHoveredRecordId(record.id);
                                }}
                                onMouseLeave={() => setHoveredRecordId(null)}
                                className="hover:bg-gray-100"
                            >
                                <TableCell className="hidden sm:table-cell">
                                    {record.landlord}
                                </TableCell>
                                <TableCell>
                                    <a
                                        className="hover:underline"
                                        href={record.url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        &#128279; {record.description}
                                    </a>
                                </TableCell>
                                <TableCell
                                    title={`${record.road} ${
                                        record.house_number
                                    } - ${record.borough}${
                                        record.suburb ? `, ` : ''
                                    }${record.suburb}${
                                        record.neighbourhood ? `, ` : ''
                                    }${record.neighbourhood}`}
                                >
                                    {record.borough ||
                                        record.suburb ||
                                        record.neighbourhood}{' '}
                                    &#128712;{' '}
                                    <a
                                        href={osmLink(record.lat, record.long)}
                                        title="zur Karte"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        &#128205;
                                    </a>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {record.rent} €
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {record.size}m²
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {record.rooms}
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {new Date(
                                        record.createdAt
                                    ).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile view (card style) */}
            <div className="block sm:hidden">
                {records?.map(record => (
                    <div
                        key={record.id}
                        className="mb-4 p-4 border rounded-lg hover:bg-gray-50 text-sm"
                        onMouseEnter={() => setHoveredRecordId(record.id)}
                        onMouseLeave={() => setHoveredRecordId(null)}
                    >
                        <h3 className="text-base">
                            <a
                                className="hover:underline"
                                href={record.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                &#128279; {record.description}
                            </a>
                        </h3>
                        <p>
                            <strong>Bezirk: </strong>
                            {record.borough ||
                                record.suburb ||
                                record.neighbourhood}
                        </p>
                        <p>
                            <strong>Vermieter*in: </strong> {record.landlord}
                        </p>
                        <p>
                            <strong>Warmmiete: </strong> {record.rent} €
                        </p>
                        <p>
                            <strong>Größe: </strong> {record.size} m²
                        </p>
                        <p>
                            <strong>Zimmer: </strong> {record.rooms}
                        </p>
                        <p>
                            <strong>Hinzugefügt: </strong>{' '}
                            {new Date(record.createdAt).toLocaleDateString()}
                        </p>
                        <a
                            href={osmLink(record.lat, record.long)}
                            className="text-blue-500 hover:underline"
                            target="_blank"
                            rel="noreferrer"
                        >
                            &#128205; Zur Karte
                        </a>
                    </div>
                ))}
                <div className="text-[10px] text-gray-500 text-center">
                    Verfügbare Wohnangebote von:{' '}
                    {watches.map(
                        (watch, index) =>
                            (index !== 0 ? ', ' : '') + watch.title
                    )}
                </div>
            </div>
        </>
    );
}
