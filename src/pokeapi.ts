// typescript
import { Cache } from "./pokecache.js";
export class PokeAPI {
 
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor(private cache: Cache) {

  }


    async fetchNameData(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const cached = this.cache.get<Location>(url);
        if (cached) {
           return cached;
        } else {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`request failed: ${response.status}`);
        const data = await response.json();
        this.cache.add(url, data);
        return data;
        }
}
  


    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
        const cached = this.cache.get<ShallowLocations>(url);
        if (cached) {
           return cached;
        } else {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`request failed: ${response.status}`);
        const data = await response.json();
        this.cache.add(url, data);
        return data;
        }
}
  
async fetchLocation(locationName: string): Promise<Location> {
  const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

  const cached = this.cache.get<Location>(url);
  if (cached) return cached;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`request failed: ${response.status}`);
  }

  const data: Location = await response.json();
  this.cache.add(url, data);
  return data;
}
}

export type ShallowLocations = {
  results: {name: string; url: string}[];
  next: string | null;
  previous: string | null;
};

export type Location = {
    name: string;
    pokemon_encounters: pokemonEncounter[];
};

export type pokemonEncounter = {
  pokemon: {name: string, url: string};
  version_details: object[];
}