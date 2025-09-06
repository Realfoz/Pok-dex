
import { createInterface } from "readline"
import { getCommands } from "./command.js";

export function cleanInput(input: string): string[] {
    let trimmed = input.toLowerCase().trim(); // trim removes excess white space at the staart and end
    if (trimmed.length === 0) { // a length check will catch all whitespace only and empty strings and error as needed
        throw new Error("Input must contain at least one word");
  }
  return trimmed.split(/\s+/); //splits the trimmed string into an array at white spaces, also accounts for multiple white spaces
    } 

export const rl = createInterface({
  input: process.stdin, // reads stream
  output: process.stdout, // writes stream
  prompt: "Pokédex > "
});

export function startREPL() {
rl.prompt();
rl.on("line", (line: string) => {
  try {
    const words = cleanInput(line);
    let cmd = words[0]

    const commands = getCommands();
    const command = commands[cmd]; // CLICommand | undefined

    if (cmd in commands) {
      command.callback(commands);
    } else {
      console.log("Unknown command")
    }
    
  } catch (err) {
    console.log("Error:", err instanceof Error ? err.message : err);
  } finally {
    rl.prompt();
  }
});

}
