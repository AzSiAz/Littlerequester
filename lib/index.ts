"use strict";


import * as http from 'http';
import * as https from 'https';
import parseObject = require('./parseObject');

/**
 * littlerequester
 * Make an HTTP/HTTPS request and return a promise with data and http response object
 *
 *@name littlerequester
 *@function
 *@param {Object | String} options A string containing an url or an object with the following fields:
 * - "url" (String): Request url
 * - "type" (String): Return data type either json or raw
 * - "headers" (Object): Object with header to use in request (ex: user-agent)
 * - "method" (String): Contains PUT, POST, DELETE, GET(default),
 * - "data"? (Object): Contains data to send to server
 *@return {Promise} Return a promise
 */


function littlerequester(options: any, typeopt = 'raw') {
    return new Promise((resolve, reject) => {
        try {
            
            options = parseObject(options, typeopt);
            
            let res = (options.request.protocol.includes("http:") ? http : https).request(options.request, res => {
                res.setEncoding("utf-8");
                let str = '';

                res.on("data", chunk => {
                    str += chunk.toString();
                }).on("error", e => {
                    reject(e);
                }).on("end", () => {
                    if(options.type.toLowerCase() === "raw") {
                    resolve({data: str, res: res});
                    }
                    else if (options.type.toLowerCase() === "json") {
                    try {
                        let json = JSON.parse(str);
                        resolve({data: json, res: res});
                    }
                    catch (e) {
                        reject(e);
                    }
                    }
                    else {
                    resolve({data: str, res: res});
                    }
                });

            }).on("error", e => {
                reject(e);
            });

            if ((options.request.method.toLowerCase() == "put"
            || options.request.method.toLowerCase() == "post"
            || options.request.method.toLowerCase() == "patch")
            && options.data)
            {
                res.write(options.data);
            }
            res.end();
        }
        catch (e) {
            reject(e);
        }
    });
}

export = littlerequester