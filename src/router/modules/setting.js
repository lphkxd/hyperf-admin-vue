import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/setting',
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      meta: { ...meta, cache: true, title: '设置首页' },
      component: () => import('@/views/setting/index')
    },
    {
      path: 'setting/system',
      name: `${pre}setting-system`,
      meta: { ...meta, cache: true, title: '系统设置' },
      component: () => import('@/views/setting/setting/system')
    },
    {
      path: 'setting/info',
      name: `${pre}setting-info`,
      meta: { ...meta, cache: true, title: '系统信息' },
      component: () => import('@/views/setting/setting/info')
    },
    {
      path: 'setting/navi',
      name: `${pre}setting-navi`,
      meta: { ...meta, cache: true, title: '前台导航' },
      component: () => import('@/views/setting/setting/navi')
    },
    {
      path: 'payment/config',
      name: `${pre}payment-config`,
      meta: { ...meta, cache: true, title: '支付配置' },
      component: () => import('@/views/setting/payment/config')
    },
    {
      path: 'payment/log',
      name: `${pre}payment-log`,
      meta: { ...meta, cache: true, title: '支付日志' },
      component: () => import('@/views/setting/payment/log')
    },
    {
      path: 'logistics/region',
      name: `${pre}logistics-region`,
      meta: { ...meta, cache: true, title: '区域管理' },
      component: () => import('@/views/setting/logistics/region')
    },
    {
      path: 'logistics/company',
      name: `${pre}logistics-company`,
      meta: { ...meta, cache: true, title: '快递公司' },
      component: () => import('@/views/setting/logistics/company')
    },
    {
      path: 'logistics/dist',
      name: `${pre}logistics-dist`,
      meta: { ...meta, cache: true, title: '配送轨迹' },
      component: () => import('@/views/setting/logistics/dist')
    },
    {
      path: 'logistics/delivery',
      name: `${pre}logistics-delivery`,
      meta: { ...meta, cache: true, title: '配送方式' },
      component: () => import('@/views/setting/logistics/delivery')
    },
    {
      path: 'logistics/delivery/area/:delivery_id/:delivery_item_id',
      name: `${pre}logistics-delivery-area`,
      props: true,
      meta: { ...meta, title: '配送区域' },
      component: () => import('@/views/setting/logistics/delivery-area')
    },
    {
      path: 'notice/template',
      name: `${pre}notice-template`,
      meta: { ...meta, cache: true, title: '消息模板' },
      component: () => import('@/views/setting/notice/template')
    }
  ])('setting-')
}
