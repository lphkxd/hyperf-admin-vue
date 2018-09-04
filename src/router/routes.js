import layoutHeaderAside from '@/layout/header-aside'

export const meta = { requiresAuth: true }

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
      }
    ]
  }
  // {
  //   path: '/system',
  //   name: 'system',
  //   meta,
  //   redirect: { name: 'system-admin-member' },
  //   component: layoutHeaderAside,
  //   children: [
  //     {
  //       path: 'admin/member',
  //       name: 'system-admin-member',
  //       meta: { ...meta, title: '管理员列表' },
  //       component: () => import('@/views/system/test')
  //     }
  //   ]
  // }
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
