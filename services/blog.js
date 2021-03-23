const { exec } = require('../db/mysql')
const xss = require('xss')
const { genPassword } = require('../utils/crypto')

/**
 * 根据用户获取微博列表
 * @param {*} param0 
 * @returns 
 */

const create = async ({ userId, title, content, image }) => {
    content = xss(content)
    let sql = `insert into blogs (userId,title,content,image,createTime) values ('${userId}','${title}','${content}','${image}',now())`
    console.log('sql', sql)
    const res = await exec(sql)
    return {
        id: res.insertId
    }
}

const getBlogListByUser = async ({ userName, pageIndex = 1, pageSize = 5 }) => {
    let sqlList = `select blogs.* from users join blogs on users.id=blogs.userId where users.userName='${userName}' limit ${(pageIndex - 1) * pageSize},${pageSize}`
    let sqlCount = `select count(*) from users join blogs on users.id=blogs.userId where users.userName='${userName}'`
    const res = await exec(sqlList)
    const count = await exec(sqlCount)
    return {
        count: count[0]['count(*)'],
        blogList: JSON.parse(JSON.stringify(res))
    }
}

module.exports = { create, getBlogListByUser }