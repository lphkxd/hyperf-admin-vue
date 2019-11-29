import request from '@/utils/request'

/**
 * 批量设置购物卡是否有效
 * @param {Object} data
 * @returns
 */
export function setCardUseInvalid(data) {
  return request({
    url: '/v1/card_use',
    method: 'post',
    params: {
      method: 'set.card.use.invalid'
    },
    data
  })
}

/**
 * 导出生成的购物卡
 * @param {Number} card_id
 * @returns
 */
export function getCardUseExport(card_id) {
  return request({
    url: '/v1/card_use',
    method: 'post',
    params: {
      method: 'get.card.use.export'
    },
    data: {
      card_id
    }
  })
}

/**
 * 获取已绑定的购物卡
 * @param {Object} data
 * @returns
 */
export function getCardUseList(data) {
  return request({
    url: '/v1/card_use',
    method: 'post',
    params: {
      method: 'get.card.use.list'
    },
    data
  })
}
