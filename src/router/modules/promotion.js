import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/promotion',
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      meta: { ...meta, cache: true, title: '营销首页' },
      component: () => import('@/views/promotion/index')
    }
  ])('promotion-')
}
