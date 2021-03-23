

const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

const BLOG_LIST_TPL = fs.readFileSync(path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')).toString()

function getBlogListStr(blogList = [], user, canReply = false) {
    return ejs.render(BLOG_LIST_TPL, { blogList, user, canReply })
}

module.exports = {
    getBlogListStr
}