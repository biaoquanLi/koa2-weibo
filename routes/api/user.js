
const { isExist, register, login, changeInfo, changePassword, loginOut } = require('../../controller/user')
const { loginCheck } = require('../../middlewares/loginChecks')
const router = require('koa-router')()
router.prefix('/api/user')

router.post('/register', async (ctx, next) => {
    const { userName, password, gender, nickName } = ctx.request.body
    ctx.body = await register({ userName, password, gender, nickName: nickName || userName })
})

router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login(ctx, userName, password)
})

router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

router.patch('/changeInfo', loginCheck, async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    ctx.body = await changeInfo({ ctx, nickName, city, picture })
})

router.patch('/changePassword', loginCheck, async (ctx, next) => {
    const { password, newPassword } = ctx.request.body
    const userName = ctx.session.userInfo.userName
    ctx.body = await changePassword(userName, password, newPassword)
})

router.post('/logout', loginCheck, async (ctx, next) => {
    ctx.body = await loginOut(ctx)
})

module.exports = router