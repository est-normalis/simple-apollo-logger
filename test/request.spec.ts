import { getObjectFromFile } from './helpers/jsonHelper'
import { request } from '../src/formatting'
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
})
