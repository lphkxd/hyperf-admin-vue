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
        path: '/page1',
        name: 'page1',
        component: () => import('@/views/page1'),
        meta: { meta, title: '页面 1' },
        children: [
          { path: 'page1-1', name: 'page1-1', component: () => import('@/views/page1-1'), meta: { meta, title: '页面 1-1' }},
          { path: 'page1-2', name: 'page1-2', component: () => import('@/views/page1-2'), meta: { meta, title: '页面 1-2' }},
          { path: 'page1-3', name: 'page1-3', component: () => import('@/views/page1-3'), meta: { meta, title: '页面 1-3' }}
        ]
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
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
