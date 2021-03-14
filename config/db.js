const { isDev, isProd } = require('../utils/env')

let SQL_CONF
let REDIS_CONF
if (isDev) {
    SQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'weibo'
    }
    REDIS_CONF = {
        host: '127.0.0.1',
        port: 6379
    }
}

if (isProd) {
    SQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'weibo',
        connectionLimit: 60,
        supportBigNumbers: true,
        bigNumberStrings: true
    }
    REDIS_CONF = {
        host: '127.0.0.1',
        port: 6379
    }
}

module.exports = {
    SQL_CONF,
    REDIS_CONF
}