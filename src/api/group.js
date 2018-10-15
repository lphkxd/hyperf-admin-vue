import request from '@/utils/request'

/**
 * 添加一个用户组
 * @param {Array} data
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
 * @param {Array} data
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
