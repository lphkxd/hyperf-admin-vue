import request from '@/utils/request'

/**
 * 添加一个订单促销
 * @param {Object} data
 * @returns
 */
export function addPromotionItem(data) {
  return request({
    url: '/v1/promotion',
    method: 'post',
    params: {
      method: 'add.promotion.item'
    },
    data
  })
}

/**
 * 编辑一个订单促销
 * @param {Object} data
 * @returns
 */
export function setPromotionItem(data) {
  return request({
    url: '/v1/promotion',
    method: 'post',
    params: {
      method: 'set.promotion.item'
    },
    data
  })
}

/**
 * 获取一个订单促销
 * @param {Number} promotion_id
 * @returns
 */
export function getPromotionItem(promotion_id) {
  return request({
    url: '/v1/promotion',
    method: 'post',
    params: {
      method: 'get.promotion.item'
    },
    data: {
      promotion_id
    }
  })
}

/**
 * 批量设置订单促销状态
 * @param {Array} promotion_id
 * @param {Number} status
 * @returns
 */
export function setPromotionStatus(promotion_id, status) {
  return request({
    url: '/v1/promotion',
    method: 'post',
    params: {
      method: 'set.promotion.status'
    },
    data: {
      promotion_id,
      status
    }
  })
}

/**
 * 批量删除订单促销
 * @param {Array} promotion_id
 * @returns
 */
export function delPromotionList(promotion_id) {
  return request({
    url: '/v1/promotion',
    method: 'post',
    params: {
      method: 'del.promotion.list'
    },
    data: {
      promotion_id
    }
  })
}

/**
 * 获取订单促销列表
 * @param {Object} data
 * @returns
 */
export function getPromotionList(data) {
  return request({
    url: '/v1/promotion',
    method: 'post',
    params: {
      method: 'get.promotion.list'
    },
    data
  })
}

/**
 * 获取正在进行的促销列表
 * @returns
 */
export function getPromotionActive() {
  return request({
    url: '/v1/promotion',
    method: 'post',
    params: {
      method: 'get.promotion.active'
    }
  })
}
