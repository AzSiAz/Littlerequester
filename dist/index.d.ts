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
declare function littlerequester(options: any, typeopt?: string): Promise<{}>;
export = littlerequester;
