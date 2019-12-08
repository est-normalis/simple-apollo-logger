import { VariableFilter } from './formatting'

export const defaultOptions = {
  logger: (msg: string) => console.log(msg),
  logRequests: true,
  logResponses: false,
  prefix: () => `[${Date.now()}] `,
  variableFilter: {
    keywords: ['password'],
    replacementText: '[FILTERED]'
  },
  ignoreSchemaRequest: false
}

export interface Options {
  logger: (msg: string) => any
  logRequests: boolean
  logResponses: boolean
  prefix: () => string
  variableFilter: VariableFilter | false
  ignoreSchemaRequest: boolean
}

export interface UserOptions {
  logger?: (msg: string) => any
  logRequests?: boolean
  logResponses?: boolean
  prefix?: () => string
  variableFilter?: VariableFilter | false
  ignoreSchemaRequest?: boolean
}
