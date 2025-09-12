import { commandExplore } from "./command_explore.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { CLICommand } from "./state.js";




export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays 20 map locations",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Goes back a page of maps",
      callback: commandMapb
    },
    explore: {
      name: "explore",
      description: "Gives back a list of Pokemon encounters for a specified area",
      callback: commandExplore
    },
    catch: {
      name: "catch",
      description: "Will attempt to catch a pokemon, success is based on the pokemons XP",
      callback: commandCatch
    },
    inspect: {
      name: "inspect",
      description: "Lets you see a pokemon's information",
      callback: commandInspect
    }
  };
}