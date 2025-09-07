import { type State } from "./state";

export function commandExit(state: State) {
  state.rl.close();
  console.log("Closing the Pokedex... Goodbye!");
  process.exit(0);
}