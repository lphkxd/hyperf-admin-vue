import setting from '@/setting'

export default {
  namespaced: true,
  state: {
    // 用户信息
    info: setting.user.info
  },
  mutations: {
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param {*} info info
     */
    set(state, info) {
      // store 赋值
      state.info = info
      // 持久化
      this.dispatch('careyshop/db/set', {
        dbName: 'sys',
        path: 'user.info',
        value: info,
        user: true
      })
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} state vuex state
     */
    async load(state) {
      // store 赋值
      state.info = await this.dispatch('careyshop/db/get', {
        dbName: 'sys',
        path: 'user.info',
        defaultValue: setting.user.info,
        user: true
      })
    }
  }
}
