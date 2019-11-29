import request from '@/utils/request'

/**
 * 向指定用户发放优惠劵
 * @param {Object} data
 * @returns
 */
export function giveCouponUser(data) {
  return request({
    url: '/v1/coupon_give',
    method: 'post',
    params: {
      method: 'give.coupon.user'
    },
    data
  })
}

/**
 * 生成线下优惠劵
 * @param {Number} coupon_id
 * @param {Number} give_number
 * @returns
 */
export function giveCouponLive(coupon_id, give_number) {
  return request({
    url: '/v1/coupon_give',
    method: 'post',
    params: {
      method: 'give.coupon.live'
    },
    data: {
      coupon_id,
      give_number
    }
  })
}

/**
 * 获取已领取优惠劵列表
 * @param {Object} data
 * @returns
 */
export function getCouponGiveList(data) {
  return request({
    url: '/v1/coupon_give',
    method: 'post',
    params: {
      method: 'get.coupon.give.list'
    },
    data
  })
}

/**
 * 批量删除已领取优惠劵
 * @param {Array} coupon_give_id
 * @returns
 */
export function delCouponGiveList(coupon_give_id) {
  return request({
    url: '/v1/coupon_give',
    method: 'post',
    params: {
      method: 'del.coupon.give.list'
    },
    data: {
      coupon_give_id
    }
  })
}

/**
 * 批量恢复已删优惠劵
 * @param {Array} coupon_give_id
 * @returns
 */
export function recCouponGiveList(coupon_give_id) {
  return request({
    url: '/v1/coupon_give',
    method: 'post',
    params: {
      method: 'rec.coupon.give.list'
    },
    data: {
      coupon_give_id
    }
  })
}

/**
 * 导出线下生成的优惠劵
 * @param {Number} coupon_id
 * @returns
 */
export function getCouponGiveExport(coupon_id) {
  return request({
    url: '/v1/coupon_give',
    method: 'post',
    params: {
      method: 'get.coupon.give.export'
    },
    data: {
      coupon_id
    }
  })
}
