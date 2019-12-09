import request from '@/utils/request'

/**
 * 获取一笔交易结算
 * @param {Number} transaction_id
 * @returns
 */
export function getTransactionItem(transaction_id) {
  return request({
    url: '/v1/transaction',
    method: 'post',
    params: {
      method: 'get.transaction.item'
    },
    data: {
      transaction_id
    }
  })
}

/**
 * 获取交易结算列表
 * @param {Object} data
 * @returns
 */
export function getTransactionList(data) {
  return request({
    url: '/v1/transaction',
    method: 'post',
    params: {
      method: 'get.transaction.list'
    },
    data
  })
}
