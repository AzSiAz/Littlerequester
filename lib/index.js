"use strict";

const http = require("http");
const https = require("https");
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
 *@return {Promise} Return a promise
 */

function littlerequester(options) {
	return new Promise((resolve, reject) => {
        if (typeof options != "object") {
			reject("Your options is not an Object");
		}
		(options.url.includes("http:") ? http : https).request(options.url, res => {
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
                    resolve(data);
                }
                else if (options.type.toLowerCase() === "json") {
                    try {
                        let json = JSON.parse(data);
                        resolve(json);
                    }
                    catch (e) {
                        reject(e);
                    }
                }
                else {
                    resolve(data);
                }
            });

        }).on("error", e => {
            reject(e);
        }).end();
	})
}

module.exports = littlerequester;
