const fse = require('fs-extra')
const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/resModel')
const MIX_SIZE = 1024 * 1024 * 1024
const DIST_FOLDER_PATH = path.join(__dirname, '..', 'uploadFiles')
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

async function saveFile({ name, type, size, filePath }) {
    if (size > MIX_SIZE) {
        await fse.remove(filePath)
        return new ErrorModel({
            code: 10007,
            message: '上传文件尺寸过大'
        })
    }
    const fileName = Date.now() + '.' + name

    const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
    await fse.move(filePath, distFilePath)
    return new SuccessModel({
        code: 0,
        url: '/' + fileName
    })

}


module.exports = {
    saveFile
}