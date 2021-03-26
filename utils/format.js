const {timeFormat} = require('../utils/dt')

/**
 * 格式化时间
 */
function formatTime(obj){
    obj.createTime = timeFormat(obj.createTime)
    return obj
}

/**
 * 格式化微博内容
 * @param {Object} obj 微博数据对象
 */
 function _formatContent(obj) {
    obj.contentFormat = obj.content

    // 格式化 @
    // from '哈喽 @张三 - zhangsan 你好'
    // to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
    obj.contentFormat = obj.contentFormat.replace(
        /@(.+?)\s-\s(\w+?)\b/g,
        (matchStr, nickName, userName) => {
            return `<a href="/profile/${userName}">@${nickName}</a>`
        }
    )

    return obj
}

/**
 * 格式化微博信息
 * @param {Array|Object} list 微博列表或者单个微博对象
 */
 function formatBlog(list) {
    if (list == null) {
        return list
    }

    if (list instanceof Array) {
        // 数组
        return list.map(formatTime).map(_formatContent)
    }
    // 对象
    let result = list
    result = formatTime(result)
    result = _formatContent(result)
    return result
}


module.exports = {
    formatBlog
}