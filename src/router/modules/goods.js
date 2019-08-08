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
    },
    {
      path: 'setting/attribute',
      name: `${pre}setting-attribute`,
      props: true,
      meta: { ...meta, title: '商品属性' },
      component: () => import('@/views/goods/attribute')
    },
    {
      path: 'opinion/consult',
      name: `${pre}opinion-consult`,
      meta: { ...meta, cache: true, title: '商品咨询' },
      component: () => import('@/views/goods/consult/list')
    },
    {
      path: 'opinion/consult/detail/:goods_consult_id',
      name: `${pre}opinion-consult-detail`,
      props: true,
      meta: { ...meta, cache: true, title: '咨询明细' },
      component: () => import('@/views/goods/consult/detail')
    },
    {
      path: 'opinion/comment',
      name: `${pre}opinion-comment`,
      meta: { ...meta, cache: true, title: '商品评价' },
      component: () => import('@/views/goods/comment/list')
    },
    {
      path: 'opinion/comment/detail/:goods_comment_id',
      name: `${pre}opinion-comment-detail`,
      props: true,
      meta: { ...meta, cache: true, title: '评价明细' },
      component: () => import('@/views/goods/comment/detail')
    }
  ])('goods-')
}
