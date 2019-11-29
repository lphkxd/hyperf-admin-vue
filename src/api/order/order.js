import request from '@/utils/request'

/**
 * 获取一个订单
 * @param {String} order_no
 * @param {Number} is_get_log
 * @returns
 */
export function getOrderItem(order_no, is_get_log = 0) {
  return request({
    url: '/v1/order',
    method: 'post',
    params: {
      method: 'get.order.item'
    },
    data: {
      order_no,
      is_get_log
    }
  })
}

/**
 * 获取订单列表
 * @param {Object} data
 * @returns
 */
export function getOrderList(data) {
  return request({
    url: '/v1/order',
    method: 'post',
    params: {
      method: 'get.order.list'
    },
    data
  })
}

/**
 * 编辑一个订单
 * @param {Object} data
 * @returns
 */
export function setOrderItem(data) {
  return request({
    url: '/v1/order',
    method: 'post',
    params: {
      method: 'set.order.item'
    },
    data
  })
}

/**
 * 取消一个订单
 * @param {String} order_no
 * @returns
 */
export function cancelOrderItem(order_no) {
  return request({
    url: '/v1/order',
    method: 'post',
    params: {
      method: 'cancel.order.item'
    },
    data: {
      order_no
    }
  })
}

/**
 * 将订单放入回收站、还原或删除
 * @param {String} order_no
 * @param {Number} is_recycle
 * @returns
 */
export function recycleOrderItem(order_no, is_recycle) {
  return request({
    url: '/v1/order',
    method: 'post',
    params: {
      method: 'recycle.order.item'
    },
    data: {
      order_no,
      is_recycle
    }
  })
}

/**
 * 获取一个订单商品明细
 * @param {Number} order_goods_id
 * @returns
 */
export function getOrderGoodsItem(order_goods_id) {
  return request({
    url: '/v1/order',
    method: 'post',
    params: {
      method: 'get.order.goods.item'
    },
    data: {
      order_goods_id
    }
  })
}

/**
 * 获取订单各个状态合计数
 * @returns
 */
export function getOrderStatusTotal() {
  return request({
    url: '/v1/order',
    method: 'post',
    params: {
      method: 'get.order.status.total'
    }
  })
}

/**
 * 调整订单应付金额
 * @param {String} order_no
 * @param {Number} total_amount
 * @returns
 */
export function changePriceOrderItem(order_no, total_amount) {
  return request({
    url: '/v1/order',
    method: 'post',
    params: {
      method: 'change.price.order.item'
    },
    data: {
      order_no,
      total_amount
    }
  })
}

/**
 * 添加或编辑卖家备注
 * @param {String} order_no
 * @param {String} sellers_remark
 * @returns
 */
export function remarkOrderItem(order_no, sellers_remark) {
  return request({
    url: '/v1/order',
    method: 'post',
    params: {
      method: 'remark.order.item'
    },
    data: {
      order_no,
      sellers_remark
    }
  })
}

/**
 * 订单设为配货状态
 * @param {String} order_no
 * @returns
 */
export function pickingOrderItem(order_no) {
  return request({
    url: '/v1/order',
    method: 'post',
    params: {
      method: 'picking.order.item'
    },
    data: {
      order_no
    }
  })
}

/**
 * 订单设为发货状态
 * @param {Object} data
 * @returns
 */
export function deliveryOrderItem(data) {
  return request({
    url: '/v1/order',
    method: 'post',
    params: {
      method: 'delivery.order.item'
    },
    data
  })
}

/**
 * 订单确认收货。(卖家也可进行此操作)
 * @param {String} order_no
 * @returns
 */
export function completeOrderItem(order_no) {
  return request({
    url: '/v1/order',
    method: 'post',
    params: {
      method: 'complete.order.item'
    },
    data: {
      order_no
    }
  })
}

/**
 * 未付款订单超时自动取消
 * @returns
 */
export function timeoutOrderCancel() {
  return request({
    url: '/v1/order',
    method: 'post',
    params: {
      method: 'timeout.order.cancel'
    }
  })
}

/**
 * 未确认收货订单超时自动完成
 * @returns
 */
export function timeoutOrderComplete() {
  return request({
    url: '/v1/order',
    method: 'post',
    params: {
      method: 'timeout.order.complete'
    }
  })
}
