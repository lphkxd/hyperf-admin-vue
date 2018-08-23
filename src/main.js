import Vue from 'vue'
import App from './App'

import store from '@/store'
import careyshop from '@/plugin/careyshop'
import '@/mock'

// 菜单和路由设置
import router from './router'
import { menuHeader, menuAside } from '@/menu'
import { frameInRoutes } from '@/router/routes'

// 核心插件
Vue.use(careyshop)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('careyshop/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('careyshop/menu/headerSet', menuHeader)
  },
  mounted() {
    // 展示系统信息
    this.$store.commit('careyshop/releases/versionShow')
    // 检查最新版本
    this.$store.dispatch('careyshop/releases/checkUpdate')
    // 用户登陆后从数据库加载一系列的设置
    this.$store.commit('careyshop/account/load')
    // 获取并记录用户 UA
    this.$store.commit('careyshop/ua/get')
    // 初始化全屏监听
    this.$store.commit('careyshop/fullscreen/listen')
  },
  watch: {
    // 监听路由 控制侧边栏显示
    '$route.matched'(val) {
      const _side = menuAside.filter(menu => menu.path === val[0].path)
      this.$store.commit('careyshop/menu/asideSet', _side.length > 0 ? _side[0].children : [])
    }
  }
}).$mount('#app')
