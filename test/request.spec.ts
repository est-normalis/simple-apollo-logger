import { getObjectFromFile } from './helpers/jsonHelper'
import { request } from '../src/index'
import Logger from '../src/index'

const exampleRequest = getObjectFromFile('data/request.json') as request
const logger = new Logger()

console.log = jest.fn()

describe("requestDidStart function", () => {
    it('logs introspection query', () => {
        logger.requestDidStart(exampleRequest)

        expect(console.log).toHaveBeenCalledWith('[INFO]')
    })
})