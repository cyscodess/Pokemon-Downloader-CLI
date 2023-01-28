import fs from "fs/promises"
import path from "path"
import fetch from "node-fetch"

const saveImageFile = async(filePath, arrayBuffer) => {
    await fs.writeFile(filePath, Buffer.from(arrayBuffer))
}

const createFolder = async(folderName) => {
    const makeFolderName = path.join(process.cwd(), folderName)
    try {
        await fs.access(makeFolderName) // if the folder exists
    } catch {
        fs.mkdir(makeFolderName) // if the folder does not yet exist
    }
}

const savePokemonStats = async(folderName, pokemonStatsObject) => {
    let statsData = ""
    for (const data of pokemonStatsObject) {
        statsData += `${data.stat.name} : ${data.base_stat}\n`
    }

    await createFolder(folderName)
    const filePath = path.join(process.cwd(), folderName, "stats.txt")
    await fs.writeFile(filePath, statsString)
}

const savePokemonArtwork = async(folderName, pokemonSpritesObject) => {
    const url = pokemonSpritesObject.other["official-artwork"].front_default
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    
    await createFolder(folderName)
    const filePath = path.join(process.cwd(), folderName, "artwork.png")
    await saveImageFile(filePath, arrayBuffer)
}

const savePokemonSprites = async(folderName, pokemonSpritesObject) => {
    let spritePromises = []
    let spriteNames = []

    for (const [name, url] of Object.entries(pokemonSpritesObject)) {
        if (!url) continue
        if (name === "other" || name === "versions") continue

    spritePromises.push(fetch(url).then((res) => res.arrayBuffer()))
    spriteNames.push(name)
    }

    spritePromises = await Promise.all(spritePromises)
    await createFolder(folderName)
    for (let i = 0; i < spritePromises.length; i++) {
        const filePath = path.join(process.cwd(), folderName, `${spriteNames[i]}.png`)
        await saveImageFile(filePath, spritePromises[i])
    }

}