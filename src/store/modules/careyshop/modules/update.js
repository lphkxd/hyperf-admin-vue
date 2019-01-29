export default {
  namespaced: true,
  state: {
    // 数据源
    data: {}
  },
  getters: {
    /**
     * 返回当前数据列表数量
     * @param state
     * @param idx
     * @returns {*}
     */
    length(state, idx) {
      if (state.data.hasOwnProperty(idx)) {
        return state.data[idx].length
      }

      return 0
    }
  },
  actions: {
  },
  mutations: {
    /**
     * 添加一条待新增记录
     * @param state
     * @param name
     * @param data
     */
    add(state, name, data) {
      state.data[name].push({
        type: 'add',
        data: Object.assign({}, data)
      })
    },
    /**
     * 添加一条待修改记录
     * @param state
     * @param name
     * @param srcId
     * @param data
     */
    set(state, name, srcId, data) {
      state.data[name].push({
        type: 'set',
        id: srcId,
        data: Object.assign({}, data)
      })
    },
    /**
     * 添加一条待删除记录
     * @param state
     * @param name
     * @param srcId
     */
    del(state, name, srcId) {
      state.data[name].push({
        type: 'del',
        id: srcId
      })
    },
    /**
     * 清空某个模块记录
     * @param state
     * @param name
     */
    clear(state, name) {
      state.data[name] = []
    }
  }
}
