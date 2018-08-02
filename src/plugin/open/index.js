export default {
  install(Vue, options) {
    // 打开一个url
    Vue.prototype.$open = (url = 'https://www.careyshop.cn') => {
      window.open(url)
    }
  }
}
