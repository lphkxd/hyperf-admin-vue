export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {},
    // 未读消息数
    unreadMessage: 0
  },
  actions: {
    /**
     * @description 设置用户数据
     * @param context
     * @param dispatch
     * @param info
     * @returns {Promise<any>}
     */
    set({ state, dispatch }, info) {
      return new Promise(async resolve => {
        // store 赋值
        state.info = info
        // 持久化
        await dispatch('careyshop/db/set', {
          dbName: 'sys',
          path: 'user.info',
          value: info,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 从数据库取用户数据
     * @param context
     * @param dispatch
     * @returns {Promise<any>}
     */
    load({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.info = await dispatch('careyshop/db/get', {
          dbName: 'sys',
          path: 'user.info',
          defaultValue: {},
          user: true
        }, { root: true })
        // end
        resolve()
      })
    }
  },
  mutations: {
    /**
     * @description 设置未读消息数
     * @param {Object} state state
     * @param {Number} count data
     */
    setMessage(state, count) {
      state.unreadMessage = count
    }
  }
}
