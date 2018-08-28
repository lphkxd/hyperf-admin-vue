import util from '@/utils/util'
import { getMenuAuthList } from '@/api/menu'
import { loginAdminUser, logoutAdminUser } from '@/api/admin'

export default {
  namespaced: true,
  actions: {
    /**
     * @description 登陆
     * @param {Object} param context
     * @param {Object} param vm {Object} vue 实例
     * @param {Object} param username {String} 用户账号
     * @param {Object} param password {String} 密码
     */
    login({ commit }, { vm, username, password }) {
      return new Promise((resolve, reject) => {
        loginAdminUser(username, password)
          .then(res => {
            util.cookies.set('uuid', res.data.admin.admin_id)
            util.cookies.set('token', res.data.token.token)
            commit('careyshop/user/set', {
              name: res.data.admin.nickname,
              admin: res.data.admin,
              token: res.data.token
            }, { root: true })

            return getMenuAuthList()
          })
          .then(menu => {
            // const db = vm.$store.dispatch('careyshop/db/database', { user: true })
            // db.set('test', 'okok').write()
            console.log(menu)
            resolve()
          })
          .catch(err => {
            util.cookies.remove('token')
            util.cookies.remove('uuid')
            reject(err)
          })
      })
    },
    /**
     * @description 注销用户并返回登陆页面
     * @param {Object} param context
     * @param {Object} param vm {Object} vue 实例
     * @param {Object} param confirm {Boolean} 是否需要确认
     */
    logout({ commit }, { vm, confirm = false }) {
      // 实际注销操作
      function logout() {
        logoutAdminUser().finally(() => {
          // 删除info
          commit('careyshop/user/set', {
            name: 'Ghost',
            admin: {},
            token: {}
          }, { root: true })
          // 删除cookie
          util.cookies.remove('token')
          util.cookies.remove('uuid')
          // 跳转路由
          vm.$router.push({ name: 'login' })
        }).catch(() => {
        })
      }

      if (!confirm) {
        logout()
        return
      }

      vm.$confirm('注销当前账户吗? ', '确认操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          logout()
        })
        .catch(() => {
        })
    }
  },
  mutations: {
    /**
     * @description 用户登陆后从持久化数据加载一系列的设置
     * @param {Object} state vuex state
     */
    load(state) {
      // DB -> store 加载用户数据
      this.commit('careyshop/user/load')
      // DB -> store 加载主题
      this.commit('careyshop/theme/load')
      // DB -> store 加载页面过渡效果设置
      this.commit('careyshop/transition/load')
      // DB -> store 持久化数据加载上次退出时的多页列表
      this.commit('careyshop/page/openedLoad')
      // DB -> store 持久化数据加载这个用户之前设置的侧边栏折叠状态
      this.commit('careyshop/menu/asideCollapseLoad')
    }
  }
}
