import deepReplace from './helpers/deepReplace'

export default class ApolloLogExtension {
    requestDidStart(request: any): void {
        console.log(prefix() + stringifiedRequestAttributes(request))
    }
  
    willSendResponse(object: any): void {
      //console.log(JSON.stringify(object.graphqlResponse.data))
    }

    parsingDidStart(r: any): void {}
    validationDidStart(): void {}
    executionDidStart(r: any): void {}
}


const prefix = (): string => {
    return `[${Date.now()}] `
}

const filterPasswordFromVariables = (variables: { password?: string }) => {
    deepReplace(variables, "password", "[FILTERED]")

    return variables
}

const stringifiedRequestAttributes = ({ headers, variables, queryString, operationName }: request): string => {
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