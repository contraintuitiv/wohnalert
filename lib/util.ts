import { Filters } from "@/context/settings-context";
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

export function osmLink(lat: number, long:number): string {
    return `https://osm.org/?mlat=${lat}&mlon=${long}#map=16/${lat}/${long}`
}

export function filtersToQueryString(filters: Filters) {
    const params = new URLSearchParams();
  
    // Convert each filter to query string format
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          // Join array values with commas and append to params
          params.append(key, value.join(','));
        } else {
          // Append single value to params
          params.append(key, value);
        }
      }
    }
  
    return params.toString();
  }
