import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'

let util = {
  cookies,
  db,
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
  a.setAttribute('id', 'careyshop-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('careyshop-link-temp'))
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
      if (!map[map[index][pid]]) {
        continue
      }

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

/**
 * 字符计量大小转换为字节大小
 * @param val
 * @returns {number}
 */
util.stringToByte = function(val) {
  const exp = '(^[0-9\\.]+)(\\w+)'
  const result = val.match(exp)

  const size = result[1]
  const suffix = result[2].toLocaleUpperCase()

  const a = { 'B': 0, 'KB': 1, 'MB': 2, 'GB': 3, 'TB': 4, 'PB': 5 }
  const b = { 'B': 0, 'K': 1, 'M': 2, 'G': 3, 'T': 4, 'P': 5 }

  const pos = a.hasOwnProperty(suffix) && a[suffix] !== 0 ? a[suffix] : b[suffix]
  return Math.round(size * Math.pow(1024, pos))
}

/**
 * 生成 GUID
 * @returns {string}
 */
util.guid = function() {
  let s = []
  const hexDigits = '0123456789abcdef'

  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }

  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  return s.join('')
}

/**
 * 签名生成
 * @param params
 * @returns {*}
 */
util.getSign = function(params) {
  let sorted = Object.keys(params).sort()
  let basestring = process.env.VUE_APP_SECRET
  const type = ['undefined', 'object', 'function']

  for (let i = 0, l = sorted.length; i < l; i++) {
    if (sorted[i] === 'sign') {
      continue
    }

    let k = sorted[i]
    if (type.indexOf(typeof params[k]) === -1) {
      basestring += k + params[k]
    }
  }

  basestring += process.env.VUE_APP_SECRET
  return util.md5(basestring)
}

/**
 * 根据样式编码获取缩略图地址
 * @param url
 * @param code
 * @returns {string}
 */
util.getImageCodeUrl = function(url, code) {
  let data = process.env.VUE_APP_BASE_API
  data += '/v1/storage/method/get.storage.thumb/code/' + code
  data += '?url=' + encodeURI(url)

  return data
}

export default util
