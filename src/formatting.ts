import deepReplace from './helpers/deepReplace'

const filterPasswordFromVariables = (variables: any, keyword: string, replacementText: string) => {
    // todo: make this function pure
    deepReplace(variables, keyword, replacementText)

    return variables
}

export const stringifiedRequestAttributes = ({ headers, variables, queryString, operationName }: request, variableFilter: VariableFilter | undefined): string => {
    if (variableFilter) {
        variableFilter.keywords.forEach((keyword) => {
            filterPasswordFromVariables(variables, keyword, variableFilter.replacementText)
        })
    }

    const stringifiedHeaders = JSON.stringify(headers)
    const stringifiedVariables = JSON.stringify(variables)
    const stringifiedQueryString = JSON.stringify(queryString).replace(/\s/g, '').replace(/\\n/g, " ")

    return `${operationName}\nHeaders: ${stringifiedHeaders}\nQueryString: ${stringifiedQueryString}\nVariables: ${stringifiedVariables}`
}

export interface request {
    headers: object
    queryString: any
    operationName: string
    variables: object
}

export interface VariableFilter {
    keywords: [string]
    replacementText: string
}