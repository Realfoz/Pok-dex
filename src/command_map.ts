import type { CLICommand } from "./state.js"
import { type State } from "./state.js";

export async function commandMap(state: State) {
    let data = await state.api.fetchLocations(state.nextLocationsURL ?? undefined);
    for (const r of data.results) {
        console.log(r.name);
    }
  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;
}