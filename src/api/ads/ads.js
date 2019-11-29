import request from '@/utils/request'

/**
 * 添加一个广告
 * @param {Object} data
 * @returns
 */
export function addAdsItem(data) {
  return request({
    url: '/v1/ads',
    method: 'post',
    params: {
      method: 'add.ads.item'
    },
    data
  })
}

/**
 * 编辑一个广告
 * @param {Object} data
 * @returns
 */
export function setAdsItem(data) {
  return request({
    url: '/v1/ads',
    method: 'post',
    params: {
      method: 'set.ads.item'
    },
    data
  })
}

/**
 * 设置广告排序
 * @param {Number} ads_id
 * @param {Number} sort
 * @returns
 */
export function setAdsSort(ads_id, sort) {
  return request({
    url: '/v1/ads',
    method: 'post',
    params: {
      method: 'set.ads.sort'
    },
    data: {
      ads_id,
      sort
    }
  })
}

/**
 * 批量删除广告
 * @param {Array} ads_id
 * @returns
 */
export function delAdsList(ads_id) {
  return request({
    url: '/v1/ads',
    method: 'post',
    params: {
      method: 'del.ads.list'
    },
    data: {
      ads_id
    }
  })
}

/**
 * 批量设置是否显示
 * @param {Array} ads_id
 * @param {Number} status
 * @returns
 */
export function setAdsStatus(ads_id, status) {
  return request({
    url: '/v1/ads',
    method: 'post',
    params: {
      method: 'set.ads.status'
    },
    data: {
      ads_id,
      status
    }
  })
}

/**
 * 获取一个广告
 * @param {Number} ads_id
 * @returns
 */
export function getAdsItem(ads_id) {
  return request({
    url: '/v1/ads',
    method: 'post',
    params: {
      method: 'get.ads.item'
    },
    data: {
      ads_id
    }
  })
}

/**
 * 获取广告列表
 * @param {Object} data
 * @returns
 */
export function getAdsList(data) {
  return request({
    url: '/v1/ads',
    method: 'post',
    params: {
      method: 'get.ads.list'
    },
    data
  })
}
