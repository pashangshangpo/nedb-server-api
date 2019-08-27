/**
 * @file index
 * @author xzh
 * @date 2019-08-27 16:10:00
 */

const http = require('http')
const dbTool = require('./db')

const getJson = (r) => {
    return new Promise(resolve => {
        let str = ''
    
        r.on('data', data => str += data)
        r.on('end', () => {
            if (str) {
                resolve(JSON.parse(str))
                return
            }
            
            resolve(null)
        })
    })
}

const send = (r, data) => {
    r.writeHead(200, {
        'Content-Type': 'application/json'
    })

    r.end(JSON.stringify(data))
}

http.createServer((req, res) => {
    if (req.method !== 'POST') {
        res.writeHead(200, {
            'access-control-allow-credentials': true,
            'access-control-allow-headers': '*',
            'access-control-allow-methods': '*',
            'access-control-allow-origin': req.headers.origin
        })
        res.end('hello world')
        return
    }

    const path = req.url.split('/api/')[1]
    const [ name, type ] = path.split('/')
    const fn = dbTool[type]

    if (!name || type === 'getDb') {
        send(res, {
            code: 0,
            msg: '请求路径错误'
        })

        return
    }

    if (!fn) {
        send(res, {
            code: 0,
            msg: `找不到${type}这个方法，确定这是nedb方法？`
        })
    }

    getJson(req).then(data => {
        if (!data) {
            send(res, {
                code: 0,
                msg: '参数错误'
            })

            return
        }

        fn(dbTool.getDb(name), data).then(info => {
            send(res, info)
        })
    })
}).listen(8014)
