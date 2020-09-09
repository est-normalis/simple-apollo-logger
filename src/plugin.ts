import { UserOptions, defaultOptions, Options } from './options'
import { stringifiedRequestAttributes } from './formatting'
import { ApolloServerPlugin } from 'apollo-server-plugin-base'


export const apolloLogPlugin = (ops: UserOptions = {}): ApolloServerPlugin => {
    const options: Options = Object.assign(defaultOptions, ops);
    const log = (msg: string): void => {
        options.logger(`${options.prefix()}${msg}`)
    }
    return {
        requestDidStart(r) {
            const isInspectionQuery = r.operationName === 'IntrospectionQuery'
            const isIgnoredRequest =
                options.ignoreSchemaRequest && isInspectionQuery
            const shouldBeLogged = options.logRequests && !isIgnoredRequest
            if (shouldBeLogged) {
                log(stringifiedRequestAttributes(r, options.variableFilter))
            }
        }
    }
};
