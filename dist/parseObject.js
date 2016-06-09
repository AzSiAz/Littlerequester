// application/x-www-form-urlencoded
// multipart/form-data
// Content-Type
"use strict";
// import url = require("url");
var url = require('url');
var querystring = require('querystring');
function parseObject(object, typeopt) {
    var data = { type: "", request: {} };
    url.parse;
    if (typeof object != "object") {
        if (typeof object === "string" && /http/g.test(object)) {
            data.request = url.parse(object);
            data.type = (typeopt) ? typeopt : "raw";
            data.request.headers = {
                "User-Agent": "LittleRequester"
            };
            data.request.method = correctMethod(undefined);
            return data;
        }
        else
            throw new Error("Not a String or an Object");
    }
    data.type = (object.type) ? object.type : "raw";
    if (typeof object.url === "string" && /http/g.test(object.url)) {
        data.request = url.parse(object.url);
        data.request.method = correctMethod(object.method);
    }
    else {
        throw new Error(object.url + " is not a correct url");
    }
    if (typeof object.headers === "object") {
        data.request.headers = object.headers;
        if (data.request.headers["User-Agent"] === undefined)
            data.request.headers["User-Agent"] = "LittleRequester";
    }
    else {
        data.request.headers = {
            "User-Agent": "LittleRequester"
        };
    }
    // TODO add file support
    if (data.request.method.toLowerCase() == "put"
        || data.request.method.toLowerCase() == "post"
        || data.request.method.toLowerCase() == "patch") {
        if (typeof object.data === "object") {
            data.data = querystring.stringify(object.data);
        }
        else {
            throw new Error(object.data + " is not an object");
        }
        data.request.headers["Content-Type"] = "application/x-www-form-urlencoded";
        data.request.headers["Content-Length"] = data.data.length;
    }
    return data;
}
function correctMethod(method) {
    if (method === undefined)
        return "GET";
    switch (method.toUpperCase()) {
        case "GET":
            {
                return "GET";
            }
        case "PUT":
            {
                return "PUT";
            }
        case "PATCH":
            {
                return "PATCH";
            }
        case "POST":
            {
                return "POST";
            }
        case "DELETE":
            {
                return "DELETE";
            }
        default:
            {
                return "GET";
            }
    }
}
module.exports = parseObject;
