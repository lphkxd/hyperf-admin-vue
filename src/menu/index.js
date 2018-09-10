import util from '@/utils/util'

// 菜单 顶栏
export const menuHeader = []

// 菜单 侧边栏
export const menuAside = []

/**
 * 将数据源处理为菜单树
 * @param arr
 * @returns {{header: Array, aside: Array}}
 */
function getMenuData(arr) {
  let tree = { header: [], aside: [] }
  arr.forEach(value => {
    if (!value.is_navi) {
      return
    }

    // 储存顶部数据
    let arrElem = { path: value.url, title: value.name, icon: value.icon }
    if (value.parent_id === 0) {
      tree.header.push({ ...arrElem })
    }

    arrElem['menu_id'] = value.menu_id
    arrElem['parent_id'] = value.parent_id
    if (value.children_total) {
      arrElem['children'] = []
    }

    tree.aside.push(arrElem)
  })

  tree.aside = util.formatDataToTree(tree.aside)
  return tree
}

export default {
  install(vm, source) {
    const menu = getMenuData(source)
    vm.commit('careyshop/menu/headerSet', menu.header)
    vm.commit('careyshop/menu/asideSet', menu.aside)
    vm.commit('careyshop/search/init', menu.aside)
  }
}
