/**
 * @file dbTool
 * @author xzh
 * @date 2019-08-27 16:09:21
 */

const Nedb = require('nedb')

module.exports = {
    getDb: (function() {
        const map = new Map()
    
        return (name) => {
            let db = map.get(name)
    
            if (db) {
                return db
            }
    
            db = new Nedb({
                filename: `./db/${name}`,
                autoload: true,
            })
    
            map.set(name, db)
    
            return db
        }
    }()),
    insert(db, docs) {
        return new Promise(resolve => {
            db.insert(docs, (err, newDoc) => {
                if (err) {
                    resolve({
                        code: 0,
                        msg: '添加失败'
                    })
    
                    return
                }
    
                resolve({
                    code: 1,
                    data: newDoc,
                    msg: 'ok'
                })
            })
        })
    },
    find(db, argv) {
        return new Promise(resolve => {
            db.find(...([].concat(argv)), (err, docs) => {
                if (err) {
                    resolve({
                        code: 0,
                        msg: '查询出错'
                    })
    
                    return
                }
    
                resolve({
                    code: 1,
                    data: docs,
                    msg: 'ok'
                })
            })
        })
    }
}
