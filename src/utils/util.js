import Cookies from 'vue-cookies'
import UaParser from 'ua-parser-js'
import { version } from '../../package.json'

let util = {
  cookies: {},
  log: {}
}

/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 */
util.cookies.set = function(name = 'default', value = '', setting = {}) {
  let cookieSetting = {
    expires: 1
  }
  Object.assign(cookieSetting, setting)
  Cookies.set(`careyshop-${version}-${name}`, value, cookieSetting)
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
util.cookies.get = function(name = 'default') {
  return Cookies.get(`careyshop-${version}-${name}`)
}

/**
 * @description 拿到 cookie 全部的值
 */
util.cookies.getAll = function() {
  return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
util.cookies.remove = function(name = 'default') {
  return Cookies.remove(`careyshop-${version}-${name}`)
}

/**
 * @description 更新标题
 * @param {String} titleText 标题
 */
util.title = function(titleText) {
  window.document.title = `${titleText ? `${titleText} - ` : ''}${process.env.VUE_APP_TITLE}`
}

/**
 * @description 获取所有的 UA 信息
 */
util.ua = function() {
  return new UaParser().getResult()
}

/**
 * @description 判断是否在其内
 * @param {*} ele element
 * @param {Array} targetArr array
 */
util.isOneOf = function(ele, targetArr) {
  return targetArr.indexOf(ele) >= 0
}

/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | text ]
 */
util.typeColor = function(type = 'default') {
  let color = ''
  switch (type) {
    case 'default': color = '35495E'; break
    case 'primary': color = '#3488ff'; break
    case 'success': color = '#43B883'; break
    case 'warning': color = '#e6a23c'; break
    case 'danger': color = '#f56c6c'; break
    default:
      break
  }
  return color
}

/**
 * @description 打印一个 “胶囊” 样式的信息
 * @param {String} title title text
 * @param {String} info info text
 * @param {String} type style
 */
util.log.capsule = function(title, info, type = 'primary') {
  console.log(
    `%c ${title} %c ${info} %c`,
    'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
    `background:${util.typeColor(type)}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
    'background:transparent'
  )
}

/**
 * @description 打印彩色文字
 */
util.log.colorful = function(textArr) {
  console.log(
    `%c ${textArr.map(t => t.text).join(' %c ')}`,
    ...textArr.map(t => `color: ${util.typeColor(t.type)};`)
  )
}

/**
 * @description 打印 primary 样式的文字
 */
util.log.primary = function(text) {
  util.log.colorful([{ text, type: 'primary' }])
}

/**
 * @description 打印 success 样式的文字
 */
util.log.success = function(text) {
  util.log.colorful([{ text, type: 'success' }])
}

/**
 * @description 打印 warning 样式的文字
 */
util.log.warning = function(text) {
  util.log.colorful([{ text, type: 'warning' }])
}

/**
 * @description 打印 danger 样式的文字
 */
util.log.danger = function(text) {
  util.log.colorful([{ text, type: 'danger' }])
}

/**
 * @description 显示版本信息
 */
util.showInfo = function showInfo() {
  util.log.capsule('CareyShop', `v${version}`)
  console.log('Github https://github.com/dnyz520/careyshop-admin')
  console.log('Doc    https://doc.careyshop.cn/')
}

/**
 * 生成随机len位数字
 */
util.randomLenNum = function randomLenNum(len, date) {
  let random
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4)
  if (date) random = random + Date.now()
  return random
}

/**
 * MD5加密
 */
util.md5 = function md5(str) {
  let crypto = require('crypto')
  let md5 = crypto.createHash('md5')

  md5.update(str)
  return md5.digest('hex')
}

export default util
