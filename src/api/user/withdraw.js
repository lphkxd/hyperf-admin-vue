import request from '@/utils/request'

/**
 * 获取一个提现请求
 * @param {String} withdraw_no
 * @returns {AxiosPromise}
 */
export function getWithdrawItem(withdraw_no) {
  return request({
    url: '/v1/withdraw',
    method: 'post',
    params: {
      method: 'get.withdraw.item'
    },
    data: {
      withdraw_no
    }
  })
}

/**
 * 获取提现请求列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getWithdrawList(data) {
  return request({
    url: '/v1/withdraw',
    method: 'post',
    params: {
      method: 'get.withdraw.list'
    },
    data
  })
}

/**
 * 处理一个提现请求
 * @param {String} withdraw_no
 * @returns {AxiosPromise}
 */
export function processWithdrawItem(withdraw_no) {
  return request({
    url: '/v1/withdraw',
    method: 'post',
    params: {
      method: 'process.withdraw.item'
    },
    data: {
      withdraw_no
    }
  })
}

/**
 * 完成一个提现请求
 * @param {String} withdraw_no
 * @param {String} remark
 * @returns {AxiosPromise}
 */
export function completeWithdrawItem(withdraw_no, remark) {
  return request({
    url: '/v1/withdraw',
    method: 'post',
    params: {
      method: 'complete.withdraw.item'
    },
    data: {
      withdraw_no,
      remark
    }
  })
}

/**
 * 拒绝一个提现请求
 * @param {String} withdraw_no
 * @param {String} remark
 * @returns {AxiosPromise}
 */
export function refuseWithdrawItem(withdraw_no, remark) {
  return request({
    url: '/v1/withdraw',
    method: 'post',
    params: {
      method: 'refuse.withdraw.item'
    },
    data: {
      withdraw_no,
      remark
    }
  })
}

/**
 * 获取提现手续费
 * @returns {AxiosPromise}
 */
export function getWithdrawFee() {
  return request({
    url: '/v1/withdraw',
    method: 'post',
    params: {
      method: 'get.withdraw.fee'
    }
  })
}
