// import layoutHeaderAside from '@/layout/header-aside'

/**
 * 将任意对象转化为树
 * @param arr
 * @returns {Array}
 */
function formatDataToTree(arr) {
  let tree = []
  let mappedArr = {}

  arr.forEach(value => {
    mappedArr[value.menu_id] = { ...value }
  })

  for (let id in mappedArr) {
    if (!mappedArr.hasOwnProperty(id)) {
      continue
    }

    if (mappedArr[id].parent_id) {
      mappedArr[mappedArr[id].parent_id]['children'].push(mappedArr[id])
    } else {
      tree.push(mappedArr[id])
    }
  }

  return tree
}

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

    let arrElem = {
      path: value.url,
      title: value.name,
      icon: value.icon
    }

    // 储存顶部数据
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

  tree.aside = formatDataToTree(tree.aside)
  return tree
}

function getRoutesData(arr) {
  let tree = []
  arr.forEach(value => {
    const params = value.params ? JSON.parse(value.params) : null
    if (!params) {
      return
    }

    let arrElem = {
      path: params.path,
      name: params.name,
      meta: { requiresAuth: true }
    }

    console.log(arrElem)
  })

  return formatDataToTree(tree)
}

export default {
  install(vm, source) {
    // try {
    //   // 获取顶栏、侧边、路由数据
    //   const menu = getMenuData(source)
    //   vm.commit('careyshop/menu/headerSet', menu.header)
    //   vm.commit('careyshop/search/init', menu.aside)
    //   vm.commit('careyshop/menu/asideSet', menu.aside)
    //
    //   const routes = getRoutesData(source)
    //   console.log(routes)
    // } catch (err) {
    //   console.log(err)
    // }
  }
}
