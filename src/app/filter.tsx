'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, useSettings } from '@/context/settings-context';
import { useCallback, useEffect, useState } from 'react';
import { isNumeric } from 'validator';
import { Ntfy, Prisma } from '@prisma/client';
import { filtersToQueryString } from '../../lib/util';
import { fetchJson } from '../../lib/fetch';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import TutorialModal from '@/components/ui/tutorialModal';

interface BoroughMap {
    [borough: string]: boolean;
}

export default function Filter({
    initialBoroughs,
}: {
    initialBoroughs: string[];
}) {
    const { settings, updateSettings } = useSettings();
    const { toast } = useToast();

    const [showFilter, setShowFilter] = useState(false);
    const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>(
        settings.filters.boroughs || []
    );
    const [maxRent, setMaxRent] = useState(settings.filters.maxRent);
    const [minSize, setMinSize] = useState(settings.filters.minSize);
    const [minRooms, setMinRooms] = useState(settings.filters.minRooms);
    const [ntfy, setNtfy] = useState<Ntfy>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const allBoroughsChecked =
        !settings.filters.boroughs ||
        settings.filters.boroughs.length === initialBoroughs.length ||
        settings.filters.boroughs.length === 0;

    // Handle borough checkbox click
    const handleBoroughClick = (borough: string) => {
        setSelectedBoroughs(prev => {
            if (prev.includes(borough)) {
                return prev.filter(b => b !== borough);
            } else {
                return [...prev, borough];
            }
        });
    };

    // Check if any of the parameters have changed
    const changedParameters =
        maxRent !== settings.filters.maxRent ||
        minSize !== settings.filters.minSize ||
        minRooms !== settings.filters.minRooms ||
        selectedBoroughs.sort().toString() !==
            settings.filters.boroughs?.sort().toString();

    // Apply filters when the user clicks the button
    const updateFilters = () => {
        const newSettings = { ...settings };

        // Update the boroughs in the settings
        newSettings.filters.boroughs = selectedBoroughs.length
            ? selectedBoroughs
            : undefined; // Remove boroughs if none are selected

        maxRent
            ? (newSettings.filters.maxRent = maxRent)
            : delete newSettings.filters.maxRent;
        minSize
            ? (newSettings.filters.minSize = minSize)
            : delete newSettings.filters.minSize;
        minRooms
            ? (newSettings.filters.minRooms = minRooms)
            : delete newSettings.filters.minRooms;

        updateSettings(newSettings); // Update settings globally
    };

    const loadNtfy = useCallback(async () => {
        const currentNtfy = (await fetchJson(
            `/api/ntfy?${filtersToQueryString({ ...settings.filters })}`
        )) as Ntfy;
        setNtfy(currentNtfy);
    }, [settings.filters]);

    useEffect(() => {
        loadNtfy();
    }, [settings.filters, loadNtfy]);

    const handleAddNtfyClick = async () => {
        const body: Prisma.NtfyCreateInput = {
            ...settings.filters,
            boroughs: JSON.stringify(settings.filters.boroughs),
            landlords: '[]',
        };
        await fetch('/api/ntfy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        loadNtfy();
    };

    return (
        <>
            <div className="mb-3">
                <Alert>
                    <AlertTitle>
                        Alle neuen Angebote per Push bekommen
                    </AlertTitle>
                    <AlertDescription>
                        App{' '}
                        <a
                            href="https://f-droid.org/de/packages/io.heckel.ntfy/"
                            className="underline"
                            target="_blank"
                            rel="noreferrer"
                        >
                            ntfy.sh
                        </a>{' '}
                        runterladen und dieses Topic abonnieren:{' '}
                        <b>
                            <a
                                href={`ntfy://ntfy.freizeitstress.org/wohnalert`}
                                className="hover:underline"
                                title="direkt in ntfy.sh-App öffnen"
                            >
                                <Button
                                    className="rounded-md py-2 ml-2"
                                    size={'sm'}
                                >
                                    wohnalert
                                </Button>
                            </a>
                        </b>{' '}
                        <br /> oder manuell hinzufügen:{' '}
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            variant={'outline'}
                            className="ml-2"
                            size={'sm'}
                        >
                            ?
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
            <h3
                onClick={() => setShowFilter(!showFilter)}
                className="cursor-pointer hover:underline"
            >
                {showFilter ? '▲' : '▼'} Filter{' '}
                <span className="text-gray-500 text-sm">
                    {settings.filters.boroughs?.join(', ')}
                    {maxRent && ` - max. ${maxRent}€`}
                    {minSize && ` - min. ${minSize}m²`}
                    {minRooms && minRooms > 0 && ` - min. ${minRooms} Zimmer`}
                </span>
            </h3>
            {showFilter && (
                <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 border border-black rounded-sm p-3">
                    <div>
                        Bezirke:{' '}
                        <div>
                            {initialBoroughs.map(borough => (
                                <div
                                    key={borough}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={borough}
                                        checked={selectedBoroughs.includes(
                                            borough
                                        )}
                                        onClick={() =>
                                            handleBoroughClick(borough)
                                        }
                                    />
                                    <Label htmlFor={borough}>{borough}</Label>
                                </div>
                            ))}
                            <div>
                                <Checkbox
                                    id="alle"
                                    checked={allBoroughsChecked}
                                    onClick={() => {
                                        setSelectedBoroughs(
                                            allBoroughsChecked
                                                ? []
                                                : initialBoroughs
                                        );
                                    }}
                                />
                                <Label htmlFor="alle">alle</Label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Label htmlFor="maxRent">maximale Miete</Label>
                            <Input
                                type="number"
                                placeholder="450"
                                step="50"
                                min="0"
                                value={maxRent}
                                onChange={e => {
                                    if (
                                        isNumeric(e.target.value) ||
                                        e.target.value === ''
                                    ) {
                                        setMaxRent(parseFloat(e.target.value));
                                    }
                                }}
                            />
                        </div>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Label htmlFor="minSize">minimale Größe (m²)</Label>
                            <Input
                                type="number"
                                placeholder="50"
                                value={minSize}
                                step="10"
                                min="0"
                                onChange={e => {
                                    if (
                                        isNumeric(e.target.value) ||
                                        e.target.value === ''
                                    ) {
                                        setMinSize(parseFloat(e.target.value));
                                    }
                                }}
                            />
                        </div>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Label htmlFor="minRooms">mind. Zimmer</Label>
                            <Input
                                type="number"
                                placeholder="2"
                                min="0"
                                value={minRooms}
                                onChange={e => {
                                    if (
                                        isNumeric(e.target.value) ||
                                        e.target.value === ''
                                    ) {
                                        setMinRooms(parseFloat(e.target.value));
                                    }
                                }}
                            />
                        </div>
                        {/* Show button only if parameters have changed */}
                        {changedParameters && (
                            <Button
                                type="submit"
                                onClick={() => {
                                    updateFilters();
                                }}
                            >
                                Filter anwenden
                            </Button>
                        )}
                    </div>

                    <div className="mt-1">
                        <div>
                            <Alert
                                variant="destructive"
                                className="mb-2 mt-2 md:mt-0"
                            >
                                Gefilterte Push-Notifications funktionieren noch
                                nicht (zuverlässig)
                            </Alert>
                        </div>
                        {!changedParameters &&
                            (ntfy ? (
                                <div>
                                    Push-Benachrichtigung (via {ntfy.host}):{' '}
                                    <b>
                                        <a
                                            href={`ntfy://${ntfy.host}/${ntfy.id}`}
                                            className="hover:underline"
                                            title="direkt in ntfy.sh-App öffnen"
                                        >
                                            <Button variant={'outline'}>
                                                Abonnieren
                                            </Button>
                                        </a>
                                    </b>{' '}
                                </div>
                            ) : (
                                <Button onClick={handleAddNtfyClick}>
                                    🔔 Push-Notification für diesen Filter
                                    erstellen
                                </Button>
                            ))}
                    </div>
                </div>
            )}
            <TutorialModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
