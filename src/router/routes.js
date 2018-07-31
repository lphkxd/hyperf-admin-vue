// layout
import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      {
        path: 'index',
        name: 'index',
        meta,
        component: () => import('@/views/index')
      },
      {
        path: '/views1',
        name: 'views1',
        component: () => import('@/views/page1'),
        meta: { meta, title: '页面 1' }
      },
      {
        path: '/views2',
        name: 'views2',
        component: () => import('@/views/page2'),
        meta: { meta, title: '页面 2' }
      },
      {
        path: '/views3',
        name: 'views3',
        component: () => import('@/views/page3'),
        meta: { meta, title: '页面 3' }
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登陆
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('@/views/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
