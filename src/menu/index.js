// 菜单 顶栏
export const menuHeader = [
  {
    path: '/index',
    title: '首页',
    icon: 'home'
  },
  {
    /* path: '/goods', */
    title: '商品',
    icon: 'cart-plus'
  },
  {
    /* path: '/order',*/
    title: '订单',
    icon: 'barcode'
  },
  {
    /* path: '/promotion',*/
    title: '营销',
    icon: 'credit-card'
  },
  {
    /* path: '/member',*/
    title: '会员',
    icon: 'user-o'
  },
  {
    /* path: '/system',*/
    title: '系统',
    icon: 'server'
  },
  {
    /* path: '/setting',*/
    title: '设置',
    icon: 'cogs'
  },
  {
    /* path: '/cloud',*/
    title: '云端',
    icon: 'cloud'
  }
]

// 菜单 侧边栏
export const menuAside = [
  {
    path: '/system',
    title: '系统',
    children: [
      {
        title: '人员管理',
        children: [
          { title: '管理员列表' }
        ]
      },
      {
        title: '权限分配',
        children: [
          { title: '用户组' },
          { title: '权限规则' },
          { title: '菜单管理' }
        ]
      }
    ]
  }
]
