import request from '@/utils/request'

/**
 * 获取二维码调用地址
 */
export function getQrcodeCallurl() {
  return request({
    url: '/v1/qrcode',
    method: 'post',
    params: {
      method: 'get.qrcode.callurl'
    }
  })
}

/**
 * 添加一个二维码
 * @param {Object} data
 */
export function addQrcodeItem(data) {
  return request({
    url: '/v1/qrcode',
    method: 'post',
    params: {
      method: 'add.qrcode.item'
    },
    data
  })
}

/**
 * 编辑一个二维码
 * @param {Object} data
 */
export function setQrcodeItem(data) {
  return request({
    url: '/v1/qrcode',
    method: 'post',
    params: {
      method: 'set.qrcode.item'
    },
    data
  })
}

/**
 * 获取一个二维码
 * @param {Number} qrcode_id
 */
export function getQrcodeConfig(qrcode_id) {
  return request({
    url: '/v1/qrcode',
    method: 'post',
    params: {
      method: 'get.qrcode.config'
    },
    data: {
      qrcode_id
    }
  })
}

/**
 * 获取二维码列表
 * @param {Object} data
 */
export function getQrcodeList(data) {
  return request({
    url: '/v1/qrcode',
    method: 'post',
    params: {
      method: 'get.qrcode.list'
    },
    data
  })
}

/**
 * 批量删除二维码
 * @param {Array} qrcode_id
 */
export function delQrcodeList(qrcode_id) {
  return request({
    url: '/v1/qrcode',
    method: 'post',
    params: {
      method: 'del.qrcode.list'
    },
    data: {
      qrcode_id
    }
  })
}
