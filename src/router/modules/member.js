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
      path: 'user/level',
      name: `${pre}user-level`,
      meta: { ...meta, cache: true, title: '账号等级' },
      component: () => import('@/views/member/user/level')
    },
    {
      path: 'withdraw/list',
      name: `${pre}withdraw-list`,
      meta: { ...meta, cache: true, title: '提现列表' },
      component: () => import('@/views/member/withdraw/list')
    }
  ])('member-')
}
