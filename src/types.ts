import { Request } from 'apollo-server-env'
import { GraphQLRequestContext } from 'apollo-server-types'
import { DocumentNode } from 'graphql'

type TContext = any // workaround since types are in different file than extension class

export interface ApolloRequest {
  request: Pick<Request, 'url' | 'method' | 'headers'>
  queryString?: string
  parsedQuery?: DocumentNode
  operationName?: string
  variables?: { [key: string]: any }
  persistedQueryHit?: boolean
  persistedQueryRegister?: boolean
  context: TContext
  requestContext: GraphQLRequestContext<TContext>
}
