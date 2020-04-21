import Logger from '../src/index'
import { ApolloRequest } from '../src/types'
import { getObjectFromFile } from './helpers/jsonHelper'

const introspectionRequest = getObjectFromFile(
  'data/requests/introspection.json'
) as ApolloRequest
const loginRequest = getObjectFromFile(
  'data/requests/login.json'
) as ApolloRequest

console.log = jest.fn()
jest
  .spyOn(global.Date, 'now')
  .mockImplementation(() => new Date('2020-09-21T12:02:59.135Z').valueOf())

describe('requestDidStart function', () => {
  const logger = new Logger()

  describe('when logging requests is enabled', () => {
    describe('introspection query request', () => {
      it('logs introspection query', () => {
        logger.requestDidStart(introspectionRequest)

        expect(console.log).toMatchSnapshot()
      })
    })

    describe('login mutation request', () => {
      it('logs login mutation', () => {
        logger.requestDidStart(loginRequest)

        expect(console.log).toMatchSnapshot()
      })
    })
  })

  it('does nothing when logging requests is disabled', () => {
    const opts = {
      logRequests: false
    }

    const disabledLogger = new Logger(opts)
    jest.resetAllMocks()
    disabledLogger.requestDidStart(loginRequest)

    expect(console.log).not.toBeCalled()
  })

  it('does nothing when logging is enabled but its ignored introspection query', () => {
    const opts = {
      ignoreSchemaRequest: true
    }

    const loggerIgnoringSchema = new Logger(opts)
    jest.resetAllMocks()
    loggerIgnoringSchema.requestDidStart(introspectionRequest)

    expect(console.log).not.toBeCalled()
  })

  it('does not mutate given request object', () => {
    const r = {
      queryString:
        'mutation ($input: SignupInput!) {\n  signup(input: $input) {\n    token\n  }\n}\n',
      operationName: null,
      variables: {
        input: {
          email: 'ddddddddassaaaaad@dddd.dde',
          password: 'dddddddddddddddd',
          name: 'ddoopson'
        }
      },
      request: {
        size: 0,
        timeout: 0,
        follow: 20,
        compress: true,
        counter: 0
      }
    }

    const request = (r as unknown) as ApolloRequest

    const rCopy = JSON.parse(JSON.stringify(request))

    logger.requestDidStart(request)

    expect(r).toEqual(rCopy)
  })
})
