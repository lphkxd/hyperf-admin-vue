import request from '@/utils/request'

/**
 * 添加一个资源样式
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addStorageStyleItem(data) {
  return request({
    url: '/v1/storage_style',
    method: 'post',
    params: {
      method: 'add.storage.style.item'
    },
    data
  })
}

/**
 * 编辑一个资源样式
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setStorageStyleItem(data) {
  return request({
    url: '/v1/storage_style',
    method: 'post',
    params: {
      method: 'set.storage.style.item'
    },
    data
  })
}

/**
 * 获取一个资源样式
 * @param {Number} storage_style_id
 * @returns {AxiosPromise}
 */
export function getStorageStyleItem(storage_style_id) {
  return request({
    url: '/v1/storage_style',
    method: 'post',
    params: {
      method: 'get.storage.style.item'
    },
    data: {
      storage_style_id
    }
  })
}

/**
 * 获取资源样式列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getStorageStyleList(data) {
  return request({
    url: '/v1/storage_style',
    method: 'post',
    params: {
      method: 'get.storage.style.list'
    },
    data
  })
}

/**
 * 批量删除资源样式
 * @param {Array} storage_style_id
 * @returns {AxiosPromise}
 */
export function delStorageStyleList(storage_style_id) {
  return request({
    url: '/v1/storage_style',
    method: 'post',
    params: {
      method: 'del.storage.style.list'
    },
    data: {
      storage_style_id
    }
  })
}

/**
 * 批量设置资源样式状态
 * @param {Array} storage_style_id
 * @param {Number} status
 * @returns {AxiosPromise}
 */
export function setStorageStyleStatus(storage_style_id, status) {
  return request({
    url: '/v1/storage_style',
    method: 'post',
    params: {
      method: 'set.storage.style.status'
    },
    data: {
      storage_style_id,
      status
    }
  })
}
