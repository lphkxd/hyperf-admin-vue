import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'
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
router.beforeEach(async(to, from, next) => {
  // 确认已经加载多标签页数据
  await store.dispatch('careyshop/page/isLoaded')

  // 确认已经加载组件尺寸设置
  await store.dispatch('careyshop/size/isLoaded')

  // 进度条
  NProgress.start()

  const token = util.cookies.get('token')
  if (token) {
    store.commit('careyshop/search/set', false)
  }

  // 检测当前路由是否需要验证
  if (to.matched.some(r => r.meta.auth)) {
    if (token && token !== 'undefined') {
      next()
    } else {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
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
  // 进度条
  NProgress.done()
  // 多页控制 打开新的页面
  store.dispatch('careyshop/page/open', to)
  // 更改标题
  util.title(to.meta.title)
})

export default router
