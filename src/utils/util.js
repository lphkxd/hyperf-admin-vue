import Cookies from 'vue-cookies'
import UaParser from 'ua-parser-js'
import { version } from '../../package.json'

let util = {
  cookies: {}
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
  window.document.title = `${process.env.VUE_APP_TITLE}${titleText ? ` | ${titleText}` : ''}`
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
 * @description 打印一个 “胶囊” 样式的信息
 * @param {String} title title text
 * @param {String} info info text
 */
util.logCapsule = function(title, info) {
  console.log(
    `%c ${title} %c ${info} %c`,
    'background:#29384b; padding: 1px; border-radius: 3px 0 0 3px; color: #fff',
    'background:#3488ff; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
    'background:transparent'
  )
}

/**
 * @description 显示版本信息
 */
util.showInfo = function showInfo() {
  util.logCapsule('careyshop-admin', `v${version}`)
  console.log('Github https://github.com/dnyz520/careyshop-admin')
  console.log('Doc    https://doc.careyshop.cn/')
}

export default util
