import request from '@/utils/request'

/**
 * 查询一笔退款信息
 * @param {String} refund_no
 * @returns
 */
export function queryRefundItem(refund_no) {
  return request({
    url: '/v1/order_refund',
    method: 'post',
    params: {
      method: 'query.refund.item'
    },
    data: {
      refund_no
    }
  })
}

/**
 * 获取退款记录列表
 * @param {Object} data
 * @returns
 */
export function getRefundList(data) {
  return request({
    url: '/v1/order_refund',
    method: 'post',
    params: {
      method: 'get.refund.list'
    },
    data
  })
}
