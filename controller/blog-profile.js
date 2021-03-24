const { getBlogListByUser } = require('../services/blog')
const { addFollow, deleteFollow } = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const PAGE_SIZE = 2
/**
 * 获取个人主页微博列表
 * @param {string} userName 用户名 
 * @param {number} pageIndex 当前页码
 */
async function getProfileBlogList(userName, pageIndex = 1) {
    const result = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize: PAGE_SIZE
    })
    const { blogList, count } = result
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

async function follow(userId, followId) {
    try {
        await addFollow(userId, followId)
        return new SuccessModel()
    } catch (error) {
        return new ErrorModel({
            code: 10011,
            message: '添加关注失败'
        })
    }
}
async function unFollow(userId, followId) {
    try {
        await deleteFollow(userId, followId)
        return new SuccessModel()
    } catch (error) {
        return new ErrorModel({
            code: 10012,
            message: '取消关注失败'
        })
    }
}


module.exports = {
    getProfileBlogList,
    follow,
    unFollow
}