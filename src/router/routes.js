import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页 必须 name:index
      {
        path: 'index',
        name: 'index',
        meta,
        component: () => import('@/views/index')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: {
          beforeRouteEnter(to, from, next) {
            next(vm => vm.$router.replace(from.fullPath))
          },
          render: h => h()
        }
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: {
          beforeRouteEnter(to, from, next) {
            next(vm => vm.$router.replace(JSON.parse(from.params.route)))
          },
          render: h => h()
        }
      }
    ]
  },
  {
    path: '/system',
    component: layoutHeaderAside,
    children: (pre => [
      {
        path: 'admin/member',
        name: `${pre}admin-member`,
        meta: { ...meta, cache: true, title: '管理员列表' },
        component: () => import('@/views/system/admin/member')
      },
      {
        path: 'auth/group',
        name: `${pre}auth-group`,
        meta: { ...meta, cache: true, title: '用户组' },
        component: () => import('@/views/system/auth/group')
      },
      {
        path: 'auth/rule',
        name: `${pre}auth-rule`,
        meta: { ...meta, cache: true, title: '权限规则' },
        component: () => import('@/views/system/auth/rule')
      },
      {
        path: 'auth/menu',
        name: `${pre}auth-menu`,
        meta: { ...meta, cache: true, title: '菜单管理' },
        component: () => import('@/views/system/auth/menu')
      },
      {
        path: 'action/log',
        name: `${pre}action-log`,
        meta: { ...meta, cache: true, title: '日志记录' },
        component: () => import('@/views/system/action/log')
      },
      {
        path: 'article/cat',
        name: `${pre}article-cat`,
        meta: { ...meta, cache: true, title: '文章分类' },
        component: () => import('@/views/system/article/cat')
      },
      {
        path: 'article/article',
        name: `${pre}article-article`,
        meta: { ...meta, cache: true, title: '文章管理' },
        component: () => import('@/views/system/article/article')
      },
      {
        path: 'article/preview/:article_id',
        name: `${pre}article-preview`,
        props: true,
        meta: { ...meta, title: '文章预览' },
        component: () => import('@/views/system/article/article/preview')
      },
      {
        path: 'article/topic',
        name: `${pre}article-topic`,
        meta: { ...meta, cache: true, title: '专题管理' },
        component: () => import('@/views/system/article/topic')
      }
    ])('system-')
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
