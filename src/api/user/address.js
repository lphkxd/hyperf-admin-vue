import request from '@/utils/request'

/**
 * 获取指定账号的收货地址列表
 * @param {Number} client_id
 * @returns {AxiosPromise}
 */
export function getUserAddressList(client_id) {
  return request({
    url: '/v1/user_address',
    method: 'post',
    params: {
      method: 'get.user.address.list'
    },
    data: {
      client_id
    }
  })
}

/**
 * 获取指定账号的一个收货地址
 * @param {Number} client_id
 * @param {Number} user_address_id
 * @returns {AxiosPromise}
 */
export function getUserAddressItem(client_id, user_address_id) {
  return request({
    url: '/v1/user_address',
    method: 'post',
    params: {
      method: 'get.user.address.item'
    },
    data: {
      client_id,
      user_address_id
    }
  })
}

/**
 * 获取指定账号的默认收货地址
 * @param {Number} client_id
 * @returns {AxiosPromise}
 */
export function getUserAddressDefault(client_id) {
  return request({
    url: '/v1/user_address',
    method: 'post',
    params: {
      method: 'get.user.address.default'
    },
    data: {
      client_id
    }
  })
}

/**
 * 添加一个收货地址
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addUserAddressItem(data) {
  return request({
    url: '/v1/user_address',
    method: 'post',
    params: {
      method: 'add.user.address.item'
    },
    data
  })
}

/**
 * 编辑一个收货地址
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setUserAddressItem(data) {
  return request({
    url: '/v1/user_address',
    method: 'post',
    params: {
      method: 'set.user.address.item'
    },
    data
  })
}

/**
 * 批量删除收货地址
 * @param {Number} client_id
 * @param {Array} user_address_id
 * @returns {AxiosPromise}
 */
export function delUserAddressList(client_id, user_address_id) {
  return request({
    url: '/v1/user_address',
    method: 'post',
    params: {
      method: 'del.user.address.list'
    },
    data: {
      client_id,
      user_address_id
    }
  })
}

/**
 * 设置一个收货地址为默认收货地址
 * @param {Number} user_address_id
 * @returns {AxiosPromise}
 */
export function setUserAddressDefault(user_address_id) {
  return request({
    url: '/v1/user_address',
    method: 'post',
    params: {
      method: 'set.user.address.default'
    },
    data: {
      user_address_id
    }
  })
}

/**
 * 检测是否超出最大添加数量
 * @param {Number} client_id
 * @returns {AxiosPromise}
 */
export function isUserAddressMaximum(client_id) {
  return request({
    url: '/v1/user_address',
    method: 'post',
    params: {
      method: 'is.user.address.maximum'
    },
    data: {
      client_id
    }
  })
}
