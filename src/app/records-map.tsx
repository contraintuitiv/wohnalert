'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Record } from '@prisma/client';
import { useRecords } from '@/context/records-context';
import { mockRecords } from './util/mockRecords';

const createCustomIcon = (isHovered: boolean) => {
    const size = isHovered ? 45 : 38;
    const customMarkerSVG = `
<svg width="30px" height="30px" viewBox="-4 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>map-marker</title>
    <desc></desc>
    <defs>

</defs>
    <g id="Vivid.JS" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Vivid-Icons" transform="translate(-125.000000, -643.000000)">
            <g id="Icons" transform="translate(37.000000, 169.000000)">
                <g id="map-marker" transform="translate(78.000000, 468.000000)">
                    <g transform="translate(10.000000, 6.000000)">
                        <path d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z" id="Shape" fill="#FF6E6E">

</path>
                        <circle id="Oval" fill="#0C0058" fill-rule="nonzero" cx="14" cy="14" r="7">

</circle>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>
`;
    return new L.DivIcon({
        html: customMarkerSVG,
        className: 'text-blue-500', // Optional: Clear any default styles
        iconSize: [size, size], // Same as the SVG size
        iconAnchor: [size / 2, size], // Bottom center of the icon
        popupAnchor: [0, -size], // Popup should open just above the icon
    });
};

export default function RecordsMap({
    hoveredRecordId,
}: {
    hoveredRecordId: number | null;
}) {
    const { records } = useRecords();
    // const records = mockRecords;

    return (
        <MapContainer
            center={[52.51, 13.3992]}
            zoom={11}
            scrollWheelZoom={false}
            className="w-full h-[400px] sm:h-[500px] md:h-[600px] z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {records &&
                records.map(record => (
                    <Marker
                        position={[record.lat, record.long]}
                        icon={createCustomIcon(record.id === hoveredRecordId)}
                        key={record.id}
                    >
                        <Popup>
                            <a
                                href={record.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <b>
                                    [{record.landlord}] {record.description}
                                </b>{' '}
                                <i>{record.wbs ? 'WBS' : ''}</i>
                            </a>
                            <br />
                            <br />
                            {record.rent}€ | {record.rooms} Zimmer |{' '}
                            {record.size}m²
                            <br />
                            {record.road} {record.house_number}
                            <br />
                            <br />
                            {JSON.parse(record.properties).join(', ')}
                        </Popup>
                    </Marker>
                ))}
        </MapContainer>
    );
}
