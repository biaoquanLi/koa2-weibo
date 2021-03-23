const { set, get } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

const KEY_PREFIX = 'weibo:square'

async function getSquareCacheList(pageIndex, pageSize) {
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

    const cacheResult = await get(key)
    if (cacheResult != null) {
        return cacheResult
    }

    const result = await getBlogListByUser({ pageIndex, pageSize })

    set(key, result, 60)

    return result
}

module.exports = {
    getSquareCacheList
}