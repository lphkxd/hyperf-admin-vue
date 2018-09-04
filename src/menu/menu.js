// function formatDataToTree(arr) {
//   let tree = []
//   // let mappedArr = {}
//   // // let mappedElem
//   //
//   // // First map the nodes of the array to an object -> create a hash table.
//   // arr.forEach(value => {
//   // })
//   //
//   // // console.log(mappedArr)
//   //
//   // // for (var i = 0, len = arr.length; i < len; i++) {
//   // //   arrElem = arr[i]
//   // //   mappedArr[arrElem.menu_id] = arrElem
//   // //   mappedArr[arrElem.menu_id]['childrens'] = []
//   // // }
//   //
//   // // for (var id in mappedArr) {
//   // //   if (mappedArr.hasOwnProperty(id)) {
//   // //     mappedElem = mappedArr[id]
//   // //     if (mappedElem.parent_id) {
//   // //       mappedArr[mappedElem['parent_id']]['childrens'].push(mappedElem)
//   // //     } else {
//   // //       tree.push(mappedElem)
//   // //     }
//   // //   }
//   // // }
//
//   return tree
// }

function formatDataToTree(arr) {
  let mappedArr = {}
  const tree = { header: [], aside: [], frameIn: [] }

  arr.forEach(value => {
    if (value.parent_id === 0 && value.is_navi === 1) {
      tree.header.push({
        path: value.url,
        title: value.name,
        icon: value.icon
      })
    }

    // 创建映射副本
    mappedArr[value.menu_id] = {
      // TODO:未完成
    }
  })

  // console.log(mappedArr)
  return tree
}

export default {
  install(vm, source) {
    // 获取顶栏、侧边、路由数据
    const tree = formatDataToTree(source)

    if (tree.header.length > 0) {
      vm.commit('careyshop/menu/headerSet', tree.header)
    }

    if (tree.aside.length > 0) {
      vm.commit('careyshop/menu/asideSet', tree.aside)
      vm.commit('careyshop/search/init', tree.aside)
    }
  }
}
