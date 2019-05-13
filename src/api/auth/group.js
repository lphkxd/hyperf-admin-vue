import request from '@/utils/request'

/**
 * 添加一个用户组
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addAuthGroupItem(data) {
  return request({
    url: '/v1/auth_group',
    method: 'post',
    params: {
      method: 'add.auth.group.item'
    },
    data
  })
}

/**
 * 编辑一个用户组
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setAuthGroupItem(data) {
  return request({
    url: '/v1/auth_group',
    method: 'post',
    params: {
      method: 'set.auth.group.item'
    },
    data
  })
}

/**
 * 获取一个用户组
 * @param {Number} group_id
 * @returns {AxiosPromise}
 */
export function getAuthGroupItem(group_id) {
  return request({
    url: '/v1/auth_group',
    method: 'post',
    params: {
      method: 'get.auth.group.item'
    },
    data: {
      group_id
    }
  })
}

/**
 * 删除一个用户组
 * @param {Number} group_id
 * @returns {AxiosPromise}
 */
export function delAuthGroupItem(group_id) {
  return request({
    url: '/v1/auth_group',
    method: 'post',
    params: {
      method: 'del.auth.group.item'
    },
    data: {
      group_id
    }
  })
}

/**
 * 获取用户组列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getAuthGroupList(data) {
  return request({
    url: '/v1/auth_group',
    method: 'post',
    params: {
      method: 'get.auth.group.list'
    },
    data
  })
}

/**
 * 批量设置用户组状态
 * @param {Array} group_id
 * @param {Number} status
 * @returns {AxiosPromise}
 */
export function setAuthGroupStatus(group_id, status) {
  return request({
    url: '/v1/auth_group',
    method: 'post',
    params: {
      method: 'set.auth.group.status'
    },
    data: {
      group_id,
      status
    }
  })
}

/**
 * 设置用户组排序值
 * @param {Number} group_id
 * @param {Number} sort
 * @returns {AxiosPromise}
 */
export function setAuthGroupSort(group_id, sort) {
  return request({
    url: '/v1/auth_group',
    method: 'post',
    params: {
      method: 'set.auth.group.sort'
    },
    data: {
      group_id,
      sort
    }
  })
}
