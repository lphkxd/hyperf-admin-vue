import Cookies from 'vue-cookies'

let util = {}

/**
 * @description 得到现在的用户
 */
util.uuid = function() {
  return Cookies.get('user_id')
}

/**
 * @description 更新标题
 * @param {string} title 标题
 */
util.title = function(title) {
  const prefix = 'CareyShop 后台管理系统'
  window.document.title = `${title ? `${title} - ` : ''}${prefix}`
}

/**
 * @description 在每次打开新页面的时候调用 打开一个新的 tab
 * @param {object} vm vue
 * @param {string} name route name
 * @param {object} argu arguments
 * @param {object} query query object
 */
util.openNewPage = function(vm, name, argu, query) {
  // 已经打开的页面
  const pageOpenedList = vm.$store.state.careyshop.pageOpenedList
  // 判断此页面是否已经打开 并且记录位置
  let pageOpendIndex = 0
  const pageOpend = pageOpenedList.find((page, index) => {
    const same = page.name === name
    pageOpendIndex = same ? index : pageOpendIndex
    return same
  })
  if (pageOpend) {
    // 页面以前打开过 但是新的页面可能 name 一样，参数不一样
    vm.$store.commit('pageOpenedListUpdateItem', { index: pageOpendIndex, argu, query })
  } else {
    // 页面以前没有打开过
    const tagPool = vm.$store.state.careyshop.tagPool
    const tag = tagPool.find(t => t.name === name)
    if (tag) {
      vm.$store.commit('tagIncreate', { tag, argu, query })
    }
  }
  vm.$store.commit('pageCurrentSet', name)
}

/**
 * @description 判断是否在其内
 * @param {*} ele element
 * @param {array} targetArr array
 */
util.isOneOf = function(ele, targetArr) {
  return targetArr.indexOf(ele) >= 0
}

export default util
