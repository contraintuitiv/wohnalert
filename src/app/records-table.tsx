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
import { Watch, Watches } from './api/watch/route';
import useSWR from 'swr';
import { fetchJson } from '../../lib/fetch';
import { useRecords } from '@/context/records-context';
import { useEffect, useRef, useState } from 'react';
import RecordsMap from './records-map';
import { Record } from '@prisma/client';
import { niceDate } from '../../lib/util';

export default function RecordsTable({ recordId }: { recordId?: number }) {
    const { records } = useRecords();

    const { data: watchesObject } = useSWR('/api/watch', fetchJson<Watches>);
    const [currentRecord, setCurrentRecord] = useState<Record | null>(null);
    const [backgroundSelected, setBackgroundSelected] = useState<number | null>(
        null
    );


    const mapRef = useRef<HTMLDivElement>(null);

    const watches: Watch[] = [];
    if (watchesObject) {
        for (const key of Object.keys(watchesObject)) {
            watches.push(watchesObject[key]);
        }
    }

    useEffect(() => {
        if (recordId && records) {
            const currentRecord = records.find(record => record.id === recordId)
            if (currentRecord) setCurrentRecord(currentRecord)
        }
    }, [recordId, records])

    const handleRecordClick = (record: Record) => {
        setCurrentRecord(record);
        setBackgroundSelected(record.id);
    }

    return (
        <>
            <div
                ref={mapRef}
                className="sticky top-0 p-4 left-0 right-0 z-10 bg-white w-full overflow-hidden max-h-[50vh] mb-1"
            >
                <RecordsMap
                    currentRecord={currentRecord}
                />
            </div>
            {/* <div className='text-[8px] flex px-4 mb-1'>*Angebote sind schnell weg, darum Push-Benachrichtigungen</div> */}
            {/* Responsive table for mobile and desktop */}
            <div className="overflow-x-auto px-4">
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
                                onClick={() => handleRecordClick(record)}
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
                                    title={`${record.road} ${record.house_number
                                        } - ${record.borough}${record.suburb ? `, ` : ''
                                        }${record.suburb}${record.neighbourhood ? `, ` : ''
                                        }${record.neighbourhood}`}
                                >
                                    {record.borough ||
                                        record.suburb ||
                                        record.neighbourhood}{' '}
                                    &#128712;{' '}
                                    <a

                                        onClick={() => handleRecordClick(record)}
                                        className="text-blue-500 hover:underline cursor-pointer"
                                    >
                                        &#128205; Zur Karte
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
                                    {niceDate(record.createdAt)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile view (card style) */}
            <div className="block sm:hidden px-4">
                {records?.map(record => (
                    <div
                        key={record.id}
                        className={`mb-4 p-4 border rounded-lg hover:bg-gray-100 ${record.id === backgroundSelected ? 'bg-gray-200' : ''
                            } text-sm`}
                        onClick={() => handleRecordClick(record)}
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
                            {record.borough ||
                                record.suburb ||
                                record.neighbourhood}{' '}
                            | {record.landlord} | {record.rent} € | {record.size} m² | {record.rooms} Zimmer | {niceDate(record.createdAt)} |
                            <a
                                onClick={() => handleRecordClick(record)}
                                className="text-blue-500 hover:underline cursor-pointer"
                            >
                                &#128205; Zur Karte
                            </a>
                        </p>
                    </div>
                ))}
                <div className="text-[10px] text-gray-500 text-center mb-4">
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
