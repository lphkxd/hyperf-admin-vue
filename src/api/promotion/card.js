import request from '@/utils/request'

/**
 * 添加一条购物卡
 * @param {Object} data
 * @returns
 */
export function addCardItem(data) {
  return request({
    url: '/v1/card',
    method: 'post',
    params: {
      method: 'add.card.item'
    },
    data
  })
}

/**
 * 编辑一条购物卡
 * @param {Object} data
 * @returns
 */
export function setCardItem(data) {
  return request({
    url: '/v1/card',
    method: 'post',
    params: {
      method: 'set.card.item'
    },
    data
  })
}

/**
 * 获取一条购物卡
 * @param {Number} card_id
 * @returns
 */
export function getCardItem(card_id) {
  return request({
    url: '/v1/card',
    method: 'post',
    params: {
      method: 'get.card.item'
    },
    data: {
      card_id
    }
  })
}

/**
 * 批量设置购物卡状态
 * @param {Array} card_id
 * @param {Number} status
 * @returns
 */
export function setCardStatus(card_id, status) {
  return request({
    url: '/v1/card',
    method: 'post',
    params: {
      method: 'set.card.status'
    },
    data: {
      card_id,
      status
    }
  })
}

/**
 * 批量删除购物卡
 * @param {Array} card_id
 * @returns
 */
export function delCardList(card_id) {
  return request({
    url: '/v1/card',
    method: 'post',
    params: {
      method: 'del.card.list'
    },
    data: {
      card_id
    }
  })
}

/**
 * 获取购物卡列表
 * @param {Object} data
 * @returns
 */
export function getCardList(data) {
  return request({
    url: '/v1/card',
    method: 'post',
    params: {
      method: 'get.card.list'
    },
    data
  })
}
