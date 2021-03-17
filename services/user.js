const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/crypto')

/**
 * 
 * @param {string} userName 
 * @param {string} password 
 * @returns 
 */
const getUserInfo = async (userName, password) => {
    if (password) {
        password = genPassword(password)
        password = escape(password)
    }
    userName = escape(userName)
    let sql = `select * from users where 1=1 `
    if (userName) {
        sql += `and username=${userName} `
    }
    if (password) {
        sql += `and password=${password}`
    }

    const res = await exec(sql)
    return res[0] || {}
}

const createUser = async ({ userName, password, gender = 3, nickName }) => {
    if (password) {
        password = genPassword(password)
        password = escape(password)
    }
    let sql = `insert into users (userName,password,gender,nickName) values ('${userName}',${password},${gender},'${nickName}')`
    console.log(33, sql)
    const res = await exec(sql)
    console.log(222, sql, res)
    return {
        id: res.insertId
    }
}

module.exports = { getUserInfo, createUser }