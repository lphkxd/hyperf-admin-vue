import log from './util.log.js'
import cookies from './util.cookies.js'

let util = {
  cookies,
  log
}

/**
 * @description 更新标题
 * @param {String} titleText 标题
 */
util.title = function(titleText) {
  window.document.title = `${titleText ? `${titleText} - ` : ''}${process.env.VUE_APP_TITLE}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function(url) {
  let a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'careyshop-menu-link')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('careyshop-menu-link'))
}

/**
 * 生成随机len位数字
 * @param len
 * @param date
 * @returns {string}
 */
util.randomLenNum = function(len, date) {
  let random
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4)
  if (date) random = random + Date.now()
  return random
}

/**
 * MD5加密
 * @param str
 * @returns {*}
 */
util.md5 = function(str) {
  let crypto = require('crypto')
  let md5 = crypto.createHash('md5')

  md5.update(str)
  return md5.digest('hex')
}

/**
 * 将任意对象转化为树
 * @param data
 * @param key
 * @param pid
 * @returns {Array}
 */
util.formatDataToTree = function(data, key = 'menu_id', pid = 'parent_id') {
  let map = {}
  data.forEach(value => {
    map[value[key]] = { ...value }
  })

  let tree = []
  for (let id in data) {
    if (!data.hasOwnProperty(id)) {
      continue
    }

    // 对应索引
    const index = data[id][key]

    // 子节点压入
    if (map[index][pid]) {
      if (!map[map[index][pid]].hasOwnProperty('children')) {
        map[map[index][pid]]['children'] = []
      }

      map[map[index][pid]]['children'].push(map[index])
      continue
    }

    tree.push(map[index])
  }

  return tree
}

export default util
