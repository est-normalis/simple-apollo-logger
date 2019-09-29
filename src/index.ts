export default class ApolloLogExtension {
    requestDidStart(request: request) {
        console.log(prefix() + stringifiedRequestAttributes(request))
    }
  
    willSendResponse(object: any) {
      console.log(JSON.stringify(object.graphqlResponse.data))
    }
}


const prefix = (): string => {
    return `[${Date.now()}] `
}

const filterPasswordFromVariables = (variables: { password?: string }) => {
    if ('password' in variables) {
        variables.password = "[FILTERED]"
    }

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