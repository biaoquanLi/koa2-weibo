const { ErrorModel } = require('../model/resModel')

async function loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        await next()
        return
    }
    ctx.body = new ErrorModel({
        errno: 10005,
        message: '您尚未登录'
    })
}

async function loginRedirect(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        await next()
        return
    }
    const curUrl = ctx.url
    ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}
module.exports = {
    loginCheck,
    loginRedirect
}