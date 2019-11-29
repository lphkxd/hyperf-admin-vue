import request from '@/utils/request'

/**
 * 添加一个快递公司
 * @param {Object} data
 * @returns
 */
export function addDeliveryCompanyItem(data) {
  return request({
    url: '/v1/delivery_item',
    method: 'post',
    params: {
      method: 'add.delivery.company.item'
    },
    data
  })
}

/**
 * 编辑一个快递公司
 * @param {Object} data
 * @returns
 */
export function setDeliveryCompanyItem(data) {
  return request({
    url: '/v1/delivery_item',
    method: 'post',
    params: {
      method: 'set.delivery.company.item'
    },
    data
  })
}

/**
 * 批量删除快递公司
 * @param {Array} delivery_item_id
 * @returns
 */
export function delDeliveryCompanyList(delivery_item_id) {
  return request({
    url: '/v1/delivery_item',
    method: 'post',
    params: {
      method: 'del.delivery.company.list'
    },
    data: {
      delivery_item_id
    }
  })
}

/**
 * 获取一个快递公司
 * @param {Number} delivery_item_id
 * @returns
 */
export function getDeliveryCompanyItem(delivery_item_id) {
  return request({
    url: '/v1/delivery_item',
    method: 'post',
    params: {
      method: 'get.delivery.company.item'
    },
    data: {
      delivery_item_id
    }
  })
}

/**
 * 查询快递公司编码是否已存在
 * @param {String} code
 * @param {Number} type
 * @param {Number} exclude_id
 * @returns
 */
export function uniqueDeliveryCompanyCode(code, type, exclude_id = null) {
  return request({
    url: '/v1/delivery_item',
    method: 'post',
    params: {
      method: 'unique.delivery.company.code'
    },
    data: {
      code,
      type,
      exclude_id
    }
  })
}

/**
 * 获取快递公司列表
 * @param {Object} data
 * @returns
 */
export function getDeliveryCompanyList(data) {
  return request({
    url: '/v1/delivery_item',
    method: 'post',
    params: {
      method: 'get.delivery.company.list'
    },
    data
  })
}

/**
 * 获取快递公司选择列表
 * @param {Number} type
 * @returns
 */
export function getDeliveryCompanySelect(type = null) {
  return request({
    url: '/v1/delivery_item',
    method: 'post',
    params: {
      method: 'get.delivery.company.select'
    },
    data: {
      type
    }
  })
}

/**
 * 根据快递单号识别快递公司
 * @param {String} code
 * @returns
 */
export function getDeliveryCompanyRecognise(code) {
  return request({
    url: '/v1/delivery_item',
    method: 'post',
    params: {
      method: 'get.delivery.company.recognise'
    },
    data: {
      code
    }
  })
}

/**
 * 复制一个快递公司为「热门类型」
 * @param {Number} delivery_item_id
 * @returns
 */
export function copyDeliveryCompanyHot(delivery_item_id) {
  return request({
    url: '/v1/delivery_item',
    method: 'post',
    params: {
      method: 'copy.delivery.company.hot'
    },
    data: {
      delivery_item_id
    }
  })
}
