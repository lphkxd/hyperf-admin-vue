import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/system',
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'admin/member',
      name: `${pre}admin-member`,
      meta: { ...meta, cache: true, title: '管理成员' },
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
      path: 'article/article/view/:article_id',
      name: `${pre}article-article-view`,
      props: true,
      meta: { ...meta, title: '文章预览' },
      component: () => import('@/views/system/article/article/view')
    },
    {
      path: 'article/article/create',
      name: `${pre}article-article-create`,
      meta: { ...meta, cache: true, title: '新增文章' },
      component: () => import('@/views/system/article/article/create')
    },
    {
      path: 'article/article/update/:article_id',
      name: `${pre}article-article-update`,
      props: true,
      meta: { ...meta, cache: true, title: '编辑文章' },
      component: () => import('@/views/system/article/article/update')
    },
    {
      path: 'article/topic',
      name: `${pre}article-topic`,
      meta: { ...meta, cache: true, title: '专题管理' },
      component: () => import('@/views/system/article/topic')
    },
    {
      path: 'article/topic/view/:topic_id',
      name: `${pre}article-topic-view`,
      props: true,
      meta: { ...meta, title: '专题预览' },
      component: () => import('@/views/system/article/topic/view')
    },
    {
      path: 'article/topic/create',
      name: `${pre}article-topic-create`,
      meta: { ...meta, cache: true, title: '新增专题' },
      component: () => import('@/views/system/article/topic/create')
    },
    {
      path: 'article/topic/update/:topic_id',
      name: `${pre}article-topic-update`,
      props: true,
      meta: { ...meta, cache: true, title: '编辑专题' },
      component: () => import('@/views/system/article/topic/update')
    },
    {
      path: 'action/log',
      name: `${pre}action-log`,
      meta: { ...meta, cache: true, title: '日志记录' },
      component: () => import('@/views/system/action/log')
    },
    {
      path: 'ads/position',
      name: `${pre}ads-position`,
      meta: { ...meta, cache: true, title: '广告位置' },
      component: () => import('@/views/system/ads/position')
    },
    {
      path: 'ads/ads',
      name: `${pre}ads-ads`,
      meta: { ...meta, cache: true, title: '广告列表' },
      component: () => import('@/views/system/ads/ads')
    },
    {
      path: 'storage/style',
      name: `${pre}storage-style`,
      meta: { ...meta, cache: true, title: '资源样式' },
      component: () => import('@/views/system/storage/style')
    },
    {
      path: 'storage/storage',
      name: `${pre}storage-storage`,
      meta: { ...meta, cache: true, title: '资源管理' },
      component: () => import('@/views/system/storage/storage')
    }
  ])('system-')
}
