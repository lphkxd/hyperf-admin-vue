const meta = { requiresAuth: true }

/**
 * 在主框架内显示
 */
const frameIn = [
  // 首页
  {
    path: '/',
    redirect: { name: 'index' },
    component: () => import('@/components/LayoutMain'),
    children: [
      {
        path: 'index',
        name: 'index',
        meta,
        component: () => import('@/views/index')
      }
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    meta,
    redirect: { name: 'setting-index' },
    component: () => import('@/components/LayoutMain'),
    children: (pre => [
      {
        path: 'index',
        name: `${pre}index`,
        component: () => import('@/views/setting/index'),
        meta: {
          ...meta,
          title: '设置首页'
        }
      },
      {
        path: 'releases',
        name: `${pre}releases`,
        component: () => import('@/views/setting/releases'),
        meta: {
          ...meta,
          title: '版本'
        }
      }
    ])('setting-')
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
    component: () => import('@/views/404')
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

