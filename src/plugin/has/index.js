export default {
  install(Vue, options) {
    Vue.prototype.$has = function(path) {
      return true
    }
  }
}
