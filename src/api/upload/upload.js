import request from '@/utils/request'

/**
 * 获取上传模块列表
 * @returns {AxiosPromise}
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
 * @returns {AxiosPromise}
 */
export function getUploadUrl(module = undefined) {
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
 * @returns {AxiosPromise}
 */
export function getUploadToken(module = undefined, type = 'web') {
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
 * @returns {AxiosPromise}
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
