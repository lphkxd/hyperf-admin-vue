import util from '@/utils/util'
import { frameInRoutes } from '@/router/routes'

export default {
  methods: {
    handleMenuSelect(index, indexPath) {
      if (!index || /^cs-menu-empty-\d+$/.test(index)) {
        this.$message.warning('临时菜单')
      } else if (/^https:\/\/|http:\/\//.test(index)) {
        util.open(index)
      } else {
        this.getRouterAuthPath(index, indexPath)
      }
    },
    getRouterAuthPath(index, indexPath) {
      // 子级路由直接访问
      if (indexPath.length > 1) {
        this.$router.push({ path: index })
        return
      }

      // 顶级路由导航到子级路由
      let router = {}
      for (const key in frameInRoutes) {
        if (frameInRoutes[key].path === index) {
          router = frameInRoutes[key].children
          break
        }
      }

      // 判断子级路由是否有权限
      for (const key in router) {
        if (!router.hasOwnProperty(key)) {
          continue
        }

        const newPath = index + '/' + router[key].path
        if (this.$has(newPath)) {
          this.$router.push({ path: newPath })
          break
        }
      }
    }
  }
}
