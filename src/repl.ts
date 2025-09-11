
import { createInterface } from "readline"
import { getCommands } from "./command.js";
import { State } from "./state.js"

export function cleanInput(input: string): string[] {
    let trimmed = input.toLowerCase().trim(); // trim removes excess white space at the staart and end
    if (trimmed.length === 0) { // a length check will catch all whitespace only and empty strings and error as needed
        throw new Error("Input must contain at least one word");
  }
  return trimmed.split(/\s+/); //splits the trimmed string into an array at white spaces, also accounts for multiple white spaces
    } 



export function startREPL(state: State) {
  state.rl.setPrompt("Pokedex > ");
  state.rl.prompt();
  state.rl.on("line", async (line: string) => {
    try {
      const words = cleanInput(line);
      let cmd = words[0]
      let args = words.slice(1);
      const command = state.commands[cmd]; // CLICommand | undefined

      if (command) {
        await command.callback(state, ...args)
      } else {
        console.log("Unknown command")
      }
      
    } catch (err) {
      console.log("Error:", err instanceof Error ? err.message : err);
    } finally {
      state.rl.prompt();
    }
  });

  }
