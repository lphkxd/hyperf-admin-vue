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
      if (index === '/index' || !indexPath || indexPath.length > 1) {
        this.$router.push({ path: index }).catch(() => {})
        return
      }

      // 查找顶级路由下是否存在子路由
      let router = null
      // eslint-disable-next-line no-unused-vars
      for (const value of frameInRoutes) {
        if (value.path === index) {
          router = value.children
          break
        }
      }

      // 不存在子路由,则直接进入
      if (!router) {
        this.$router.push({ path: index }).catch(() => {})
        return
      }

      // 存在子路由,则判断子级路由是否有权限
      // eslint-disable-next-line no-unused-vars
      for (const value of router) {
        const newPath = index + '/' + value.path
        if (this.$has(newPath)) {
          this.$router.push({ path: newPath }).catch(() => {})
          break
        }
      }
    }
  }
}
