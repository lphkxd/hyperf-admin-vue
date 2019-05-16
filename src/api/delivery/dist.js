import request from '@/utils/request'

/**
 * 获取配送回调URL接口
 * @returns {AxiosPromise}
 */
export function getDeliveryDistCallback() {
  return request({
    url: '/v1/delivery_dist',
    method: 'post',
    params: {
      method: 'get.delivery.dist.callback'
    }
  })
}

/**
 * 添加一条配送记录
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addDeliveryDistItem(data) {
  return request({
    url: '/v1/delivery_dist',
    method: 'post',
    params: {
      method: 'add.delivery.dist.item'
    },
    data
  })
}

/**
 * 根据流水号获取配送记录
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getDeliveryDistCode(data) {
  return request({
    url: '/v1/delivery_dist',
    method: 'post',
    params: {
      method: 'get.delivery.dist.code'
    },
    data
  })
}

/**
 * 获取配送记录列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getDeliveryDistList(data) {
  return request({
    url: '/v1/delivery_dist',
    method: 'post',
    params: {
      method: 'get.delivery.dist.list'
    },
    data
  })
}
