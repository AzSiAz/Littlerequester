const querystring = require("querystring")
const { parseOptions } = require("../src/parse")

let object = {}
let partialObject = {}
let incorrectObject = {}
let postObject = {}
let putObject = {}
let delObject = {}


describe('parseOptions function', () => {
    beforeAll(function () {
        object = {
            url: "http://example.com/",
            type: "raw",
            headers: {
               'User-Agent': 'testAgent'
            }
        }
        partialObject = {
            url: "http://example.com/"
        }
        incorrectObject = {
            url: "test",
            type: "raw"
        }
        postObject = {
          url: "http://example.com/",
          type: "raw",
          data: {
            test: "test2"
          },
          method: "POST"
        }
        delObject = {
          url: "http://example.com/",
          type: "raw",
          data: {
            test: "test2"
          },
          method: "DELETE"
        }
        putObject = {
          url: "http://example.com/",
          type: "raw",
          data: {
            test: "test2"
          },
          method: "PUT"
        }
    })

    test("should not pass if not an url", () => {
        expect(() => { parseOptions("test") }).toThrow(/Object/)
    })

    test("should return a correct object", () => {
        const parsedObject = parseOptions(object)

        expect(parsedObject.type).toBe(object.type)
        expect(parsedObject.request.headers['User-Agent']).toBe(object.headers['User-Agent'])
        expect(object.url.includes(parsedObject.request.hostname)).toBe(true)
    })

    test("should return a correct object for POST request", () => {
        const parsedObject = parseOptions(postObject)

        expect(parsedObject.request.method).toBe(postObject.method)
        expect(parsedObject.request.headers['Content-Type']).toBe("application/x-www-form-urlencoded")
        expect(parsedObject.request.headers['Content-Length']).toBe(querystring.stringify(postObject.data).length)
    })
    test("should return a correct object for PUT request", () => {
        const parsedObject = parseOptions(putObject)

        expect(parsedObject.request.method).toBe(putObject.method)
        expect(parsedObject.request.headers['Content-Type']).toBe("application/x-www-form-urlencoded")
        expect(parsedObject.request.headers['Content-Length']).toBe(querystring.stringify(putObject.data).length)
    })
    test("should return a correct object for DELETE request", () => {
        const parsedObject = parseOptions(delObject)

        expect(parsedObject.request.method).toBe(delObject.method)
    })

    test("should pass even if only url is correct", () => {
        const parsedObject = parseOptions(partialObject)

        expect(parsedObject.type).toBe("raw")
        expect(parsedObject.request.headers['User-Agent']).toBe("LittleRequester")
        expect(parsedObject.request.href).toBe(partialObject.url)
    })

    test("should not pass if incorrect object", () => {
        expect(() => { parseOptions(incorrectObject) }).toThrow(/url/)
    })

})
