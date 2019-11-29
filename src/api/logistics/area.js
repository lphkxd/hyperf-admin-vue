import request from '@/utils/request'

/**
 * 添加一个配送区域
 * @param {Object} data
 * @returns
 */
export function addDeliveryAreaItem(data) {
  return request({
    url: '/v1/delivery_area',
    method: 'post',
    params: {
      method: 'add.delivery.area.item'
    },
    data
  })
}

/**
 * 编辑一个配送区域
 * @param {Object} data
 * @returns
 */
export function setDeliveryAreaItem(data) {
  return request({
    url: '/v1/delivery_area',
    method: 'post',
    params: {
      method: 'set.delivery.area.item'
    },
    data
  })
}

/**
 * 批量删除配送区域
 * @param {Array} delivery_area_id
 * @returns
 */
export function delDeliveryAreaList(delivery_area_id) {
  return request({
    url: '/v1/delivery_area',
    method: 'post',
    params: {
      method: 'del.delivery.area.list'
    },
    data: {
      delivery_area_id
    }
  })
}

/**
 * 获取一个配送区域
 * @param {Number} delivery_area_id
 * @returns
 */
export function getDeliveryAreaItem(delivery_area_id) {
  return request({
    url: '/v1/delivery_area',
    method: 'post',
    params: {
      method: 'get.delivery.area.item'
    },
    data: {
      delivery_area_id
    }
  })
}

/**
 * 获取配送区域列表
 * @param {Object} data
 * @returns
 */
export function getDeliveryAreaList(data) {
  return request({
    url: '/v1/delivery_area',
    method: 'post',
    params: {
      method: 'get.delivery.area.list'
    },
    data
  })
}
