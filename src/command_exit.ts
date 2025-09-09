import { type State } from "./state";

export async function commandExit(state: State): Promise<void> {
  state.rl.close();
  console.log("Closing the Pokedex... Goodbye!");
  process.exit(0);
}