import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/member',
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      meta: { ...meta, cache: true, title: '会员首页' },
      component: () => import('@/views/member/index')
    },
    {
      path: 'user/client',
      name: `${pre}user-client`,
      meta: { ...meta, cache: true, title: '会员账号' },
      component: () => import('@/views/member/user/client')
    },
    {
      path: 'user/withdraw/:client_id',
      name: `${pre}user-withdraw`,
      props: true,
      meta: { ...meta, title: '提现账户' },
      component: () => import('@/views/member/user/withdraw')
    },
    {
      path: 'user/address/:client_id',
      name: `${pre}user-address`,
      props: true,
      meta: { ...meta, title: '收货地址' },
      component: () => import('@/views/member/user/address')
    },
    {
      path: 'user/level',
      name: `${pre}user-level`,
      meta: { ...meta, cache: true, title: '账号等级' },
      component: () => import('@/views/member/user/level')
    },
    {
      path: 'user/transaction',
      name: `${pre}user-transaction`,
      meta: { ...meta, cache: true, title: '交易结算' },
      component: () => import('@/views/member/user/transaction')
    },
    {
      path: 'withdraw/list',
      name: `${pre}withdraw-list`,
      meta: { ...meta, cache: true, title: '提现列表' },
      component: () => import('@/views/member/withdraw/list')
    },
    {
      path: 'ask/list',
      name: `${pre}ask-list`,
      meta: { ...meta, cache: true, title: '问答列表' },
      component: () => import('@/views/member/ask/list')
    },
    {
      path: 'ask/detail/:ask_id',
      name: `${pre}ask-detail`,
      props: true,
      meta: { ...meta, cache: true, title: '问答明细' },
      component: () => import('@/views/member/ask/detail')
    }
  ])('member-')
}
