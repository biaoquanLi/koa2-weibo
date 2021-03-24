const { exec } = require('../db/mysql')

const getUserByFollower = async (userId) => {
    let sqlList = `select * from userFollow join users on userFollow.userId=users.id where userFollow.followId='${userId}'`
    console.log('sql', sqlList)
    const res = await exec(sqlList)
    const fansList = JSON.parse(JSON.stringify(res))
    return {
        fansCount: fansList.length,
        fansList
    }
}

const addFollow = async (userId, followId) => {
    let sql = `insert into userFollow (userId,followId,createTime) values (${userId},${followId},now())`
    console.log('sql', sql)
    await exec(sql)
}
const deleteFollow = async (userId, followId) => {
    let sql = `delete from userFollow where userFollow.userId=${userId} and userFollow.followId=${followId}`
    console.log('sql', sql)
    await exec(sql)
}

const getFollowerByUser = async (userId) => {
    let sqlList = `select * from userFollow join users on userFollow.followId=users.id where userFollow.userId='${userId}'`
    console.log('sql', sqlList)
    const res = await exec(sqlList)
    const followersList = JSON.parse(JSON.stringify(res))
    return {
        followersCount: followersList.length,
        followersList
    }
}
module.exports = {
    getUserByFollower,
    addFollow,
    deleteFollow,
    getFollowerByUser
}