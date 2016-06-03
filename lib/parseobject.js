var url = require("url");

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

module.exports = parseObject;