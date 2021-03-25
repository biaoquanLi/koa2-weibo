const { loginCheck } = require('../../middlewares/loginChecks')
const router = require('koa-router')()
const { createBlog } = require('../../controller/blog')
const { getHomeBlogList } = require('../../controller/blog-home')
const { getBlogListStr } = require('../../utils/blog')
router.prefix('/api/blog')

router.post('/create', loginCheck, async (ctx, next) => {
    const { title, content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await createBlog({ userId, title, content, image })
})

//首页加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    let userId = ctx.session.userInfo.id
    pageIndex = parseInt(pageIndex)
    const result = await getHomeBlogList(userId, pageIndex)
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    ctx.body = result
})

module.exports = router