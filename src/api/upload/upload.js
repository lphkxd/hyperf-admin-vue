import request from '@/utils/request'

/**
 * 获取上传模块列表
 */
export function getUploadModule() {
  return request({
    url: '/v1/upload',
    method: 'post',
    params: {
      method: 'get.upload.module'
    }
  })
}

/**
 * 获取上传地址
 * @param {String} module
 */
export function getUploadUrl(module = null) {
  return request({
    url: '/v1/upload',
    method: 'post',
    params: {
      method: 'get.upload.url'
    },
    data: {
      module
    }
  })
}

/**
 * 获取上传Token
 * @param {String} module
 * @param {String} type
 */
export function getUploadToken(module = null, type = 'web') {
  return request({
    url: '/v1/upload',
    method: 'post',
    params: {
      method: 'get.upload.token'
    },
    data: {
      module,
      type
    }
  })
}

/**
 * 替换上传资源
 * @param {Number} storage_id
 */
export function replaceUploadItem(storage_id) {
  return request({
    url: '/v1/upload',
    method: 'post',
    params: {
      method: 'replace.upload.item'
    },
    data: {
      storage_id
    }
  })
}
