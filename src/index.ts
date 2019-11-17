import { stringifiedRequestAttributes } from './formatting'
import { VariableFilter } from './formatting'

export default class ApolloLogExtension {
  
  private options: Options

  constructor(ops: UserOptions = {}) {
    this.options = Object.assign(defaultOptions, ops)
  }

  public requestDidStart(request: any): void {
    const isInspectionQuery = request.operationName === "IntrospectionQuery"
    const isIgnoredRequest = this.options.ignoreSchemaRequest && isInspectionQuery
    const shouldBeLogged = this.options.logRequests && !isIgnoredRequest
    if (shouldBeLogged) {
      this.log(
        stringifiedRequestAttributes(request, this.options.variableFilter)
      )
    }
  }

  public willSendResponse(object: any): void {
    if (this.options.logResponses) {
      this.log(JSON.stringify(object.graphqlResponse.data))
    }
  }

  // tslint:disable-next-line: no-empty
  public parsingDidStart(r: any): void {}
  // tslint:disable-next-line: no-empty
  public validationDidStart(): void {}
  // tslint:disable-next-line: no-empty
  public executionDidStart(r: any): void {}

  private log(msg: string): void {
    this.options.logger.log(`${this.options.prefix()} ${msg}`)
  }
}

const defaultOptions = {
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

interface Options {
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
