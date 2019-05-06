import { frameInRoutes } from '@/router/routes'

export default {
  methods: {
    /**
     * 触发选中的菜单
     * @param index     选中菜单项的 index
     * @param indexPath 选中菜单项的 index path
     */
    handleMenuSelect(index, indexPath) {
      if (!index || /^cs-menu-empty-\d+$/.test(index)) {
        this.$message.warning('临时菜单')
      } else if (/^https:\/\/|http:\/\//.test(index)) {
        this.$open(index)
      } else {
        this.getRouterAuthPath(index, indexPath)
      }
    },
    /**
     * 触发菜单点击后进行权限过滤
     * @param index     选中菜单项的 index
     * @param indexPath 选中菜单项的 index path
     */
    getRouterAuthPath(index, indexPath) {
      // 子级路由直接访问
      if (indexPath.length > 1 || index === '/index') {
        this.$router.push({ path: index })
        return
      }

      // 顶级路由导航到子级路由
      let router = null
      for (const value of frameInRoutes) {
        if (value.path === index) {
          router = value.children
          break
        }
      }

      // 判断子级路由是否有权限
      for (const value of router) {
        const newPath = index + '/' + value.path
        if (this.$has(newPath)) {
          this.$router.push({ path: newPath })
          break
        }
      }
    }
  }
}
