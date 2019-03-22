// @ts-check
const { parse } = require('url')
const { stringify } = require('querystring')


const GET = "GET"
const PATCH = "PATCH"
const POST = "POST"
const PUT = "PUT"
const DELETE = "DELETE"
const UserAgentHeaderName = "User-Agent"
const DefaultUserAgent = "LittleRequester"
const ContentTypeHeaderName = "Content-Type"
const DefaultContentType = "application/x-www-form-urlencoded"
const ContentLengthHeaderName = "Content-Length"


/**
 * @typedef {import('url').UrlWithStringQuery} Query 
 * 
 * 
 * @typedef {Object} Request
 * @property {Object} headers
 * @property {string} method
 * 
 * 
 * @typedef {Object} ParsedObject
 * @property {string} type
 * @property {Query & Request} request
 * @property {string} data
 *
 * 
 * @typedef {Object} Raw
 * @property {string=} type
 * @property {string=} url
 * @property {Object=} headers
 * @property {string=} method
 * @property {Object=} data
 * 
 * Parse raw options object to return options to be used by node http/https internal module
 * @param {Raw | string} rawData 
 * @param {string=} typeOpt
 * @returns {ParsedObject}
 */
const parseOptions = (rawData, typeOpt) => {
    /** @type {ParsedObject} data */
    let data = {}

    if (typeof rawData !== "object") {
        if(typeof rawData === "string" && /http/g.test(rawData)) {
            // @ts-ignore
            data.request = parse(rawData)
            data.type = typeOpt
            data.request.headers = {}
            data.request.headers[UserAgentHeaderName] = DefaultUserAgent
            data.request.method = selectCorrectMethod()
            
            return data
        }
        else throw new Error("Not a String or an Object")
    }

    data.type = (rawData.type === "json" || rawData.type === "raw") ? rawData.type : "raw"

    if (typeof rawData.url === "string" && /http/g.test(rawData.url)) {
        // @ts-ignore
        data.request = parse(rawData.url)
        data.request.method = selectCorrectMethod(rawData.method)
    }
    else throw new Error(rawData.url + " is not a correct url");

    if (typeof rawData.headers === "object") {
        data.request.headers = rawData.headers
        if (!data.request.headers[UserAgentHeaderName]) 
            data.request.headers[UserAgentHeaderName] = DefaultUserAgent
    }
    else {
      data.request.headers = {
        "User-Agent": "LittleRequester"
      }
    }
    
    if(
        data.request.method.toLowerCase() == "put" || 
        data.request.method.toLowerCase() == "post" || 
        data.request.method.toLowerCase() == "patch"
    ) {
        if (typeof rawData.data === "object") {
            data.data = stringify(rawData.data)
        }
        else {
            throw new Error(rawData.data + " is not an object")
        }
        data.request.headers[ContentTypeHeaderName] = DefaultContentType
        data.request.headers[ContentLengthHeaderName] = data.data.length
    }

    return data
}


/**
 * Return an uppercase correct Http method, return GET if method undefined
 * @param {string} method 
 * @returns {string}
 */
const selectCorrectMethod = (method = undefined) => {
    if (method === undefined) return GET

    switch (method.toUpperCase()) {
        case GET:
        case PATCH:
        case POST:
        case PUT:
        case DELETE:
            return method.toUpperCase()
        default:
            return GET
    }
}

module.exports = {
    selectCorrectMethod,
    parseOptions
}