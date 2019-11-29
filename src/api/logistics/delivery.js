import request from '@/utils/request'

/**
 * 添加一个配送方式
 * @param {Object} data
 * @returns
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

/**
 * 编辑一个配送方式
 * @param {Object} data
 * @returns
 */
export function setDeliveryItem(data) {
  return request({
    url: '/v1/delivery',
    method: 'post',
    params: {
      method: 'set.delivery.item'
    },
    data
  })
}

/**
 * 批量删除配送方式
 * @param {Array} delivery_id
 * @returns
 */
export function delDeliveryList(delivery_id) {
  return request({
    url: '/v1/delivery',
    method: 'post',
    params: {
      method: 'del.delivery.list'
    },
    data: {
      delivery_id
    }
  })
}

/**
 * 获取一个配送方式
 * @param {Number} delivery_id
 * @returns
 */
export function getDeliveryItem(delivery_id) {
  return request({
    url: '/v1/delivery',
    method: 'post',
    params: {
      method: 'get.delivery.item'
    },
    data: {
      delivery_id
    }
  })
}

/**
 * 获取配送方式列表
 * @param {Object} data
 * @returns
 */
export function getDeliveryList(data) {
  return request({
    url: '/v1/delivery',
    method: 'post',
    params: {
      method: 'get.delivery.list'
    },
    data
  })
}

/**
 * 获取配送方式选择列表
 * @returns
 */
export function getDeliverySelect() {
  return request({
    url: '/v1/delivery',
    method: 'post',
    params: {
      method: 'get.delivery.select'
    }
  })
}

/**
 * 根据配送方式获取运费
 * @param {Object} data
 * @returns
 */
export function getDeliveryFreight(data) {
  return request({
    url: '/v1/delivery',
    method: 'post',
    params: {
      method: 'get.delivery.freight'
    },
    data
  })
}

/**
 * 批量设置配送方式状态
 * @param {Array} delivery_id
 * @param {Number} status
 * @returns
 */
export function setDeliveryStatus(delivery_id, status) {
  return request({
    url: '/v1/delivery',
    method: 'post',
    params: {
      method: 'set.delivery.status'
    },
    data: {
      delivery_id,
      status
    }
  })
}

/**
 * 验证快递公司编号是否已存在
 * @param {Number} delivery_item_id
 * @param {Number} exclude_id
 * @returns
 */
export function uniqueDeliveryItem(delivery_item_id, exclude_id) {
  return request({
    url: '/v1/delivery',
    method: 'post',
    params: {
      method: 'unique.delivery.item'
    },
    data: {
      delivery_item_id,
      exclude_id
    }
  })
}

/**
 * 设置配送方式排序
 * @param {Number} delivery_id
 * @param {Number} sort
 * @returns
 */
export function setDeliverySort(delivery_id, sort) {
  return request({
    url: '/v1/delivery',
    method: 'post',
    params: {
      method: 'set.delivery.sort'
    },
    data: {
      delivery_id,
      sort
    }
  })
}
