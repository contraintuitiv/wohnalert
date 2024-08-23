import currency from "currency.js";

export function toNumber(str: string): number {
    return currency(str, { separator: ".", decimal: "," }).value
}

type LocationData = {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    class: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
    address: {
        house_number: string;
        road: string;
        suburb: string;
        borough: string;
        neighbourhood?: string;
        city: string;
        ISO3166_2_lvl4: string;
        postcode: string;
        country: string;
        country_code: string;
    };
    boundingbox: [string, string, string, string];
};

export async function findLocation(query: string): Promise<LocationData> {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=jsonv2&addressdetails=1`)

    const locations: LocationData[] = await response.json()

    return locations[0]
}