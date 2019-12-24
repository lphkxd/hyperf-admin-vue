import request from '@/utils/request'

/**
 * 添加一个用户组
 * @param {Object} data
 * @returns
 */
export function addAuthGroupItem(data) {
  return request({
    url: '/v1/auth_group',
    method: 'post',
    params: {
      method: 'create'
    },
    data
  })
}

/**
 * 编辑一个用户组
 * @param {Object} data
 * @returns
 */
export function setAuthGroupItem(data) {
  return request({
    url: '/v1/auth_group',
    method: 'post',
    params: {
      method: 'update'
    },
    data
  })
}

/**
 * 获取一个用户组
 * @param {Number} group_id
 * @returns
 */
export function getAuthGroupItem(group_id) {
  return request({
    url: '/v1/auth_group',
    method: 'post',
    params: {
      method: 'info'
    },
    data: {
      group_id
    }
  })
}

/**
 * 删除一个用户组
 * @param {Number} group_id
 * @returns
 */
export function delAuthGroupItem(group_id) {
  return request({
    url: '/v1/auth_group',
    method: 'post',
    params: {
      method: 'delete'
    },
    data: {
      group_id
    }
  })
}

/**
 * 获取用户组列表
 * @param {Object} data
 * @returns
 */
export function getAuthGroupList(data) {
  return request({
    url: '/v1/auth_group',
    method: 'post',
    params: {
      method: 'list'
    },
    data
  })
}

/**
 * 批量设置用户组状态
 * @param {Array} group_id
 * @param {Number} status
 * @returns
 */
export function setAuthGroupStatus(group_id, status) {
  return request({
    url: '/v1/auth_group',
    method: 'post',
    params: {
      method: 'update_status'
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
 * @returns
 */
export function setAuthGroupSort(group_id, sort) {
  return request({
    url: '/v1/auth_group',
    method: 'post',
    params: {
      method: 'update_sort'
    },
    data: {
      group_id,
      sort
    }
  })
}
