export default {
  namespaced: true,
  state: {
    // 数据源
    list: {}
  },
  mutations: {
    /**
     * 添加一条待添加记录
     * @param state
     * @param data
     */
    addUpdate(state, data) {
      const insert = state.list[data.name]
      if (!insert) {
        state.list[data.name] = []
      }

      insert.push({
        type: 'add',
        data: Object.assign({}, data.data)
      })
    },
    /**
     * 添加一条待修改记录
     * @param state
     * @param data
     */
    setUpdate(state, data) {
      const insert = state.list[data.name]
      if (!insert) {
        state.list[data.name] = []
      }

      insert.push({
        type: 'set',
        idx: data.srcId,
        data: Object.assign({}, data.data)
      })
    },
    /**
     * 添加一条待删除记录
     * @param state
     * @param data
     */
    delUpdate(state, data) {
      const insert = state.list[data.name]
      if (!insert) {
        state.list[data.name] = []
      }

      insert.push({
        type: 'del',
        idx: data.srcId
      })
    },
    /**
     * 清除某个索引下的所有记录
     * @param state
     * @param name
     */
    clearUpdate(state, name) {
      state.list[name] = []
    }
  },
  actions: {
    /**
     * 执行某个数据更新动作
     * @param commit
     * @param type
     * @param data
     */
    updateData({ commit }, { type, data }) {
      switch (type) {
        case 'add':
          commit('addUpdate', data)
          break
        case 'set':
          commit('setUpdate', data)
          break
        case 'del':
          commit('delUpdate', data)
          break
        case 'clear':
          commit('clearUpdate', data.name)
          break
      }
    },
    updateChange({ state, commit }, { name, key, source }) {
      // 源数据处理
      function setSourceData(action) {
        console.log(action, key, source)
      }

      return new Promise(resolve => {
        if (state.list.hasOwnProperty(name) && state.list[name].length > 0) {
          state.list[name].forEach(value => {
            setSourceData(value)
          })
        }

        commit('clearUpdate', name)
        resolve()
      })
    }
  }
}
