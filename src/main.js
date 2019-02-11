import Vue from 'vue'
import App from './App'

import store from '@/store'
import careyshop from '@/plugin/careyshop'

// 菜单和路由设置
import router from './router'
import { frameInRoutes } from '@/router/routes'

// 核心插件
Vue.use(careyshop)

// v-has
Vue.directive('has', {
  bind: function(el, binding) {
    if (!Vue.prototype.$has(binding.value)) {
      el.parentNode ? el.parentNode.removeChild(el) : el.style.display = 'none'
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('careyshop/page/init', frameInRoutes)
  },
  mounted() {
    // 展示系统信息
    this.$store.commit('careyshop/releases/versionShow')
    // 检查最新版本
    // this.$store.dispatch('careyshop/releases/checkUpdate')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('careyshop/account/load')
    // 获取并记录用户 UA
    this.$store.commit('careyshop/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('careyshop/fullscreen/listen')
  }
}).$mount('#app')
