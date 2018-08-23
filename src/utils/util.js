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

export default util
