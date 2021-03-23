const { loginCheck } = require('../../middlewares/loginChecks')
const router = require('koa-router')()
const { createBlog } = require('../../controller/blog')
router.prefix('/api/blog')

router.post('/create', loginCheck, async (ctx, next) => {
    const { title, content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await createBlog({ userId, title, content, image })
})



module.exports = router