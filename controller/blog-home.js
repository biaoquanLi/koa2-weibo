const { getFollowersBlogList } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const PAGE_SIZE = 2
/**
 * 获取个人主页微博列表
 * @param {string} userName 用户名 
 * @param {number} pageIndex 当前页码
 */
async function getHomeBlogList(userId, pageIndex = 1) {
    const result = await getFollowersBlogList({
        userId,
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
module.exports = {
    getHomeBlogList
}