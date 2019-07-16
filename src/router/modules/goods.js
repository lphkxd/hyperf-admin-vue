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
    },
    {
      path: 'setting/category',
      name: `${pre}setting-category`,
      meta: { ...meta, cache: true, title: '商品分类' },
      component: () => import('@/views/goods/category')
    },
    {
      path: 'setting/brand',
      name: `${pre}setting-brand`,
      meta: { ...meta, cache: true, title: '商品品牌' },
      component: () => import('@/views/goods/brand')
    },
    {
      path: 'setting/type',
      name: `${pre}setting-type`,
      meta: { ...meta, cache: true, title: '商品模型' },
      component: () => import('@/views/goods/type')
    },
    {
      path: 'setting/spec',
      name: `${pre}setting-spec`,
      props: true,
      meta: { ...meta, title: '商品规格' },
      component: () => import('@/views/goods/spec')
    }
  ])('goods-')
}
