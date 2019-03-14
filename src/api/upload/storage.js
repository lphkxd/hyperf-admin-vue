import request from '@/utils/request'

/**
 * 添加一个资源目录
 * @param {Object} data
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
 */
export function getStorageDirectoryDelect(order_type = 'asc', order_field = 'storage_id') {
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
 */
export function setStorageDirectoryDefault(storage_id) {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'set.storage.directory.default'
    },
    data: {
      storage_id
    }
  })
}

/**
 * 获取一个资源或资源目录
 * @param {Number} storage_id
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
 * 获取导航数据
 * @param {Number} storage_id
 * @param {Number} is_layer
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
 */
export function coverStorageItem(storage_id) {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'cover.storage.item'
    },
    data: {
      storage_id
    }
  })
}

/**
 * 验证是否允许移动到指定目录
 * @param {Array} storage_id
 * @param {Number} parent_id
 */
export function checkStorageMove(storage_id, parent_id) {
  return request({
    url: '/v1/storage',
    method: 'post',
    params: {
      method: 'check.storage.move'
    },
    data: {
      storage_id,
      parent_id
    }
  })
}

/**
 * 批量移动资源到指定目录
 * @param {Array} storage_id
 * @param {Number} parent_id
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
