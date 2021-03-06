const { exec } = require('../db/mysql')
const xss = require('xss')
const {formatBlog}=require('../utils/format')

/**
 * 根据用户获取微博列表
 * @param {*} param0 
 * @returns 
 */

const create = async ({ userId, title, content, image }) => {
    content = xss(content)
    let sql = `insert into blogs (userId,title,content,image,createTime) values ('${userId}','${title}','${content}','${image}',now())`
    const res = await exec(sql)
    return {
        id: res.insertId
    }
}

const getBlogListByUser = async ({ userName, pageIndex = 1, pageSize = 5 }) => {
    let sqlList = `select * from users join blogs on users.id=blogs.userId where 1=1 `
    let sqlCount = `select count(*) from users join blogs on users.id=blogs.userId where 1=1 `
    if (userName) {
        sqlList += `and users.userName='${userName}' `
        sqlCount += `and users.userName='${userName}'`
    }
    sqlList += `ORDER BY blogs.createTime desc limit ${(pageIndex - 1) * pageSize},${pageSize}`
    const res = await exec(sqlList)
    const count = await exec(sqlCount)
    let blogList = JSON.parse(JSON.stringify(res))
    blogList = formatBlog(blogList)
    return {
        count: count[0]['count(*)'],
        blogList
    }
}


const getFollowersBlogList = async ({ userId, pageIndex = 1, pageSize = 5 }) => {
    let sqlList = `SELECT * FROM userFollow JOIN blogs on userFollow.followId=blogs.userId JOIN users ON userFollow.followId=users.id ORDER BY blogs.createTime desc limit ${(pageIndex - 1) * pageSize},${pageSize}`
    let sqlCount = `SELECT count(*) FROM userFollow JOIN blogs on userFollow.followId=blogs.userId JOIN users ON userFollow.followId=users.id`

    const res = await exec(sqlList)
    const count = await exec(sqlCount)
    let blogList = JSON.parse(JSON.stringify(res))
    blogList = formatBlog(blogList)
    return {
        count: count[0]['count(*)'],
        blogList
    }
}


module.exports = { create, getBlogListByUser, getFollowersBlogList }