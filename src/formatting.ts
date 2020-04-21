import deepReplace from './helpers/deepReplace'
import { ApolloRequest } from './types'

const filterPasswordFromVariables = (
  variables: any,
  keyword: string,
  replacementText: string
) => {
  // todo: make this function pure
  deepReplace(variables, keyword, replacementText)

  return variables
}

export const stringifiedRequestAttributes = (
  { variables, queryString, operationName }: ApolloRequest,
  variableFilter: VariableFilter | undefined | false
): string => {
  const copyOfVariables = JSON.parse(JSON.stringify(variables))
  if (variableFilter) {
    variableFilter.keywords.forEach(keyword => {
      filterPasswordFromVariables(
        copyOfVariables,
        keyword,
        variableFilter.replacementText
      )
    })
  }

  const stringifiedVariables = JSON.stringify(copyOfVariables)
  const stringifiedQueryString = JSON.stringify(queryString)
    .replace(/\s/g, '')
    .replace(/\\n/g, ' ')

  return `Request started
  Operation name: ${operationName}
  QueryString: ${stringifiedQueryString}
  Variables: ${stringifiedVariables}`
}

export interface VariableFilter {
  keywords: string[]
  replacementText: string
}
