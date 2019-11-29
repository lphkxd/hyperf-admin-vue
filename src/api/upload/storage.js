import request from '@/utils/request'

/**
 * 添加一个资源目录
 * @param {Object} data
 * @returns
 */
export function addStorageDirectoryItem(data) {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'add.storage.directory.item'
    },
    data
  })
}

/**
 * 编辑一个资源目录
 * @param {Object} data
 * @returns
 */
export function setStorageDirectoryItem(data) {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'set.storage.directory.item'
    },
    data
  })
}

/**
 * 获取资源目录选择列表
 * @param {String} order_type
 * @param {String} order_field
 * @returns
 */
export function getStorageDirectorySelect(order_type = 'desc', order_field = 'storage_id') {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'get.storage.directory.select'
    },
    data: {
      order_type,
      order_field
    }
  })
}

/**
 * 将资源目录标设为默认目录
 * @param {Number} storage_id
 * @param {Number} is_default
 * @returns
 */
export function setStorageDirectoryDefault(storage_id, is_default) {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'set.storage.directory.default'
    },
    data: {
      storage_id,
      is_default
    }
  })
}

/**
 * 获取一个资源或资源目录
 * @param {Number} storage_id
 * @returns
 */
export function getStorageItem(storage_id) {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'get.storage.item'
    },
    data: {
      storage_id
    }
  })
}

/**
 * 获取资源列表
 * @param {Object} data
 * @returns
 */
export function getStorageList(data) {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'get.storage.list'
    },
    data
  })
}

/**
 * 根据资源编号获取集合
 * @param {Object} data
 * @returns
 */
export function getStorageCollection(data) {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'get.storage.collection'
    },
    data
  })
}

/**
 * 获取导航数据
 * @param {Number} storage_id
 * @param {Number} is_layer
 * @returns
 */
export function getStorageNavi(storage_id, is_layer = 1) {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'get.storage.navi'
    },
    data: {
      storage_id,
      is_layer
    }
  })
}

/**
 * 重命名一个资源
 * @param {Number} storage_id
 * @param {String} name
 * @returns
 */
export function renameStorageItem(storage_id, name) {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'rename.storage.item'
    },
    data: {
      storage_id,
      name
    }
  })
}

/**
 * 将图片资源设为目录封面
 * @param {Number} storage_id
 * @param {Number} parent_id
 * @returns
 */
export function setStorageCover(storage_id, parent_id) {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'set.storage.cover'
    },
    data: {
      storage_id,
      parent_id
    }
  })
}

/**
 * 清除目录资源的封面
 * @param {Number} storage_id
 * @returns
 */
export function clearStorageCover(storage_id) {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'clear.storage.cover'
    },
    data: {
      storage_id
    }
  })
}

/**
 * 批量移动资源到指定目录
 * @param {Array} storage_id
 * @param {Number} parent_id
 * @returns
 */
export function moveStorageList(storage_id, parent_id) {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'move.storage.list'
    },
    data: {
      storage_id,
      parent_id
    }
  })
}

/**
 * 获取资源缩略图
 * @param {Object} data
 * @returns
 */
export function getStorageThumb(data) {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'get.storage.thumb'
    },
    data
  })
}

/**
 * 获取资源缩略图实际路径
 * @param {Object} data
 * @returns
 */
export function getStorageThumbUrl(data) {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'get.storage.thumb.url'
    },
    data
  })
}

/**
 * 获取资源缩略图信息
 * @param {String} url
 * @param {String} source
 * @returns
 */
export function getStorageThumbInfo(url, source) {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'get.storage.thumb.info'
    },
    data: {
      url,
      source
    }
  })
}

/**
 * 批量删除资源
 * @param {Array} storage_id
 * @returns
 */
export function delStorageList(storage_id) {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'del.storage.list'
    },
    data: {
      storage_id
    }
  })
}

/**
 * 清除图片资源缓存
 * @param {Number} storage_id
 * @returns
 */
export function clearStorageThumb(storage_id) {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'clear.storage.thumb'
    },
    data: {
      storage_id
    }
  })
}
