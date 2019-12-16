import Cookies from 'js-cookie'

const cookies = {}

/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} cookieSetting cookie setting
 */
cookies.set = (name = 'default', value = '', cookieSetting = {}) => {
  let currentCookieSetting = { expires: 1 }
  Object.assign(currentCookieSetting, cookieSetting)
  Cookies.set(`careyshop-${process.env.VUE_APP_VERSION}-${name}`, value, currentCookieSetting)
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
cookies.get = (name = 'default') => {
  return Cookies.get(`careyshop-${process.env.VUE_APP_VERSION}-${name}`)
}

/**
 * @description 拿到 cookie 全部的值
 */
cookies.getAll = () => {
  return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
cookies.remove = (name = 'default') => {
  return Cookies.remove(`careyshop-${process.env.VUE_APP_VERSION}-${name}`)
}

export default cookies
