import request from '@/utils/request'

/**
 * 添加一个提现账号
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addWithdrawUserItem(data) {
  return request({
    url: '/v1/withdraw_user',
    method: 'post',
    params: {
      method: 'add.withdraw.user.item'
    },
    data
  })
}

/**
 * 编辑一个提现账号
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setWithdrawUserItem(data) {
  return request({
    url: '/v1/withdraw_user',
    method: 'post',
    params: {
      method: 'set.withdraw.user.item'
    },
    data
  })
}

/**
 * 批量删除提现账号
 * @param {Array} withdraw_user_id
 * @param {Number} client_id
 * @returns {AxiosPromise}
 */
export function delWithdrawUserList(withdraw_user_id, client_id) {
  return request({
    url: '/v1/withdraw_user',
    method: 'post',
    params: {
      method: 'del.withdraw.user.list'
    },
    data: {
      withdraw_user_id,
      client_id
    }
  })
}

/**
 * 获取指定账号的一个提现账号
 * @param {Number} withdraw_user_id
 * @param {Number} client_id
 * @returns {AxiosPromise}
 */
export function getWithdrawUserItem(withdraw_user_id, client_id) {
  return request({
    url: '/v1/withdraw_user',
    method: 'post',
    params: {
      method: 'get.withdraw.user.item'
    },
    data: {
      withdraw_user_id,
      client_id
    }
  })
}

/**
 * 获取指定账号的提现账号列表
 * @param {Number} client_id
 * @returns {AxiosPromise}
 */
export function getWithdrawUserList(client_id) {
  return request({
    url: '/v1/withdraw_user',
    method: 'post',
    params: {
      method: 'get.withdraw.user.list'
    },
    data: {
      client_id
    }
  })
}

/**
 * 检测是否超出最大添加数量
 * @param {Number} client_id
 * @returns {AxiosPromise}
 */
export function isWithdrawUserMaximum(client_id) {
  return request({
    url: '/v1/withdraw_user',
    method: 'post',
    params: {
      method: 'is.withdraw.user.maximum'
    },
    data: {
      client_id
    }
  })
}
