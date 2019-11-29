import request from '@/utils/request'

/**
 * 获取支付配置列表
 * @param {Object} data
 * @returns
 */
export function getPaymentList(data) {
  return request({
    url: '/v1/payment',
    method: 'post',
    params: {
      method: 'get.payment.list'
    },
    data
  })
}

/**
 * 编辑一个支付配置
 * @param {Object} data
 * @returns
 */
export function setPaymentItem(data) {
  return request({
    url: '/v1/payment',
    method: 'post',
    params: {
      method: 'set.payment.item'
    },
    data
  })
}

/**
 * 获取一个支付配置
 * @param {Number} payment_id
 * @returns
 */
export function getPaymentItem(payment_id) {
  return request({
    url: '/v1/payment',
    method: 'post',
    params: {
      method: 'get.payment.item'
    },
    data: {
      payment_id
    }
  })
}

/**
 * 设置支付配置排序
 * @param {Number} payment_id
 * @param {Number} sort
 * @returns
 */
export function setPaymentSort(payment_id, sort) {
  return request({
    url: '/v1/payment',
    method: 'post',
    params: {
      method: 'set.payment.sort'
    },
    data: {
      payment_id,
      sort
    }
  })
}

/**
 * 批量设置支付配置状态
 * @param {Array} payment_id
 * @param {Number} status
 * @returns
 */
export function setPaymentStatus(payment_id, status) {
  return request({
    url: '/v1/payment',
    method: 'post',
    params: {
      method: 'set.payment.status'
    },
    data: {
      payment_id,
      status
    }
  })
}

/**
 * 财务对账号进行资金调整
 * @param {Object} data
 * @returns
 */
export function setPaymentFinance(data) {
  return request({
    url: '/v1/payment',
    method: 'post',
    params: {
      method: 'set.payment.finance'
    },
    data
  })
}
