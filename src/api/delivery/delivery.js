import request from '@/utils/request'

/**
 * 添加一个配送方式
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addDeliveryItem(data) {
  return request({
    url: '/v1/delivery',
    method: 'post',
    params: {
      method: 'add.delivery.item'
    },
    data
  })
}

