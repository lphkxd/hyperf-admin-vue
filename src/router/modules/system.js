import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/system',
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      meta: { ...meta, cache: true, title: '系统首页' },
      component: () => import('@/views/system/index')
    },
    {
      path: 'admin/member',
      name: `${pre}admin-member`,
      meta: { ...meta, cache: true, title: '管理人员' },
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
      path: 'auth/action',
      name: `${pre}auth-action`,
      meta: { ...meta, cache: true, title: '操作日志' },
      component: () => import('@/views/system/auth/action')
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
    },
    {
      path: 'message/user',
      name: `${pre}message-user`,
      meta: { ...meta, cache: true, title: '我的消息' },
      component: () => import('@/views/system/message/user')
    },
    {
      path: 'message/send',
      name: `${pre}message-send`,
      meta: { ...meta, cache: true, title: '发布消息' },
      component: () => import('@/views/system/message/send')
    },
    {
      path: 'message/send/view/:message_id',
      name: `${pre}message-send-view`,
      props: true,
      meta: { ...meta, title: '消息预览' },
      component: () => import('@/views/system/message/send/view')
    },
    {
      path: 'message/user/view/:message_id',
      name: `${pre}message-user-view`,
      props: true,
      meta: { ...meta, title: '消息预览' },
      component: () => import('@/views/system/message/user/view')
    },
    {
      path: 'aided/support',
      name: `${pre}aided-support`,
      meta: { ...meta, cache: true, title: '客服人员' },
      component: () => import('@/views/system/aided/support')
    },
    {
      path: 'aided/friendlink',
      name: `${pre}aided-friendlink`,
      meta: { ...meta, cache: true, title: '友情链接' },
      component: () => import('@/views/system/aided/friendlink')
    },
    {
      path: 'aided/app',
      name: `${pre}aided-app`,
      meta: { ...meta, cache: true, title: 'App应用' },
      component: () => import('@/views/system/aided/app')
    },
    {
      path: 'aided/app_install',
      name: `${pre}aided-app_install`,
      meta: { ...meta, cache: true, title: 'App安装包' },
      component: () => import('@/views/system/aided/app_install')
    },
    {
      path: 'aided/qrcode',
      name: `${pre}aided-qrcode`,
      meta: { ...meta, cache: true, title: '二维码' },
      component: () => import('@/views/system/aided/qrcode')
    }
  ])('system-')
}
