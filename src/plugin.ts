import { UserOptions, defaultOptions, Options } from './options'
import { stringifiedRequestAttributes } from './formatting'
import { ApolloServerPlugin } from 'apollo-server-plugin-base'

export default (ops: UserOptions = {}): ApolloServerPlugin => {
  const options: Options = Object.assign(defaultOptions, ops);
  const log = (msg: string): void => {
    options.logger(`${options.prefix()}${msg}`)
  }
  return {
    requestDidStart(r) {
      const isInspectionQuery = r.request.operationName === 'IntrospectionQuery'
      const isIgnoredRequest =
        options.ignoreSchemaRequest && isInspectionQuery
      const shouldBeLogged = options.logRequests && !isIgnoredRequest
      if (shouldBeLogged) {
        log(stringifiedRequestAttributes(r.request, options.variableFilter))
      }
      return {
        willSendResponse(ctx) {
          if (options.logResponses) {
            log(JSON.stringify(ctx.response.data))
          }
        }
      }
    }
  }
};
