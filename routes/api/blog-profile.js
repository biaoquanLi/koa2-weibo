const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList, follow, unFollow } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')
router.prefix('/api/profile')
//加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let { userName, pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    const result = await getProfileBlogList(userName, pageIndex)
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    ctx.body = result
})

//关注
router.post('/follow', loginCheck, async (ctx, next) => {
    const userId = ctx.session.userInfo.id
    const followId = ctx.request.body.userId
    ctx.body = await follow(userId, followId)
})

//取消关注
router.post('/unFollow', loginCheck, async (ctx, next) => {
    const userId = ctx.session.userInfo.id
    const followId = ctx.request.body.userId
    ctx.body = await unFollow(userId, followId)
})

module.exports = router