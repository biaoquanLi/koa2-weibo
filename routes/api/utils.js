
const router = require('koa-router')()
const koaForm = require('formidable-upload-koa')
const { loginRedirect } = require('../../middlewares/loginChecks')
const { saveFile } = require('../../controller/utils')
router.prefix('/api/utils')

router.post('/upload', loginRedirect, koaForm(), async (ctx, next) => {
    const file = ctx.req.files['file']
    const { size, path, name, type } = file
    console.log(111, file)
    ctx.body = await saveFile({ name, type, size, filePath: path })
})

module.exports = router