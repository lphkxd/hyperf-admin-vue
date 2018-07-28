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
  }
}
