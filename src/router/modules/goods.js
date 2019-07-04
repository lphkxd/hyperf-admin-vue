import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/goods',
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      meta: { ...meta, cache: true, title: '商品首页' },
      component: () => import('@/views/goods/index')
    }
  ])('goods-')
}
