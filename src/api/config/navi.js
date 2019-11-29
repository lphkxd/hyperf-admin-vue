import request from '@/utils/request'

/**
 * 添加一个导航
 * @param {Object} data
 * @returns
 */
export function addNavigationItem(data) {
  return request({
    url: '/v1/navigation',
    method: 'post',
    params: {
      method: 'add.navigation.item'
    },
    data
  })
}

/**
 * 编辑一个导航
 * @param {Object} data
 * @returns
 */
export function setNavigationItem(data) {
  return request({
    url: '/v1/navigation',
    method: 'post',
    params: {
      method: 'set.navigation.item'
    },
    data
  })
}

/**
 * 批量删除导航
 * @param {Array} navigation_id
 * @returns
 */
export function delNavigationList(navigation_id) {
  return request({
    url: '/v1/navigation',
    method: 'post',
    params: {
      method: 'del.navigation.list'
    },
    data: {
      navigation_id
    }
  })
}

/**
 * 获取一个导航
 * @param {Number} navigation_id
 * @returns
 */
export function getNavigationItem(navigation_id) {
  return request({
    url: '/v1/navigation',
    method: 'post',
    params: {
      method: 'get.navigation.item'
    },
    data: {
      navigation_id
    }
  })
}

/**
 * 获取导航列表
 * @param {Object} data
 * @returns
 */
export function getNavigationList(data) {
  return request({
    url: '/v1/navigation',
    method: 'post',
    params: {
      method: 'get.navigation.list'
    },
    data
  })
}

/**
 * 批量设置是否新开窗口
 * @param {Array} navigation_id
 * @param {String} target
 * @returns
 */
export function setNavigationTarget(navigation_id, target) {
  return request({
    url: '/v1/navigation',
    method: 'post',
    params: {
      method: 'set.navigation.target'
    },
    data: {
      navigation_id,
      target
    }
  })
}

/**
 * 批量设置是否启用
 * @param {Array} navigation_id
 * @param {Number} status
 * @returns
 */
export function setNavigationStatus(navigation_id, status) {
  return request({
    url: '/v1/navigation',
    method: 'post',
    params: {
      method: 'set.navigation.status'
    },
    data: {
      navigation_id,
      status
    }
  })
}

/**
 * 设置导航排序
 * @param {Number} navigation_id
 * @param {Number} sort
 * @returns
 */
export function setNavigationSort(navigation_id, sort) {
  return request({
    url: '/v1/navigation',
    method: 'post',
    params: {
      method: 'set.navigation.sort'
    },
    data: {
      navigation_id,
      sort
    }
  })
}
