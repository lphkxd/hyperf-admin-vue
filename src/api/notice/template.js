import request from '@/utils/request'

/**
 * 获取一个通知系统模板
 * @param {Number} notice_tpl_id
 * @returns {AxiosPromise}
 */
export function getNoticeTplItem(notice_tpl_id) {
  return request({
    url: '/v1/notice_tpl',
    method: 'post',
    params: {
      method: 'get.notice.tpl.item'
    },
    data: {
      notice_tpl_id
    }
  })
}

/**
 * 获取通知系统模板列表
 * @param {String} code
 * @returns {AxiosPromise}
 */
export function getNoticeTplList(code) {
  return request({
    url: '/v1/notice_tpl',
    method: 'post',
    params: {
      method: 'get.notice.tpl.list'
    },
    data: {
      code
    }
  })
}

/**
 * 编辑一个通知系统模板
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setNoticeTplItem(data) {
  return request({
    url: '/v1/notice_tpl',
    method: 'post',
    params: {
      method: 'set.notice.tpl.item'
    },
    data
  })
}

/**
 * 批量设置通知系统模板是否启用
 * @param {Array} notice_tpl_id
 * @param {Number} status
 * @returns {AxiosPromise}
 */
export function setNoticeTplStatus(notice_tpl_id, status) {
  return request({
    url: '/v1/notice_tpl',
    method: 'post',
    params: {
      method: 'set.notice.tpl.status'
    },
    data: {
      notice_tpl_id,
      status
    }
  })
}
