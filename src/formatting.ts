import deepReplace from './helpers/deepReplace'

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
  { headers, variables, queryString, operationName }: Request,
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

  const stringifiedHeaders = JSON.stringify(headers)
  const stringifiedVariables = JSON.stringify(copyOfVariables)
  const stringifiedQueryString = JSON.stringify(queryString)
    .replace(/\s/g, '')
    .replace(/\\n/g, ' ')

  return `Request started
  Operation name: ${operationName}
  Headers: ${stringifiedHeaders}
  QueryString: ${stringifiedQueryString}
  Variables: ${stringifiedVariables}`
}

export interface Request {
  headers: object
  queryString: any
  operationName: string
  variables: object
}

export interface VariableFilter {
  keywords: string[]
  replacementText: string
}
