import type { CLICommand } from "./state.js"
import { type State } from "./state.js";


export async function commandCatch(state: State, ...args: string[]) {
  if (args.length < 1) {
    console.log("Please specify a target pokemon");
    return;
  }

  const name = args[0]; // already cleaned by REPL
  console.log(`Throwing a Pokeball at ${name}...`);

  try {
    const pokemon = await state.api.fetchPokemon(name);
    const captureChance = catchChance(pokemon.baseExperience);

    if (Math.random() < captureChance) {
      const key = name; 
      state.pokedex[key] = pokemon;
      console.log(`${pokemon.name} was caught!`);
    } else {
      console.log(`${pokemon.name} escaped!`);
    }
  } catch {
    console.log(`Failed to find pokemon: ${name}`);
  }
}

function catchChance(baseExperience: number): number {
  const chance = 0.7 - baseExperience / 1000; // min chance is 70% and lowers depending on pokemon XP
  return Math.max(0.1, chance); // min chance of 10%, a 400xp pokemon (legendary) will havea a 30% base chance with this
  // example usage at 400 xp
  // base xp 400/1000 is 0.4, taken from the default of 0.7 it leaves 0.3 or a 30% chance
}