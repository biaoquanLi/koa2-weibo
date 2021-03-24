



const { SuccessModel, ErrorModel } = require('../model/resModel')
const { create } = require('../services/blog')
/**
 * 
 * @param {string}} userName 
 * @returns 
 */
async function createBlog({ userId, title, content, image }) {
    const result = await create({ userId, title, content, image })
    if (result.id) {
        return new SuccessModel()
    } else {
        return new ErrorModel()
    }
}

module.exports = {
    createBlog
}