const http = require('http')
const https = require('https')

const { parseOptions } = require('./parseObject')


/**
 * @param {string | import("./parseobject").Raw} options
 * @param {string} [typeData="raw"]
 */
module.exports = (options, typeData = 'raw') => new Promise((resolve, reject) => {
    const opts = parseOptions(options, typeData)
    const requester = opts.request.protocol.includes('http:') ? http : https

    const res = requester.request(opts.request, response => {
        response.setEncoding("utf-8")
        let str = ''

        response
            .on('data', chunk => { str += chunk.toString() })
            .on('error', err => reject(err))
            .on('end', () => {
                if (opts.type.toLowerCase() === 'raw') return resolve({ data: str, res: response })

                const json = JSON.parse(str)

                resolve({ data: json, res: response })
            })
    })

    res.on('error', err => reject(err))

    if (opts.request.method !== 'GET' && opts.data) res.write(opts.data)

    res.end()
})
