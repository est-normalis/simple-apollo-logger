import { stringifiedRequestAttributes } from './formatting'

export default class ApolloLogExtension {
    private options: Options
    private log(msg: string): void {
        this.options.logger.log(`${this.options.prefix()} ${msg}`)
    }

    constructor(ops: UserOptions) {
        this.options = Object.assign(defaultOptions, ops)
    }

    requestDidStart(request: any): void {
        if (this.options.logRequests) {
            this.log(stringifiedRequestAttributes(request))
        }
    }
  
    willSendResponse(object: any): void {
        if (this.options.logResponses) {
            this.log(JSON.stringify(object.graphqlResponse.data))
        }
    }

    parsingDidStart(r: any): void {}
    validationDidStart(): void {}
    executionDidStart(r: any): void {}
}

const defaultOptions = {
    logger: console,
    logRequests: true,
    logResponses: false,
    prefix: () => `[${Date.now()}]`
}

interface Options {
    logger: Logger
    logRequests: boolean
    logResponses: boolean
    prefix: () => string
}

export interface UserOptions {
    logger?: Logger
    logRequests?: boolean
    logResponses?: boolean
    prefix?: () => string
}

export interface Logger {
    log(msg: string): any
}