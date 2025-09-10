// typescript
import { Cache } from "./pokecache.js";
export class PokeAPI {
 
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor(private cache: Cache) {

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
        const response = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`);
            if (!response.ok) {
            throw new Error(`request failed: ${response.status}`);
            }
            const data = await response.json();
            return data;
}}

export type ShallowLocations = {
  results: {name: string; url: string}[];
  next: string | null;
  previous: string | null;
};

export type Location = {
    name: string;
};