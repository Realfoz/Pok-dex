import type { CLICommand } from "./state.js"
import { type State } from "./state.js";

export function commandInspect(state: State, ...args: string[]) {
     if (args.length < 1) {
    console.log("Please specify a target pokemon");
    return;
  }
  
  const name = args[0]; // already cleaned by REPL
  const pokemon = state.pokedex[name];
  if(!pokemon) {
    console.log("You have not caught that pokemon!");
    return
  }
  console.log(`Name: ${pokemon.name}`)
  console.log(`Height: ${pokemon.height}`)
  console.log(`Weight: ${pokemon.weight}`)
  console.log("Stats:")
  for (const stat of pokemon.stats) {
    console.log(`  -${stat.name}: ${stat.value}`)
  }
  console.log("Types:")
   for (const type of pokemon.types) {
    console.log(`  -${type.name}`)
  }

}