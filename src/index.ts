import { stringifiedRequestAttributes } from './formatting'

export default class ApolloLogExtension {
    requestDidStart(request: any): void {
        console.log(stringifiedRequestAttributes(request))
    }
  
    willSendResponse(object: any): void {
      //console.log(JSON.stringify(object.graphqlResponse.data))
    }

    parsingDidStart(r: any): void {}
    validationDidStart(): void {}
    executionDidStart(r: any): void {}
}