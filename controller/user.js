

const { getUserInfo, createUser, updateUser, updatePassword } = require('../services/user')
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
/**
 * 
 * @param {Object} ctx 
 * @param {string} userName 
 * @param {string} password 
 * @returns 
 */
async function login(ctx, userName, password) {
    const userInfo = await getUserInfo(userName, password)
    if (!userInfo.userName) {
        // 登录失败
        return new ErrorModel({
            code: 10004,
            message: '登录失败，用户名或密码错误'
        })
    }
    console.log(111, ctx.session.userInfo, userInfo)
    if (!ctx.session.userInfo) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

async function changeInfo({ ctx, nickName, city, picture }) {
    const userInfo = ctx.session.userInfo
    if (!nickName) {
        nickName = userInfo.userName
    }
    const data = await updateUser(ctx, { nickName, city, picture })
    if (data.affectedRows > 0) {
        ctx.session.userInfo = { ...userInfo, nickName, city, picture }
        return new SuccessModel()
    } else {
        return ErrorModel({
            code: 10008,
            message: '修改基本信息失败'
        })
    }
}

async function changePassword(userName, password, newPassword) {
    const data = await updatePassword(userName, password, newPassword)
    if (data.affectedRows > 0) {
        return new SuccessModel()
    } else {
        return ErrorModel({
            code: 10006,
            message: '修改密码失败，请重试'
        })
    }
}

async function loginOut(ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
}

module.exports = {
    isExist,
    register,
    login,
    changeInfo,
    changePassword,
    loginOut
}