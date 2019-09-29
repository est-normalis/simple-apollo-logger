import { readFileSync } from 'fs'
import { join } from 'path'

const filePath = (path: string): string => {
    return join(__dirname, path)
}

export const readDataFile = (path: string): string => {
    return readFileSync(filePath(path), 'utf-8')
}

export const getObjectFromFile = (path: string): object => {
    const stringifiedObject = readDataFile(path)
    
    return JSON.parse(stringifiedObject)
}