export default class ApolloLogExtension {
    requestDidStart(object: any) {
      console.log(object)
    }
  
    willSendResponse(object: any) {
      console.log(JSON.stringify(object.graphqlResponse.data))
    }
}