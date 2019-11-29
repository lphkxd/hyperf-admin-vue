import request from '@/utils/request'

/**
 * 批量删除商品评价的回复
 * @param {Array} goods_reply_id
 * @returns
 */
export function delGoodsReplyList(goods_reply_id) {
  return request({
    url: '/v1/goods_reply',
    method: 'post',
    params: {
      method: 'del.goods.reply.list'
    },
    data: {
      goods_reply_id
    }
  })
}

/**
 * 获取商品评价回复列表
 * @param {Object} data
 * @returns
 */
export function getGoodsReplyList(data) {
  return request({
    url: '/v1/goods_reply',
    method: 'post',
    params: {
      method: 'get.goods.reply.list'
    },
    data
  })
}
