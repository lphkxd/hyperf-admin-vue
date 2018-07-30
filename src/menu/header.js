// 菜单 顶栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '页面',
    icon: 'folder-o',
    children: [
      { path: '/views1', title: '页面 1' },
      { path: '/views2', title: '页面 2' },
      { path: '/views3', title: '页面 3' }
    ]
  }
]
