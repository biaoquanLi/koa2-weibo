const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const koaStatic = require('koa-static')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const path = require('path')
const {
  REDIS_CONF
} = require('./config/db')
const { SESSION_SECRET_KEY } = require('./config/secretKey')

const squareAPIRouter = require('./routes/api/blog-square')
const profileAPIRouter = require('./routes/api/blog-profile')
const blogHomeViewRouter = require('./routes/view/blog')
const blogApiRouter = require('./routes/api/blog')
const userViewRouter = require('./routes/view/user')
const userApiRouter = require('./routes/api/user')
const utilsApiRouter = require('./routes/api/utils')
const errorViewRouter = require('./routes/view/error')

// error handler
let onerrorConf = {}
onerrorConf = {
  redirect: '/error'
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(__dirname + '/uploadFiles'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.keys = [SESSION_SECRET_KEY]
app.use(session(
  //配置cookie
  {
    key: 'weibo.sid', // cookie name 默认是 `koa.sid`
    prefix: 'weibo:sess:', // redis key 的前缀，默认是 `koa:sess:`
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
  }
))

// routes
app.use(squareAPIRouter.routes(), squareAPIRouter.allowedMethods())
app.use(profileAPIRouter.routes(), profileAPIRouter.allowedMethods())
app.use(blogHomeViewRouter.routes(), blogHomeViewRouter.allowedMethods())
app.use(blogApiRouter.routes(), blogApiRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404路由要注册在最后面

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
