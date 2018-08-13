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
  // 验证当前路由所有的匹配中是否需要有登陆验证的
  if (to.matched.some(r => r.meta.requiresAuth)) {
    // 这里暂时将cookie里是否存有token作为验证是否登陆的条件
    const token = util.cookies.get('token')
    if (token && token !== 'undefined') {
      next()
    } else {
      // 没有登陆的时候跳转到登陆界面
      next({ name: 'login' })
      NProgress.done()
    }
  } else {
    // 不需要身份校验 直接通过
    next()
    NProgress.done()
  }
})

router.afterEach(to => {
  // 需要的信息
  const app = router.app
  const { name, params, query } = to
  // 多页控制 打开新的页面
  app.$store.commit('pageOpenNew', { name, params, query })
  // 更改标题
  util.title(to.meta.title)
  NProgress.done()
})

export default router
