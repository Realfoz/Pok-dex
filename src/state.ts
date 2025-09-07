import { createInterface, type Interface } from "readline";
import { getCommands } from "./command.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
    commands: Record<string, CLICommand>,
    rl: Interface
}

export function initState(): State {
    const rl = createInterface({
    input: process.stdin, // reads stream
    output: process.stdout, // writes stream
    prompt: "Pokédex > "
});
    const commands = getCommands()
    return {
        commands: commands,
        rl: rl
    }
}