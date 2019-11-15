import { stringifiedRequestAttributes } from './formatting'

export default class ApolloLogExtension {
    private options: Options
    private logger: Logger

    constructor(ops: Options) {
        const options = Object.assign(defaultOptions, ops)
        this.options = options
        this.logger = options.logger
    }

    requestDidStart(request: any): void {
        this.logger.log(stringifiedRequestAttributes(request))
    }
  
    willSendResponse(object: any): void {
      this.logger.log(JSON.stringify(object.graphqlResponse.data))
    }

    parsingDidStart(r: any): void {}
    validationDidStart(): void {}
    executionDidStart(r: any): void {}
}

const defaultOptions = {
    logger: console,
    logRequests: true,
    logResponses: false
}

export interface Options {
    logger?: Logger
    logRequests?: boolean
    logResponses?: boolean
}

export interface Logger {
    log(msg: string): any
}