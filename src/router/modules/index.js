import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
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
          next(instance => instance.$router.replace(from.fullPath))
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
          next(instance => instance.$router.replace(JSON.parse(from.params.route)))
        },
        render: h => h()
      }
    }
  ]
}
