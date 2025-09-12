import type { CLICommand } from "./state.js"
import { type State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
    if (args.length < 1) {
        console.log("Please specify a location")
    } else {
    let data = await state.api.fetchNameData(args[0]);
    for (const r of data.pokemon_encounters) {
        console.log(r.pokemon.name);
    }
}
}