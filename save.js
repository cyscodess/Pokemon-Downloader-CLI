import fs from "fs/promises"
import path from "path"

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