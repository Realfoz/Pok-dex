// typescript
import { stat } from "fs";
import { Cache } from "./pokecache.js";
import { cleanInput } from "./repl.js";
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

async fetchPokemon(name: string): Promise<Pokemon> {
  const key = keyNormalizer(name)
  const url = `${PokeAPI.baseURL}/pokemon/${key}`;

  const cached = this.cache.get<Pokemon>(url);
  if (cached) return cached;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`request failed: ${res.status}`);

  const raw = await res.json()  as {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: { base_stat: number; stat: { name: string } }[];
  types: { type: { name: string } }[];
}
  const pokemon: Pokemon = {
    id: raw.id,
    name: cleanPokemonName(raw.name),
    baseExperience: raw.base_experience,
    height: raw.height, 
    weight: raw.weight,
    stats: raw.stats.map((stat): PokemonStat => ({
      name: cleanPokemonName(stat.stat.name),
      value: stat.base_stat
    })),
    types: raw.types.map((t): PokemonType => ({
      name: cleanPokemonName(t.type.name)
    }))
  }
  
  this.cache.add(url, pokemon);
  return pokemon;
}
}

function cleanPokemonName(name:string): string {
  const cleanArray = cleanInput(name);
  if (cleanArray.length === 1) {
    return cleanArray[0];
  } else if ((cleanArray.length > 1)) {
    return cleanArray.join(" ")
  } else {
    return "Unknown Pokemon"
  }
}

function keyNormalizer(name:string): string {
 const trim = name.trim().toLowerCase()
 const parts = trim.split(/\s+/)
 const key = parts.join("-")
 if (!key) {
  return trim;
 } else {
 return key;
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

export type Pokemon = {
  name: string;
  id: number;
  baseExperience: number;
  height: number;
  weight: number;
  stats: PokemonStat[];
  types: PokemonType[];
}
export type PokemonStat = {
  name: string;        // e.g., "hp"
  value: number;       // e.g., 45
};

export type PokemonType = {
  name: string;        // e.g., "flying"
};
