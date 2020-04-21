import { GraphQLExtension } from 'graphql-extensions'
import { stringifiedRequestAttributes } from './formatting'
import { defaultOptions, Options, UserOptions } from './options'
import { ApolloRequest } from './types'

export default class ApolloLogExtension<TContext = any>
  implements GraphQLExtension<TContext> {
  private options: Options

  constructor(ops: UserOptions = {}) {
    this.options = Object.assign(defaultOptions, ops)
  }

  public requestDidStart(r: ApolloRequest): void {
    const isInspectionQuery = r.operationName === 'IntrospectionQuery'
    const isIgnoredRequest =
      this.options.ignoreSchemaRequest && isInspectionQuery
    const shouldBeLogged = this.options.logRequests && !isIgnoredRequest
    if (shouldBeLogged) {
      this.log(stringifiedRequestAttributes(r, this.options.variableFilter))
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
    this.options.logger(`${this.options.prefix()}${msg}`)
  }
}
