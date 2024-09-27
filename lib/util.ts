import { Filters } from "@/context/settings-context";
import { Record } from "@prisma/client";
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

export function osmLink(lat: number, long: number): string {
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

export function recordAsText(record: Record): string {
  let output = ""
  output +=
    `[${record.landlord}] ${record.wbs ? "WBS" : ""} ${record.description}
${record.url}

${record.rent}€ | ${record.rooms} Zimmer | ${record.size}m²
${record.borough}${record.suburb ? `, ` : ""}${record.suburb}${record.neighbourhood ? `, ` : ""}${record.neighbourhood}
${record.road} ${record.house_number}\n\n`

  for (const property of JSON.parse(record.properties)) output += `*${property} `

  output += `\n\nAuf der Karte: https://wohnalert.freizeitstress.org/${record.id}\n\n\n\n`

  return output
}


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

export const niceDate = (date: Date) => {
  const uglyDate = new Date(date)

  return uglyDate.toLocaleDateString() === new Date().toLocaleDateString()
    ? uglyDate.toLocaleTimeString('de-DE', { hour: "2-digit", minute: "2-digit" })
    : uglyDate.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}