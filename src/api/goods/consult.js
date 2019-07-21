import request from '@/utils/request'

/**
 * 批量删除商品咨询
 * @param {Array} goods_consult_id
 * @returns {AxiosPromise}
 */
export function delGoodsConsultList(goods_consult_id) {
  return request({
    url: '/v1/goods_consult',
    method: 'post',
    params: {
      method: 'del.goods.consult.list'
    },
    data: {
      goods_consult_id
    }
  })
}

/**
 * 批量设置是否前台显示
 * @param {Array} goods_consult_id
 * @param {Number} is_show
 * @returns {AxiosPromise}
 */
export function setGoodsConsultShow(goods_consult_id, is_show) {
  return request({
    url: '/v1/goods_consult',
    method: 'post',
    params: {
      method: 'set.goods.consult.show'
    },
    data: {
      goods_consult_id,
      is_show
    }
  })
}

/**
 * 回复一个商品咨询
 * @param {Number} goods_consult_id
 * @param {String} content
 * @returns {AxiosPromise}
 */
export function replyGoodsConsultItem(goods_consult_id, content) {
  return request({
    url: '/v1/goods_consult',
    method: 'post',
    params: {
      method: 'reply.goods.consult.item'
    },
    data: {
      goods_consult_id,
      content
    }
  })
}

/**
 * 获取一个商品咨询问答明细
 * @param {Number} goods_consult_id
 * @returns {AxiosPromise}
 */
export function getGoodsConsultItem(goods_consult_id) {
  return request({
    url: '/v1/goods_consult',
    method: 'post',
    params: {
      method: 'get.goods.consult.item'
    },
    data: {
      goods_consult_id
    }
  })
}

/**
 * 获取商品咨询列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getGoodsConsultList(data) {
  return request({
    url: '/v1/goods_consult',
    method: 'post',
    params: {
      method: 'get.goods.consult.list'
    },
    data
  })
}
