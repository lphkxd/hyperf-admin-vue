import request from '@/utils/request'

/**
 * 获取支付配置列表
 * @param {Object} data
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
