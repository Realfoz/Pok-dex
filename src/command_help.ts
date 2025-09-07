import type { CLICommand } from "./state.js"
import { type State } from "./state.js";

export function commandHelp(state: State) {
  console.log("Welcome to the Pokedex!")
  console.log("Usage:") 
  console.log("")   
    for (const name in state.commands) {
  const c = state.commands[name]; // CLICommand
  console.log(`${c.name}: ${c.description}`);
}
}
