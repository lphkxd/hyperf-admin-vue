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
util.randomLenNum = function randomLenNum(len, date) {
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
util.md5 = function md5(str) {
  let crypto = require('crypto')
  let md5 = crypto.createHash('md5')

  md5.update(str)
  return md5.digest('hex')
}

export default util
