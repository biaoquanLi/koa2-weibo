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
    const res = await exec(sql)
    return {
        id: res.insertId
    }
}

const updateUser = async (ctx, { nickName, city, picture }) => {
    const { userName, password } = ctx.session.userInfo.userName
    if (password) {
        password = genPassword(password)
        password = escape(password)
    }
    let sql = `update users set nickName='${nickName}',city='${city}',picture='${picture}' where userName='${userName}' and password=${password}`
    const res = await exec(sql)
    return {
        code: 0,
        affectedRows: res.affectedRows
    }
}

const updatePassword = async (userName, password, newPassword) => {
    if (password && newPassword) {
        password = genPassword(password)
        password = escape(password)
        newPassword = genPassword(newPassword)
        newPassword = escape(newPassword)
    }
    let sql = `update users set password=${newPassword} where userName='${userName}' and password=${password}`
    const res = await exec(sql)
    return {
        code: 0,
        affectedRows: res.affectedRows
    }
}

module.exports = { getUserInfo, createUser, updateUser, updatePassword }