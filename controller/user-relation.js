const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getUserByFollower, getFollowerByUser } = require('../services/user-relation')
/**
 * 
 * @param {number}} userId
 * @returns 
 */
async function getFans(userId) {
    const { fansCount, fansList } = await getUserByFollower(userId)
    return new SuccessModel({
        fansList,
        fansCount
    })
}
async function followList(userId) {
    const { followersCount, followersList } = await getFollowerByUser(userId)
    return new SuccessModel({
        followersList,
        followersCount
    })
}


module.exports = {
    getFans,
    followList,
    followList
}