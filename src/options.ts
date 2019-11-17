import { VariableFilter } from './formatting'

export const defaultOptions = {
    logger: console,
    logRequests: true,
    logResponses: false,
    prefix: () => `[${Date.now()}]`,
    variableFilter: {
      keywords: ['password'],
      replacementText: '[FILTERED]'
    },
    ignoreSchemaRequest: false
}
  
export interface Options {
  logger: Logger
  logRequests: boolean
  logResponses: boolean
  prefix: () => string
  variableFilter: VariableFilter | false
  ignoreSchemaRequest: boolean
}
  
export interface UserOptions {
  logger?: Logger
  logRequests?: boolean
  logResponses?: boolean
  prefix?: () => string
  variableFilter?: VariableFilter | false
  ignoreSchemaRequest?: boolean
}
  
export interface Logger {
  log(msg: string): any
}
  