import deepReplace from './helpers/deepReplace'

const filterPasswordFromVariables = (variables: { password?: string }) => {
    deepReplace(variables, "password", "[FILTERED]")

    return variables
}

export const stringifiedRequestAttributes = ({ headers, variables, queryString, operationName }: request): string => {
    const filteredVariables = filterPasswordFromVariables(variables)

    const stringifiedHeaders = JSON.stringify(headers)
    const stringifiedVariables = JSON.stringify(filteredVariables)
    const stringifiedQueryString = JSON.stringify(queryString).replace(/\s/g, '').replace(/\\n/g, " ")

    return `${operationName}\nHeaders: ${stringifiedHeaders}\nQueryString: ${stringifiedQueryString}\nVariables: ${stringifiedVariables}`
}

export interface request {
    headers: object
    queryString: any
    operationName: string
    variables: object
}
