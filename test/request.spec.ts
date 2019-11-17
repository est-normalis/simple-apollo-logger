import { Request } from '../src/formatting'
import Logger from '../src/index'
import { getObjectFromFile } from './helpers/jsonHelper'

const introspectionRequest = getObjectFromFile('data/requests/introspection.json') as Request
const loginRequest = getObjectFromFile('data/requests/login.json') as Request

console.log = jest.fn()
jest
    .spyOn(global.Date, "now")
    .mockImplementation(() => 
        new Date('2020-09-21T12:02:59.135Z').valueOf()
    )

describe('requestDidStart function', () => {
    const logger = new Logger()

    describe('when logging requests is enabled', () =>{
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
            password: "ddddd",
            someotherthing: {
                password: "ddddd"
            }
        }

        const rCopy = JSON.parse(JSON.stringify(r))

        logger.requestDidStart(r)

        expect(r).toEqual(rCopy)
    })
})
