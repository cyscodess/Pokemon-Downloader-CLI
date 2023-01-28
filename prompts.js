import fetch from "node-fetch"
import inquirer from "inquirer"
import { parseOptions } from "./save.js"

// Question to get Pokemon
const getPokemonInput = async () => {
    return await inquirer.prompt({
        type: "input",
        name: "pokemon_name",
        message: "Enter a Pokemon name: ",
    })
}

// Prompt to get type of data
const getDownloadInfo = async () => {
    return await inquirer.prompt({
        type: "checkbox",
        message: "Select Pokemon information needed: ",
        name: "options",
        choices: [
            new inquirer.Separator(" *** Choices *** "),
            { name: "Stats" },
            { name: "Sprites" },
            { name: "Artwork" }
        ]
    })
}

// Prompt to restart 
const continuePrompt = async () => {
    return await inquirer.prompt({
        type:"list",
        name: "continue",
        message: "Search for another Pokemon?",
        choices: ["Yes", "No"]
    })
}

const fetchPokemon = async (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    const response = await fetch(url)
    const json = await response.json()
    return json
}

const promptUser = async () => {
    while (true) {
        const pokemon = await getPokemonInput()
        const pokemonJSON = await fetchPokemon(pokemon.pokemon_name)
        const options = await getDownloadInfo()
        await parseOptions(pokemonJSON, options)
        const keepGoing = await continuePrompt()
        if (keepGoing.continue === "No") break
    }
}

export {promptUser}