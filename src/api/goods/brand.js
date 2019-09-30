import request from '@/utils/request'

/**
 * 添加一个品牌
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addBrandItem(data) {
  return request({
    url: '/v1/brand',
    method: 'post',
    params: {
      method: 'add.brand.item'
    },
    data
  })
}

/**
 * 编辑一个品牌
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setBrandItem(data) {
  return request({
    url: '/v1/brand',
    method: 'post',
    params: {
      method: 'set.brand.item'
    },
    data
  })
}

/**
 * 批量删除品牌
 * @param {Array} brand_id
 * @returns {AxiosPromise}
 */
export function delBrandList(brand_id) {
  return request({
    url: '/v1/brand',
    method: 'post',
    params: {
      method: 'del.brand.list'
    },
    data: {
      brand_id
    }
  })
}

/**
 * 批量设置品牌是否显示
 * @param {Array} brand_id
 * @param {Number} status
 * @returns {AxiosPromise}
 */
export function setBrandStatus(brand_id, status) {
  return request({
    url: '/v1/brand',
    method: 'post',
    params: {
      method: 'set.brand.status'
    },
    data: {
      brand_id,
      status
    }
  })
}

/**
 * 验证品牌名称是否唯一
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function uniqueBrandName(data) {
  return request({
    url: '/v1/brand',
    method: 'post',
    params: {
      method: 'unique.brand.name'
    },
    data
  })
}

/**
 * 获取一个品牌
 * @param {Number} brand_id
 * @returns {AxiosPromise}
 */
export function getBrandItem(brand_id) {
  return request({
    url: '/v1/brand',
    method: 'post',
    params: {
      method: 'get.brand.item'
    },
    data: {
      brand_id
    }
  })
}

/**
 * 获取品牌列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getBrandList(data) {
  return request({
    url: '/v1/brand',
    method: 'post',
    params: {
      method: 'get.brand.list'
    },
    data
  })
}

/**
 * 获取品牌选择列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getBrandSelect(data) {
  return request({
    url: '/v1/brand',
    method: 'post',
    params: {
      method: 'get.brand.select'
    },
    data
  })
}

/**
 * 设置品牌排序
 * @param {Number} brand_id
 * @param {Number} sort
 * @returns {AxiosPromise}
 */
export function setBrandSort(brand_id, sort) {
  return request({
    url: '/v1/brand',
    method: 'post',
    params: {
      method: 'set.brand.sort'
    },
    data: {
      brand_id,
      sort
    }
  })
}
