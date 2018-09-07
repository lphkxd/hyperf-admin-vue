// import layoutHeaderAside from '@/layout/header-aside'

// 菜单 顶栏
export const menuHeader = []

// 菜单 侧边栏
export const menuAside = []

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

  tree.aside = formatDataToTree(tree.aside)
  return tree
}

// function getRoutesData(arr) {
//   let tree = []
//   arr.forEach(value => {
//     const params = value.params ? JSON.parse(value.params) : null
//     if (!params) {
//       return
//     }
//
//     let arrElem = {
//       menu_id: value.menu_id,
//       parent_id: value.parent_id,
//       path: params.path,
//       name: params.name,
//       meta: { requiresAuth: true, title: value.name }
//     }
//
//     if (value.parent_id === 0) {
//       arrElem['component'] = layoutHeaderAside
//     } else {
//       arrElem['component'] = () => import(params.component)
//     }
//
//     if (params.redirect) {
//       arrElem['redirect'] = params.redirect
//     }
//
//     if (value.children_total) {
//       arrElem['children'] = []
//     }
//
//     tree.push(arrElem)
//   })
//
//   return formatDataToTree(tree)
// }

export default {
  install(vm, source) {
    // try {
    // 获取顶栏、侧边、路由数据
    const menu = getMenuData(source)
    console.log(menu)
    // vm.commit('careyshop/menu/headerSet', menu.header)
    // vm.commit('careyshop/menu/asideSet', menu.aside)
    // vm.commit('careyshop/search/init', menu.aside)

    // const routes = getRoutesData(source)
    // console.log(JSON.stringify(routes))
    // // vm.$router.addRoutes(routes)
    // // vm.commit('careyshop/page/init', routes)

    // console.log(menu, routes)
    // } catch (err) {
    //   console.log(err)
    // }
  }
}
