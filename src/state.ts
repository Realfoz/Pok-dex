import { createInterface, type Interface } from "readline";
import { getCommands } from "./command.js";
import { PokeAPI } from "./pokeapi.js";
import { Cache } from "./pokecache.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  commands: Record<string, CLICommand>;
  rl: Interface;
  api: PokeAPI;
  nextLocationsURL?: string | null;
  prevLocationsURL?: string | null;
};

export function initState(): State {
    const cache = new Cache(1000)
    const rl = createInterface({
    input: process.stdin, // reads stream
    output: process.stdout, // writes stream
    prompt: "Pokédex > "
    });
    const commands = getCommands()
    return {
        commands: commands,
        rl: rl,
        api: new PokeAPI(cache),
        nextLocationsURL: null,
        prevLocationsURL: null,
    }
}