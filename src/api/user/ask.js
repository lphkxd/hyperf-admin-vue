import request from '@/utils/request'

/**
 * 删除一条记录
 * @param {Number} ask_id
 * @returns {AxiosPromise}
 */
export function delAskItem(ask_id) {
  return request({
    url: '/v1/ask',
    method: 'post',
    params: {
      method: 'del.ask.item'
    },
    data: {
      ask_id
    }
  })
}

/**
 * 回复一个提问
 * @param {Number} ask_id
 * @param {string} answer
 * @returns {AxiosPromise}
 */
export function replyAskItem(ask_id, answer) {
  return request({
    url: '/v1/ask',
    method: 'post',
    params: {
      method: 'reply.ask.item'
    },
    data: {
      ask_id,
      answer
    }
  })
}

/**
 * 获取一个问答明细
 * @param {Number} ask_id
 * @returns {AxiosPromise}
 */
export function getAskItem(ask_id) {
  return request({
    url: '/v1/ask',
    method: 'post',
    params: {
      method: 'get.ask.item'
    },
    data: {
      ask_id
    }
  })
}

/**
 * 获取问答主题列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getAskList(data) {
  return request({
    url: '/v1/ask',
    method: 'post',
    params: {
      method: 'get.ask.list'
    },
    data
  })
}
