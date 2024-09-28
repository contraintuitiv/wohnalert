export interface ExtractedRecord {
    title: string;
    address: string;
    url: string;
    size: string;
    rent: string;
    rooms: string;
    wbs: string;
    properties: string[];
}

export function newExtractedRecord(): ExtractedRecord {
    return {
        title: '',
        url: '',
        address: '',
        size: '',
        rooms: '',
        rent: '',
        wbs: '',
        properties: [],
    };
}

export type PossibleProperties =
    | 'title'
    | 'address'
    | 'url'
    | 'size'
    | 'rent'
    | 'rooms'
    | 'wbs';

export function parseGewobag(
    data: string[],
    extractedRecords: ExtractedRecord[]
) {
    const setProperty = (
        key: PossibleProperties,
        value: string,
        extractedRecords: ExtractedRecord[]
    ) => {
        extractedRecords[extractedRecords.length - 1][key] = value.trim();
    };

    // filter out urls (and with that the co)
    const urls = data
        .filter(line => line.startsWith('    https://www.gewobag.de'))
        .map(line => line.trim());

    let nextLineProperty: PossibleProperties | null = null;

    for (const line of data) {
        if (nextLineProperty) {
            setProperty(nextLineProperty, line, extractedRecords);
            nextLineProperty = null;
            continue;
        }

        if (line.startsWith('        Bezirk')) {
            extractedRecords.push(newExtractedRecord());
            setProperty(
                'url',
                urls[extractedRecords.length - 1],
                extractedRecords
            );
            nextLineProperty = 'address';
            continue;
        }

        if (line.startsWith('        Adresse')) {
            nextLineProperty = 'title';
            continue;
        }
        if (line.startsWith('        Fläche')) {
            const [, value] = line.split('Fläche');
            const [rooms, size] = value.split('|');

            setProperty('size', size, extractedRecords);
            setProperty('rooms', rooms, extractedRecords);
            continue;
        }

        if (line.startsWith('        Gesamtmiete')) {
            const [, rent] = line.split('Gesamtmiete');
            setProperty('rent', rent, extractedRecords);
            continue;
        }

        if (
            line.startsWith('                                   *') ||
            line.startsWith('        besondere Eigenschaften')
        ) {
            const [, property] = line.split('*');
            extractedRecords[extractedRecords.length - 1].properties.push(
                property.trim()
            );
            continue;
        }
    }

    return extractedRecords;
}

export function parseWbm(data: string[], extractedRecords: ExtractedRecord[]) {
    const setProperty = (key: PossibleProperties, value: string) => {
        extractedRecords[extractedRecords.length - 1][key] = value.trim();
    };

    const pushToProperties = (str: string) => {
        extractedRecords[extractedRecords.length - 1].properties.push(
            str.trim()
        );
    };

    let nextLineProperty: PossibleProperties | null = null;

    for (const line of data) {
        if (line.startsWith('  /')) {
            // ignore second time url
            if (
                extractedRecords.some(record =>
                    record.url.includes(line.trim())
                )
            ) {
                continue;
            }
            extractedRecords.push(newExtractedRecord());
            setProperty('url', `https://www.wbm.de${line.trim()}`);
            nextLineProperty = 'address';
            continue;
        }

        if (line.trim() === 'Warmmiete') {
            nextLineProperty = 'rent';
            continue;
        }

        if (line.trim() === 'Größe') {
            nextLineProperty = 'size';
            continue;
        }
        if (line.trim() === 'Zimmer') {
            nextLineProperty = 'rooms';
            continue;
        }

        if (nextLineProperty === 'address') {
            extractedRecords[extractedRecords.length - 1]['address'] += line;
            continue;
        }

        if (
            nextLineProperty === 'rent' ||
            nextLineProperty === 'rooms' ||
            nextLineProperty === 'size'
        ) {
            setProperty(nextLineProperty, line);
            nextLineProperty = null;
            continue;
        }

        if (line.startsWith('    *')) {
            pushToProperties(line.split('*')[1]);
            continue;
        }
    }

    return extractedRecords;
}

export function parseHowoge(
    data: string[],
    extractedRecords: ExtractedRecord[]
) {
    const setProperty = (
        key: PossibleProperties,
        value: string,
        extractedRecords: ExtractedRecord[]
    ) => {
        extractedRecords[extractedRecords.length - 1][key] = value.trim();
    };

    // filter out urls (and with that the co)
    const urls = data
        .filter(line => line.startsWith('  /'))
        .map(line => `https://www.howoge.de${line.trim()}`);

    data.filter(
        line =>
            !line.endsWith('Auf Karte anzeigen') &&
            !line.endsWith('Merken') &&
            !line.startsWith(' /') &&
            !line.startsWith('                  ')
    ).forEach(line => {
        if (line.startsWith('        ') && /\d{5} Berlin/.test(line)) {
            setProperty('address', line, extractedRecords);
            return;
        }

        if (/^        [^\s]/.test(line)) {
            extractedRecords.push({
                ...newExtractedRecord(),
                title: line.trim(),
            });
            setProperty(
                'url',
                urls[extractedRecords.length - 1],
                extractedRecords
            );
            return;
        }

        if (line.startsWith('                ')) {
            if (line.includes('€')) {
                setProperty('rent', line, extractedRecords);
                return;
            }
            if (line.includes('m²')) {
                setProperty('size', line, extractedRecords);
                return;
            }
            setProperty('rooms', line, extractedRecords);
            return;
        }

        if (/^              [^\s]/.test(line)) {
            if (line.includes('WBS erforderlich')) {
                setProperty('wbs', 'true', extractedRecords);
                return;
            }
            extractedRecords[extractedRecords.length - 1].properties.push(
                line.trim()
            );
        }

        return;
    });

    return extractedRecords;
}

export function parseDegewo(
    data: string[],
    extractedRecords: ExtractedRecord[]
) {
    const setProperty = (
        key: PossibleProperties,
        value: string,
        extractedRecords: ExtractedRecord[]
    ) => {
        extractedRecords[extractedRecords.length - 1][key] = value.trim();
    };

    // filter out urls (and with that the co)
    const urls = data
        .filter(line => line.startsWith('  /'))
        .map(line => `https://immosuche.degewo.de${line.trim()}`);

    data.filter(
        line => !line.endsWith('Merken') && !line.startsWith(' /')
    ).forEach(line => {
        if (
            line.startsWith('      ') &&
            !line.includes('Warmmiete') &&
            !line.includes('*')
        ) {
            if (line.includes('|')) {
                const address = line.trim().replace(' | ', ', ');
                extractedRecords.push({
                    ...newExtractedRecord(),
                    address: address,
                });
                setProperty(
                    'url',
                    urls[extractedRecords.length - 1],
                    extractedRecords
                );
                return;
            }
            setProperty('title', line, extractedRecords);
            return;
        }

        if (line.startsWith('        * ')) {
            if (line.includes('m²')) {
                const [, size] = line.split('*');
                setProperty('size', size, extractedRecords);
                return;
            }
            if (line.includes('Zimmer')) {
                const [, rooms] = line.split('*');
                setProperty('rooms', rooms, extractedRecords);
                return;
            }
            if (line.includes('mit WBS')) {
                setProperty('wbs', 'true', extractedRecords);
                return;
            } else {
                setProperty('wbs', 'false', extractedRecords);
                return;
            }
        }
        if (line.includes('Warmmiete')) {
            const [, rent] = line.split('Warmmiete:');
            setProperty('rent', rent, extractedRecords);
            return;
        }
        return;
    });
    return extractedRecords;
}

export function parseStadt_Und_Land(
    data: string[],
    extractedRecords: ExtractedRecord[]
) {
    const setProperty = (
        key: PossibleProperties,
        value: string,
        extractedRecords: ExtractedRecord[]
    ) => {
        extractedRecords[extractedRecords.length - 1][key] = value.trim();
    };

    // filter out urls (and with that the co)
    const urls = data
        .filter(line => line.startsWith('    /'))
        .map(line => `https://www.stadtundland.de${line.trim()}`);

    data.filter(line => !line.startsWith(' /')).forEach(line => {
        if (line.startsWith('        ') && !line.startsWith('          ')) {
            // Regex for integer
            if (/\d{5} Berlin/.test(line)) {
                extractedRecords.push({
                    ...newExtractedRecord(),
                    address: line,
                });
                setProperty(
                    'url',
                    urls[extractedRecords.length - 1],
                    extractedRecords
                );
                setProperty('address', line, extractedRecords);
                return;
            }
            line.split(/(?<=Zimmer)|(?<=m²)| – /).forEach(part => {
                part = part.trim(); // Trim any extra whitespace
                if (part.includes('Zimmer')) {
                    const [rooms] = part.split('Zimmer');
                    setProperty('rooms', rooms, extractedRecords);
                    return;
                }

                if (part.includes('m²')) {
                    setProperty('size', part, extractedRecords);
                    return;
                }

                if (!part.includes('Zimmer') && !part.includes('m²')) {
                    part.replace(' - ', '');
                    setProperty('title', part, extractedRecords);
                    if (
                        part.includes('kein WBS') ||
                        part.includes('ohne WBS')
                    ) {
                        setProperty('wbs', 'false', extractedRecords);
                        return;
                    }
                    if (
                        part.includes('mit WBS') ||
                        part.includes('WBS erforderlich') ||
                        part.includes('WBS erwünscht')
                    ) {
                        setProperty('wbs', 'true', extractedRecords);
                        return;
                    }
                    return;
                }
            });
        }
        if (/Gesamtmiete/.test(line)) {
            let [, rent] = line.split('Gesamtmiete');
            rent = rent.replace('.', ',');
            setProperty('rent', rent, extractedRecords);
        }

        return;
    });
    return extractedRecords;
}
