import { readFileSync } from 'fs'
import { join } from 'path'

const filePath = (filename: string): string => {
    return join(__dirname, 'data', filename)
}

export const readDataFile = (filename: string): string => {
    return readFileSync(filePath(filename), 'utf-8')
}

export const getObjectFromFile = (filename: string): object => {
    const stringifiedObject = readDataFile(filename)
    
    return JSON.parse(stringifiedObject)
}