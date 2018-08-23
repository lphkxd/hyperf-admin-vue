import Vue from 'vue'
import VueRouter from 'vue-router'

import util from '@/utils/util'
import routes from './routes'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)
NProgress.configure({ showSpinner: false })

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes
})

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = util.cookies.get('token')

  // 检测当前路由是否需要验证
  if (to.matched.some(r => r.meta.requiresAuth)) {
    if (token) {
      /**
       * 检测当前菜单源数据是否已处理,如果未处理则先获取.
       * 之后处理路由,顶部菜单,侧边菜单.
       * 该数据在每次用户登录成功后需要清空,以触发该模块的激活
       */
      // const state = router.app.$store
      // if (state.state.careyshop.menuSource.length === 0) {
      //   console.log('模拟处理菜单')
      //   state.state.careyshop.menuSource = ['ok']
      // }
      next()
    } else {
      next({ name: 'login' })
      NProgress.done()
    }
  } else {
    // 不需要验证路由直接访问
    if (token && to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  }
})

router.afterEach(to => {
  // 需要的信息
  const app = router.app
  const { name, params, query } = to
  // 多页控制 打开新的页面
  app.$store.commit('careyshop/page/open', { name, params, query })
  // 更改标题
  util.title(to.meta.title)
  NProgress.done()
})

export default router
