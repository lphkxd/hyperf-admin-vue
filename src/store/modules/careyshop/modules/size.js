export default {
  namespaced: true,
  state: {
    // 尺寸
    value: '' // medium small mini
  },
  actions: {
    /**
     * @description 设置尺寸
     * @param state vuex state
     * @param dispatch
     * @param size  尺寸
     * @returns {Promise<any>}
     */
    set({ state, dispatch }, size) {
      return new Promise(async resolve => {
        // store 赋值
        state.value = size
        // 持久化
        await dispatch('careyshop/db/set', {
          dbName: 'sys',
          path: 'size.value',
          value: state.value,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 从持久化数据读取尺寸设置
     * @param state vuex state
     * @param dispatch
     * @returns {Promise<any>}
     */
    load({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.value = await dispatch('careyshop/db/get', {
          dbName: 'sys',
          path: 'size.value',
          defaultValue: 'default',
          user: true
        }, { root: true })
        // end
        resolve()
      })
    }
  }
}
