
const { isExist, register } = require('../../controller/user')

const router = require('koa-router')()
router.prefix('/api/user')

router.post('/register', async (ctx, next) => {
    const { userName, password, gender, nickName } = ctx.request.body
    ctx.body = await register({ userName, password, gender, nickName: nickName || userName })
})

router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
})

router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

module.exports = router