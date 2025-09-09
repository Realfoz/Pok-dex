import type { CLICommand } from "./state.js"
import { type State } from "./state.js";

export async function commandMapb(state: State) {
    if (!state.prevLocationsURL) {
    console.log("you're on the first page");
    return;
  }
    let data = await state.api.fetchLocations(state.prevLocationsURL ?? undefined);
    for (const r of data.results) {
        console.log(r.name);
    }
  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;
}