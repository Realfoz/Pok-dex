import type { CLICommand } from "./command.js"

export function commandHelp(commands: Record<string, CLICommand>) {
  console.log("Welcome to the Pokedex!")
  console.log("Usage:") 
  console.log("")   
    for (const key of Object.keys(commands)) {
  const c = commands[key]; // CLICommand
  console.log(`${c.name}: ${c.description}`);
}
}
