"use strict";

let http = require("http");
let https = require("https");
const url = require("url");

/**
 * littlerequester
 * Make an HTTP/HTTPS request and return 
 *
 *@name littlerequester
 *@function
 *@param {Object} options An object with the following fields:
 * - "url" (String): Request url
 * - "type" (String): Return data type either json or raw
 * - "headers" (Object): Object with header to use in request (ex: user-agent)
 *@return {Promise} Return a promise
 */

function littlerequester(options) {
	return new Promise((resolve, reject) => {
        try {
            if (typeof options != "object") {
                reject("Your options is not an Object");
            }

            if (!options.type) {
                options.type = "raw";
            }

            options = parseObject(options);

            (options.request.protocol.includes("http:") ? http : https).request(options.request, res => {
                res.setEncoding("utf-8");
                let data = '';

                res
                    .on("data", chunk => {
                        data += chunk.toString();
                    })
                    .on("error", e => {
                        reject(e);
                    })
                    .on("end", () => {
                        if(options.type.toLowerCase() === "raw") {
                            resolve({data: data, res:res});
                        }
                        else if (options.type.toLowerCase() === "json") {
                            try {
                                let json = JSON.parse(data);
                                resolve({data: json, res:res});
                            }
                            catch (e) {
                                reject(e);
                            }
                        }
                        else {
                            resolve({data: data, res:res});
                        }
                    });

            }).on("error", e => {
                reject(e);
            }).end();
        }
        catch (e) {
            reject(e);
        }
	});
}

function parseObject(object) {
    let data = {type: object.type, request:{}};
    if (typeof object.url === "string" && /http/g.test(object.url)) {
        data.request = url.parse(object.url);
        // TODO Different request method
        data.request.method = "GET";
    }
    else {
        throw new Error(object.url + " is not a correct url");
    }
    if (object.headers && typeof object.headers === "object") {
        data.request.headers = object.headers;
        data.request.headers["User-Agent"] = "LittleRequester";
    }
    else {
        data.request.headers = {
            "User-Agent": "LittleRequester"
        }
    }
    return data;
}

module.exports = {littlerequester, parseObject};
