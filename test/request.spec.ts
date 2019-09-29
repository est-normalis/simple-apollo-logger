import { getObjectFromFile } from './helpers/jsonHelper'
import { request } from '../src/index'
import Logger from '../src/index'

const introspectionRequest = getObjectFromFile('data/requests/introspection.json') as request
const loginRequest = getObjectFromFile('data/requests/login.json') as request

const logger = new Logger()

console.log = jest.fn()
jest
    .spyOn(global.Date, "now")
    .mockImplementation(() => 
        new Date('2020-09-21T12:02:59.135Z').valueOf()
    )

describe("requestDidStart function", () => {
    describe('introspection query request', () => {
        it('logs introspection query', () => {
            logger.requestDidStart(introspectionRequest)

            expect(console.log).toMatchSnapshot()
        })
    })
})
