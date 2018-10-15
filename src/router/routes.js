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
      { path: 'index', name: 'index', meta, component: () => import('@/views/index') }
    ]
  },
  {
    path: '/system',
    redirect: { name: 'system-admin-member' },
    component: layoutHeaderAside,
    children: (pre => [
      {
        path: 'admin/member',
        name: `${pre}admin-member`,
        meta: { ...meta, title: '管理员列表' },
        component: () => import('@/views/system/admin/member')
      },
      {
        path: 'auth/group',
        name: `${pre}auth-group`,
        meta: { ...meta, title: '用户组' },
        component: () => import('@/views/system/auth/group')
      },
      {
        path: 'auth/rule',
        name: `${pre}auth-rule`,
        meta: { ...meta, title: '权限规则' },
        component: () => import('@/views/system/auth/rule')
      },
      {
        path: 'auth/menu',
        name: `${pre}auth-menu`,
        meta: { ...meta, title: '菜单管理' },
        component: () => import('@/views/system/auth/menu')
      }
    ])('system-')
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 页面重定向使用 必须保留
  {
    path: '/redirect/:path*',
    component: {
      beforeCreate() {
        const path = this.$route.params.path
        this.$router.replace(JSON.parse(path))
      },
      render: function(h) {
        return h()
      }
    }
  },
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
