/**
 * 博客相关的路由
 */
const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')


router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index')
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    // const { userName: loginUserName } = ctx.session.userInfo
    const { userName: curUserName } = ctx.params
    const userInfo = ctx.session.userInfo
    // if (loginUserName === curUserName) { //是当前用户登录

    // } else {

    // }

    const result = await getProfileBlogList(curUserName, 1)
    let { isEmpty, blogList, pageSize, pageIndex, count } = result.data
    await ctx.render('profile', {
        blogData: {
            isEmpty, blogList, pageSize, pageIndex, count
        },
        userData: {
            userInfo
        }
    })

})

router.get('/square', loginRedirect, async (ctx, next) => {
    const result = await getSquareBlogList(1)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || []
    await ctx.render('square', {
        blogData: {
            isEmpty, blogList, pageSize, pageIndex, count
        }
    })
})



module.exports = router