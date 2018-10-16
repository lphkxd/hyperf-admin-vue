import request from '@/utils/request'

/**
 * 获取菜单所属模块
 * @returns {Promise<any>}
 */
export function getMenuModule() {
  return new Promise(resolve => {
    resolve(['api', 'admin', 'home'])
  })
}

/**
 * 根据权限获取菜单列表
 * @param {Array} data
 */
export function getMenuAuthList(data) {
  return request({
    url: '/v1/menu',
    method: 'post',
    params: {
      method: 'get.menu.auth.list',
      module: 'admin'
    },
    data
  })
}

/**
 * 获取一个菜单
 * @param {Number} menu_id
 */
export function getMenuItem(menu_id) {
  return request({
    url: '/v1/menu',
    method: 'post',
    params: {
      method: 'get.menu.item'
    },
    data: {
      menu_id
    }
  })
}

/**
 * 编辑一个菜单
 * @param {Array} data
 */
export function setMenuItem(data) {
  return request({
    url: '/v1/menu',
    method: 'post',
    params: {
      method: 'set.menu.item'
    },
    data
  })
}

/**
 * 删除一个菜单，如果当前菜单存在子级，那么所有的子级也将被删除
 * @param {Number} menu_id
 */
export function delMenuItem(menu_id) {
  return request({
    url: '/v1/menu',
    method: 'post',
    params: {
      method: 'del.menu.item'
    },
    data: {
      menu_id
    }
  })
}

/**
 * 获取菜单列表
 * @param {Array} data
 */
export function getMenuList(data) {
  return request({
    url: '/v1/menu',
    method: 'post',
    params: {
      method: 'get.menu.list'
    },
    data
  })
}

/**
 * 根据菜单Id生成导航「面包屑」数据
 * @param {Number} menu_id
 * @param {Number} is_layer
 */
export function getMenuIdNavi(menu_id, is_layer = 1) {
  return request({
    url: '/v1/menu',
    method: 'post',
    params: {
      method: 'get.menu.id.navi'
    },
    data: {
      menu_id,
      is_layer
    }
  })
}

/**
 * 根据菜单Url生成导航「面包屑」数据
 * @param {String} url
 * @param {Number} is_layer
 */
export function getMenuUrlNavi(url, is_layer = 1) {
  return request({
    url: '/v1/menu',
    method: 'post',
    params: {
      method: 'get.menu.url.navi'
    },
    data: {
      url,
      is_layer
    }
  })
}

/**
 * 批量设置是否属于导航菜单
 * @param {Array} menu_id
 * @param {Number} is_navi
 */
export function setMenuNavi(menu_id, is_navi) {
  return request({
    url: '/v1/menu',
    method: 'post',
    params: {
      method: 'set.menu.navi'
    },
    data: {
      menu_id,
      is_navi
    }
  })
}

/**
 * 设置菜单排序
 * @param {Number} menu_id
 * @param {Number} sort
 */
export function setMenuSort(menu_id, sort) {
  return request({
    url: '/v1/menu',
    method: 'post',
    params: {
      method: 'set.menu.sort'
    },
    data: {
      menu_id,
      sort
    }
  })
}

/**
 * 设置菜单状态，同时会影响上级与下级菜单的状态
 * @param {Number} menu_id
 * @param {Number} status
 */
export function setMenuStatus(menu_id, status) {
  return request({
    url: '/v1/menu',
    method: 'post',
    params: {
      method: 'set.menu.status'
    },
    data: {
      menu_id,
      status
    }
  })
}
