import request from '@/utils/request'

/**
 * 添加一名客服
 * @param {Object} data
 * @returns
 */
export function addSupportItem(data) {
  return request({
    url: '/v1/support',
    method: 'post',
    params: {
      method: 'add.support.item'
    },
    data
  })
}

/**
 * 编辑一名客服
 * @param {Object} data
 * @returns
 */
export function setSupportItem(data) {
  return request({
    url: '/v1/support',
    method: 'post',
    params: {
      method: 'set.support.item'
    },
    data
  })
}

/**
 * 批量删除客服
 * @param {Array} support_id
 * @returns
 */
export function delSupportList(support_id) {
  return request({
    url: '/v1/support',
    method: 'post',
    params: {
      method: 'del.support.list'
    },
    data: {
      support_id
    }
  })
}

/**
 * 获取一名客服
 * @param {Number} support_id
 * @returns
 */
export function getSupportItem(support_id) {
  return request({
    url: '/v1/support',
    method: 'post',
    params: {
      method: 'get.support.item'
    },
    data: {
      support_id
    }
  })
}

/**
 * 获取客服列表
 * @param {Object} data
 * @returns
 */
export function getSupportList(data) {
  return request({
    url: '/v1/support',
    method: 'post',
    params: {
      method: 'get.support.list'
    },
    data
  })
}

/**
 * 批量设置客服状态
 * @param {Array} support_id
 * @param {Number} status
 * @returns
 */
export function setSupportStatus(support_id, status) {
  return request({
    url: '/v1/support',
    method: 'post',
    params: {
      method: 'set.support.status'
    },
    data: {
      support_id,
      status
    }
  })
}

/**
 * 设置客服排序
 * @param {Number} support_id
 * @param {Number} sort
 * @returns
 */
export function setSupportSort(support_id, sort) {
  return request({
    url: '/v1/support',
    method: 'post',
    params: {
      method: 'set.support.sort'
    },
    data: {
      support_id,
      sort
    }
  })
}
