

const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
/**
 * 
 * @param {string}} userName 
 * @returns 
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo.userName) {
        return new SuccessModel(userInfo)
    } else {
        return new ErrorModel({
            code: 10003,
            message: '用户名未存在'
        })
    }
}

async function register({ userName, password, gender, nickName }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo.userName) {
        return new ErrorModel({
            errno: 10001,
            message: '用户名已存在'

        })
    } else {
        try {
            await createUser({ userName, password, gender, nickName })
            return new SuccessModel()
        } catch (error) {
            return new ErrorModel({
                errno: 10002,
                message: '注册失败，请重试'
            })
        }
    }
}

module.exports = {
    isExist,
    register
}