import setting from '@/setting'
import menu from '@/menu'

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
  actions: {
    /**
     * @description 设置侧边栏展开或者收缩
     * @param context
     * @param dispatch
     * @param collapse is collapse
     * @returns {Promise<any>}
     */
    asideCollapseSet({ state, dispatch }, collapse) {
      return new Promise(async resolve => {
        // store 赋值
        state.asideCollapse = collapse
        // 持久化
        await dispatch('careyshop/db/set', {
          dbName: 'sys',
          path: 'menu.asideCollapse',
          value: state.asideCollapse,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 切换侧边栏展开和收缩
     * @param context
     * @param dispatch
     * @returns {Promise<any>}
     */
    asideCollapseToggle({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.asideCollapse = !state.asideCollapse
        // 持久化
        await dispatch('careyshop/db/set', {
          dbName: 'sys',
          path: 'menu.asideCollapse',
          value: state.asideCollapse,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 从持久化数据读取侧边栏展开或者收缩
     * @param context
     * @param dispatch
     * @returns {Promise<any>}
     */
    asideCollapseLoad({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.asideCollapse = await dispatch('careyshop/db/get', {
          dbName: 'sys',
          path: 'menu.asideCollapse',
          defaultValue: setting.menu.asideCollapse,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 从持久化数据读取菜单源数据
     * @param state state
     * @param dispatch
     * @returns {Promise<*>}
     */
    async sourceDataLoad({ state, dispatch }) {
      return new Promise(async resolve => {
        // 菜单数据源持久化
        state.sourceData = await dispatch('careyshop/db/get', {
          dbName: 'database',
          path: '$menu.sourceData',
          defaultValue: [],
          user: true
        }, { root: true })
        // 处理顶栏菜单、侧边菜单、功能搜索
        menu.install(this, state.sourceData)
        // end
        resolve()
      })
    }
  },
  mutations: {
    /**
     * @description 设置顶栏菜单
     * @param {Object} state state
     * @param {Array} menu menu setting
     */
    headerSet(state, menu) {
      // store 赋值
      state.header = menu
    },
    /**
     * @description 设置侧边栏菜单
     * @param {Object} state state
     * @param {Array} menu menu setting
     */
    asideSet(state, menu) {
      // store 赋值
      state.aside = menu
    }
  }
}
