import setting from '@/setting'
import menu from '@/menu/menu'

export default {
  namespaced: true,
  state: {
    // 顶栏菜单
    header: [],
    // 侧栏菜单
    aside: [],
    // 侧边栏收缩
    asideCollapse: setting.menu.asideCollapse,
    // 菜单源数据
    sourceData: []
  },
  mutations: {
    /**
     * @description 设置顶栏菜单
     * @param {Object} state vuex state
     * @param {Array} menu menu setting
     */
    headerSet(state, menu) {
      // store 赋值
      state.header = menu
    },
    /**
     * @description 设置侧边栏菜单
     * @param {Object} state vuex state
     * @param {Array} menu menu setting
     */
    asideSet(state, menu) {
      // store 赋值
      state.aside = menu
    },
    /**
     * 设置侧边栏展开或者收缩
     * @param {Object} state vuex state
     * @param {Boolean} collapse is collapse
     */
    asideCollapseSet(state, collapse) {
      // store 赋值
      state.asideCollapse = collapse
      // 持久化
      this.dispatch('careyshop/db/set', {
        dbName: 'sys',
        path: 'menu.asideCollapse',
        value: state.asideCollapse,
        user: true
      })
    },
    /**
     * 切换侧边栏展开和收缩
     * @param {Object} state vuex state
     */
    asideCollapseToggle(state) {
      // store 赋值
      state.asideCollapse = !state.asideCollapse
      // 持久化
      this.dispatch('careyshop/db/set', {
        dbName: 'sys',
        path: 'menu.asideCollapse',
        value: state.asideCollapse,
        user: true
      })
    },
    /**
     * 从持久化数据读取侧边栏展开或者收缩
     * @param {Object} state vuex state
     */
    async asideCollapseLoad(state) {
      // store 赋值
      state.asideCollapse = await this.dispatch('careyshop/db/get', {
        dbName: 'sys',
        path: 'menu.asideCollapse',
        defaultValue: setting.menu.asideCollapse,
        user: true
      })
    },
    /**
     * 从持久化数据读取菜单源数据
     * @param {Object} state vuex state
     * @returns {Promise<void>}
     */
    async sourceDataLoad(state) {
      // 菜单数据源持久化
      state.sourceData = await this.dispatch('careyshop/db/get', {
        dbName: 'database',
        path: 'menu.sourceData',
        defaultValue: [],
        user: true
      })

      // 处理顶栏菜单、侧边菜单、路由、功能搜索
      menu.install(state.sourceData)
    }
  }
}
