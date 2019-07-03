import request from '@/utils/request'

/**
 * 添加一张优惠劵
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addCouponItem(data) {
  return request({
    url: '/v1/coupon',
    method: 'post',
    params: {
      method: 'add.coupon.item'
    },
    data
  })
}

/**
 * 编辑一张优惠劵
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setCouponItem(data) {
  return request({
    url: '/v1/coupon',
    method: 'post',
    params: {
      method: 'set.coupon.item'
    },
    data
  })
}

/**
 * 获取一张优惠劵
 * @param {Number} coupon_id
 * @returns {AxiosPromise}
 */
export function getCouponItem(coupon_id) {
  return request({
    url: '/v1/coupon',
    method: 'post',
    params: {
      method: 'get.coupon.item'
    },
    data: {
      coupon_id
    }
  })
}

/**
 * 获取优惠劵列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getCouponList(data) {
  return request({
    url: '/v1/coupon',
    method: 'post',
    params: {
      method: 'get.coupon.list'
    },
    data
  })
}

/**
 * 批量删除优惠劵
 * @param {Array} coupon_id
 * @returns {AxiosPromise}
 */
export function delCouponList(coupon_id) {
  return request({
    url: '/v1/coupon',
    method: 'post',
    params: {
      method: 'del.coupon.list'
    },
    data: {
      coupon_id
    }
  })
}

/**
 * 批量设置优惠劵状态
 * @param {Array} coupon_id
 * @param {Number} status
 * @returns {AxiosPromise}
 */
export function setCouponStatus(coupon_id, status) {
  return request({
    url: '/v1/coupon',
    method: 'post',
    params: {
      method: 'set.coupon.status'
    },
    data: {
      coupon_id,
      status
    }
  })
}

/**
 * 批量设置优惠劵是否失效
 * @param {Array} coupon_id
 * @param {Number} is_invalid
 * @returns {AxiosPromise}
 */
export function setCouponInvalid(coupon_id, is_invalid) {
  return request({
    url: '/v1/coupon',
    method: 'post',
    params: {
      method: 'set.coupon.invalid'
    },
    data: {
      coupon_id,
      is_invalid
    }
  })
}

/**
 * 获取当前可领取的优惠劵列表
 * @returns {AxiosPromise}
 */
export function getCouponActive() {
  return request({
    url: '/v1/coupon',
    method: 'post',
    params: {
      method: 'get.coupon.active'
    }
  })
}
