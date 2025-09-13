import type { CLICommand } from "./state.js"
import { type State } from "./state.js";

export function commandPokedex(state: State) {
    if (Object.keys(state.pokedex).length >= 1) {
    console.log("Your Pokedex:")
    for (const name in state.pokedex) {
        console.log(` - ${name}`)
    }
} else {
    console.log("You have not captured any pokemon yet")
}
}
    
  