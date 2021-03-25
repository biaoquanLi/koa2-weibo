/**
 * 博客相关的路由
 */
const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getHomeBlogList } = require('../../controller/blog-home')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans, followList } = require('../../controller/user-relation')
const { isExist } = require('../../controller/user')


router.get('/', loginRedirect, async (ctx, next) => {
    let userInfo = ctx.session.userInfo
    const userId = userInfo.id
    // 获取关注人微博第一页数据
    const result = await getHomeBlogList(userId, 1)
    let { isEmpty, blogList, pageSize, pageIndex, count } = result.data
    //获取粉丝
    const resultFans = await getFans(userId)
    const { fansList, fansCount } = resultFans.data

    //获取关注人
    const resultFollow = await followList(userId)
    const { followersList, followersCount } = resultFollow.data
    await ctx.render('index', {
        blogData: {
            isEmpty, blogList, pageSize, pageIndex, count
        },
        userData: {
            userInfo,
            fansList,
            fansCount,
            followersCount,
            followersList
        }
    })
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    const { userName: loginUserName } = ctx.session.userInfo
    const { userName: curUserName } = ctx.params
    let userInfo = ctx.session.userInfo
    const isMe = loginUserName === curUserName
    if (!isMe) { //不是当前用户登录
        const existResult = await isExist(curUserName)
        if (existResult.code !== 0) {
            return
        }
        userInfo = existResult.data
    }
    // 获取微博第一页数据
    const result = await getProfileBlogList(curUserName, 1)
    let { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    //获取粉丝
    const resultFans = await getFans(userInfo.id)
    const { fansList, fansCount } = resultFans.data


    const amIFollowed = fansList.some(item => {
        return item.userId = ctx.session.userInfo.id
    })

    //获取关注人
    const resultFollow = await followList(userInfo.id)
    const { followersList, followersCount } = resultFollow.data
    await ctx.render('profile', {
        blogData: {
            isEmpty, blogList, pageSize, pageIndex, count
        },
        userData: {
            userInfo,
            isMe,
            fansList,
            fansCount,
            amIFollowed,
            followersCount,
            followersList
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