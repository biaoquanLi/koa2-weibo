// const { getBlogListByUser } = require('../services/blog')
const { getSquareCacheList } = require('../cache/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const PAGE_SIZE = 2
/**
 * 获取广场微博列表
 * @param {number} pageIndex 当前页码
 */
async function getSquareBlogList(pageIndex = 1) {
    const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
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
    getSquareBlogList
}