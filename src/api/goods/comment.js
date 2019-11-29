import request from '@/utils/request'

/**
 * 顾客对商品的评价管理组成员可对其进行回复，可回复多条（追加评价）。
 * @param {Object} data
 * @returns
 */
export function replyGoodsCommentItem(data) {
  return request({
    url: '/v1/goods_comment',
    method: 'post',
    params: {
      method: 'reply.goods.comment.item'
    },
    data
  })
}

/**
 * 删除任意一条商品评价(主评,主回,追评,追回)
 * @param {Number} goods_comment_id
 * @returns
 */
export function delGoodsCommentItem(goods_comment_id) {
  return request({
    url: '/v1/goods_comment',
    method: 'post',
    params: {
      method: 'del.goods.comment.item'
    },
    data: {
      goods_comment_id
    }
  })
}

/**
 * 获取一个商品评价得分
 * @param {Number} goods_id
 * @returns
 */
export function getGoodsCommentScore(goods_id) {
  return request({
    url: '/v1/goods_comment',
    method: 'post',
    params: {
      method: 'get.goods.comment.score'
    },
    data: {
      goods_id
    }
  })
}

/**
 * 批量设置是否前台显示（只对主评有效）
 * @param {Array} goods_comment_id
 * @param {Number} is_show
 * @returns
 */
export function setGoodsCommentShow(goods_comment_id, is_show) {
  return request({
    url: '/v1/goods_comment',
    method: 'post',
    params: {
      method: 'set.goods.comment.show'
    },
    data: {
      goods_comment_id,
      is_show
    }
  })
}

/**
 * 批量设置评价是否置顶（只对主评有效）
 * @param {Array} goods_comment_id
 * @param {Number} is_top
 * @returns
 */
export function setGoodsCommentTop(goods_comment_id, is_top) {
  return request({
    url: '/v1/goods_comment',
    method: 'post',
    params: {
      method: 'set.goods.comment.top'
    },
    data: {
      goods_comment_id,
      is_top
    }
  })
}

/**
 * 批量设置评价是否已读（只对主评有效）
 * @param {Array} goods_comment_id
 * @param {Number} status
 * @returns
 */
export function setGoodsCommentStatus(goods_comment_id, status) {
  return request({
    url: '/v1/goods_comment',
    method: 'post',
    params: {
      method: 'set.goods.comment.status'
    },
    data: {
      goods_comment_id,
      status
    }
  })
}

/**
 * 获取一个商品”全部”、”晒图”、”追评”、”好评”、”中评”、差评”的数量
 * @param {Number} goods_id
 * @returns
 */
export function getGoodsCommentCount(goods_id) {
  return request({
    url: '/v1/goods_comment',
    method: 'post',
    params: {
      method: 'get.goods.comment.count'
    },
    data: {
      goods_id
    }
  })
}

/**
 * 获取某个评价的明细
 * @param {Number} goods_comment_id
 * @returns
 */
export function getGoodsCommentItem(goods_comment_id) {
  return request({
    url: '/v1/goods_comment',
    method: 'post',
    params: {
      method: 'get.goods.comment.item'
    },
    data: {
      goods_comment_id
    }
  })
}

/**
 * 获取商品评价列表
 * @param {Object} data
 * @returns
 */
export function getGoodsCommentList(data) {
  return request({
    url: '/v1/goods_comment',
    method: 'post',
    params: {
      method: 'get.goods.comment.list'
    },
    data
  })
}
