import request from '@/utils/request'

/**
 * 获取一个通知系统
 * @param {String} code
 * @returns
 */
export function getNoticeItem(code) {
  return request({
    url: '/v1/notice',
    method: 'post',
    params: {
      method: 'get.notice.item'
    },
    data: {
      code
    }
  })
}

/**
 * 获取通知系统列表
 * @returns
 */
export function getNoticeList() {
  return request({
    url: '/v1/notice',
    method: 'post',
    params: {
      method: 'get.notice.list'
    }
  })
}

/**
 * 批量设置通知系统是否启用
 * @param {Array} code
 * @param {Number} status
 * @returns
 */
export function setNoticeStatus(code, status) {
  return request({
    url: '/v1/notice',
    method: 'post',
    params: {
      method: 'set.notice.status'
    },
    data: {
      code,
      status
    }
  })
}

/**
 * 设置一个通知系统
 * @param {Object} data
 * @returns
 */
export function setNoticeItem(data) {
  return request({
    url: '/v1/notice',
    method: 'post',
    params: {
      method: 'set.notice.item'
    },
    data
  })
}
