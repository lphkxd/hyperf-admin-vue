import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/order',
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      meta: { ...meta, cache: true, title: '订单首页' },
      component: () => import('@/views/order/index')
    }
  ])('order-')
}
