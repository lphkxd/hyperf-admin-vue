import screenfull from 'screenfull'
import util from '@/utils/util.js'
import db from '@/utils/db.js'
import themeList from '@/assets/style/theme/list.js'

// 获取项目信息
import packJson from '../../../package.json'

export default {
  state: {
    // 用户名
    username: '',
    // 拉取的最新版本信息
    releases: {},
    // CareyShop Admin 版本
    version: packJson.version,
    // 有更新
    update: false,
    // 更新提醒弹窗
    updateNotify: false,
    // 全屏
    isFullScreen: false,
    // 灰度
    isGrayMode: false,
    // 主题
    themeList,
    // 现在激活的主题
    themeActiveName: themeList[0].name, // 这应该是一个名字 不是对象
    // 可以在多页 tab 模式下显示的页面
    tagPool: [],
    // 当前显示的多页面列表
    pageOpenedList: [
      {
        name: 'index',
        meta: {
          title: '首页',
          requiresAuth: false
        }
      }
    ],
    // 当前页面
    pageCurrent: ''
  },
  getters: {
    /**
     * @description 返回当前的主题信息 不是一个名字 而是所有的主题数据
     * @param {state} state vuex state
     */
    themeActiveSetting(state) {
      return state.themeList.find(theme => theme.name === state.themeActiveName)
    }
  },
  mutations: {
    /**
     * @class 通用工具
     * @description 将 state 中某一项存储到数据库 如果已经有的话就更新数据 需要 uuid
     * @param {state} state vuex state
     * @param {string} key key name
     */
    vuex2DbByUuid(state, key) {
      const row = db.get(key).find({ uuid: util.uuid() })
      if (row.value()) {
        row.assign({ value: state[key] }).write()
      } else {
        db.get(key).push({
          uuid: util.uuid(),
          value: state[key]
        }).write()
      }
    },
    /**
     * @class 通用工具
     * @description 从数据库取值到 vuex 需要 uuid
     * @param {state} state vuex state
     * @param {object} param1 key and default value
     */
    db2VuexByUuid(state, { key, defaultValue }) {
      const row = db.get(key).find({ uuid: util.uuid() }).value()
      state[key] = row ? row.value : defaultValue
    },
    /**
     * @class 通用工具
     * @description 删除数据库中对应 vuex 的某一个字段 需要 uuid
     * @param {state} state vuex state
     * @param {object} param1 key & empty value
     */
    dbRemoveByUuid(state, { key, emptyValue }) {
      db.get(key).remove({ uuid: util.uuid() }).write()
      state[key] = emptyValue
    },
    /**
     * @class 通用工具
     * @description 将 state 中某一项存储到数据库 如果已经有的话就更新数据 不需要 uuid 所有用户共享
     * @param {state} state vuex state
     * @param {string} key key name
     */
    vuex2Db(state, key) {
      const row = db.get(key).find({ pub: 'pub' })
      if (row.value()) {
        row.assign({ value: state[key] }).write()
      } else {
        db.get(key).push({
          pub: 'pub',
          value: state[key]
        }).write()
      }
    },
    /**
     * @class 通用工具
     * @description 从数据库取值到 vuex 不需要 uuid 所有用户共享
     * @param {state} state vuex state
     * @param {object} param1 key and default value
     */
    db2Vuex(state, { key, defaultValue }) {
      const row = db.get(key).find({ pub: 'pub' }).value()
      state[key] = row ? row.value : defaultValue
    },
    /**
     * @class 通用工具
     * @description 删除数据库中对应 vuex 的某一个字段 不需要 uuid 所有用户共享
     * @param {state} state vuex state
     * @param {object} param1 key & empty value
     */
    dbRemove(state, { key, emptyValue }) {
      db.get(key).remove({ pub: 'pub' }).write()
      state[key] = emptyValue
    },
    /**
     * @description 设置用户名
     * @class username
     * @param {state} state vuex state
     * @param {string} username username
     */
    usernameSet(state, username) {
      state.username = username
      this.commit('vuex2DbByUuid', 'username')
    },
    /**
     * @description 从数据库取用户名
     * @class username
     * @param {state} state vuex state
     */
    usernameLoad(state) {
      this.commit('db2VuexByUuid', {
        key: 'username',
        defaultValue: ''
      })
    },
    /**
     * @description 更新远端的版本信息
     * @class releases
     * @param {state} state vuex state
     * @param {object} releases info
     */
    releasesSet(state, releases) {
      state.releases = releases
    },
    /**
     * @description 设置是否有更新
     * @class update
     * @param {state} state vuex state
     * @param {boolean} update update value
     */
    updateSet(state, update) {
      state.update = update
    },
    /**
     * @description 是否有更新的时候显示弹窗
     * @class updateNotify
     * @param {state} state vuex state
     * @param {boolean} update updateNotify value
     */
    updateNotifySet(state, updateNotify) {
      state.updateNotify = updateNotify
      this.commit('vuex2Db', 'updateNotify')
    },
    /**
     * @description 是否有更新的时候显示弹窗 <- 从数据库更新这个设置
     * @class updateNotify
     * @param {state} state vuex state
     * @param {boolean} update updateNotify value
     */
    updateNotifyLoad(state, updateNotify) {
      this.commit('db2Vuex', {
        key: 'updateNotify',
        defaultValue: true
      })
    },
    /**
     * @class pageCurrent
     * @description 设置当前激活的页面 name
     * @param {state} state vuex state
     * @param {string} name new name
     */
    pageCurrentSet(state, name) {
      state.pageCurrent = name
    },
    /**
     * @class tagPool
     * @description 保存 tagPool (候选池)
     * @param {state} state vuex state
     * @param {Array} tagPool tags
     */
    tagPoolSet(state, tagPool) {
      state.tagPool = tagPool
    },
    /**
     * @class pageOpenedList
     * @description 更新页面列表上的某一项
     * @param {state} state vuex state
     * @param {info} param1 new page info
     */
    pageOpenedListUpdateItem(state, { index, argu, query }) {
      // 更新页面列表某一项
      const page = state.pageOpenedList[index]
      page.argu = argu || page.argu
      page.query = query || page.query
      state.pageOpenedList.splice(index, 1, page)
      // 更新设置到数据库
      this.commit('vuex2DbByUuid', 'pageOpenedList')
    },
    /**
     * @class pageOpenedList
     * @description 从数据库载入分页列表
     * @param {state} state vuex state
     */
    pageOpenedListLoad(state) {
      this.commit('db2VuexByUuid', {
        key: 'pageOpenedList',
        defaultValue: state.pageOpenedList
      })
    },
    /**
     * @class pageOpenedList
     * @description 新增一个 tag (打开一个页面)
     * @param {state} state vuex state
     * @param {object} param1 new tag info
     */
    tagIncreate(state, { tag, argu, query }) {
      // 设置新的 tag 在新打开一个以前没打开过的页面时使用
      let newPage = tag
      newPage.argu = argu || newPage.argu
      newPage.query = query || newPage.query
      newPage.argu = argu || newPage.argu
      // 添加进当前显示的页面数组
      state.pageOpenedList.push(newPage)
      // 更新设置到数据库
      this.commit('vuex2DbByUuid', 'pageOpenedList')
    },
    /**
     * @class pageOpenedList
     * @description 关闭一个 tag (关闭一个页面)
     * @param {state} state vuex state
     * @param {string} name close tag name
     */
    tagClose(state, name) {
      // 找到这个页面在已经打开的数据里是第几个
      const index = state.pageOpenedList.findIndex(page => page.name === name)
      if (index >= 0) {
        state.pageOpenedList.splice(index, 1)
      }
      // 更新设置到数据库
      this.commit('vuex2DbByUuid', 'pageOpenedList')
    },
    /**
     * @class pageOpenedList
     * @description 关闭当前标签左边的标签
     * @param {state} state vuex state
     */
    tagCloseLeft(state) {
      let currentIndex = 0
      state.pageOpenedList.forEach((page, index) => {
        if (page.name === state.pageCurrent) {
          currentIndex = index
        }
      })
      if (currentIndex > 0) {
        state.pageOpenedList.splice(1, currentIndex - 1)
      }
      // 更新设置到数据库
      this.commit('vuex2DbByUuid', 'pageOpenedList')
    },
    /**
     * @class pageOpenedList
     * @description 关闭当前标签右边的标签
     * @param {state} state vuex state
     */
    tagCloseRight(state) {
      let currentIndex = 0
      state.pageOpenedList.forEach((page, index) => {
        if (page.name === state.pageCurrent) {
          currentIndex = index
        }
      })
      state.pageOpenedList.splice(currentIndex + 1)
      // 更新设置到数据库
      this.commit('vuex2DbByUuid', 'pageOpenedList')
    },
    /**
     * @class pageOpenedList
     * @description 关闭当前激活之外的 tag
     * @param {state} state vuex state
     */
    tagCloseOther(state) {
      let currentIndex = 0
      state.pageOpenedList.forEach((page, index) => {
        if (page.name === state.pageCurrent) {
          currentIndex = index
        }
      })
      if (currentIndex === 0) {
        state.pageOpenedList.splice(1)
      } else {
        state.pageOpenedList.splice(currentIndex + 1)
        state.pageOpenedList.splice(1, currentIndex - 1)
      }
      // 更新设置到数据库
      this.commit('vuex2DbByUuid', 'pageOpenedList')
    },
    /**
     * @class pageOpenedList
     * @description 关闭所有 tag
     * @param {state} state vuex state
     */
    tagCloseAll(state) {
      state.pageOpenedList.splice(1)
      // 更新设置到数据库
      this.commit('vuex2DbByUuid', 'pageOpenedList')
    },
    /**
     * @class isFullScreen
     * @description 切换全屏
     * @param {state} state vuex state
     */
    fullScreenToggle() {
      if (screenfull.isFullscreen) {
        screenfull.exit()
        this.commit('fullScreenSet', false)
      } else {
        screenfull.request()
        this.commit('fullScreenSet', true)
      }
    },
    /**
     * @class isFullScreen
     * @description 设置 store 里的全屏状态
     * @param {state} state vuex state
     */
    fullScreenSet(state, isFullScreen) {
      state.isFullScreen = isFullScreen
    },
    /**
     * @class isGrayMode
     * @description 切换灰度状态
     * @param {state} state vuex state
     */
    grayModeToggle(state) {
      state.isGrayMode = !state.isGrayMode
    },
    /**
     * @class isGrayMode
     * @description 设置灰度模式
     * @param {state} state vuex state
     * @param {boolean} value new value
     */
    grayModeSet(state, value) {
      state.isGrayMode = value
    },
    /**
     * @class themeActiveName
     * @description 激活一个主题（应用到dom上）
     * @param {state} state vuex state
     * @param {string} themeName 需要激活的主题名称
     */
    themeSet(state, themeName) {
      // 检查这个主题在主题列表里是否存在
      const theme = state.themeList.find(e => e.name === themeName)
      if (theme) {
        // 设置 state
        state.themeActiveName = themeName
      } else {
        // 设置为列表第一个主题
        state.themeActiveName = state.themeList[0].name
      }
      // 将 vuex 中的主题应用到 dom
      this.commit('theme2dom')
      // 保存到数据库
      this.commit('vuex2DbByUuid', 'themeActiveName')
    },
    /**
     * @class themeActiveName
     * @description 将 vuex 中的主题应用到 dom
     * @param {state} state vuex state
     */
    theme2dom(state) {
      document.body.className = `theme-${state.themeActiveName}`
    },
    /**
     * @class themeActiveName
     * @description 从数据库加载主题设置
     * @param {state} state vuex state
     */
    themeLoad(state) {
      this.commit('db2VuexByUuid', {
        key: 'themeActiveName',
        defaultValue: state.themeList[0].name
      })
      this.commit('theme2dom')
    }
  }
}
