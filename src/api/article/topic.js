import request from '@/utils/request'

/**
 * 添加一个专题
 * @param {Object} data
 * @returns
 */
export function addTopicItem(data) {
  return request({
    url: '/v1/topic',
    method: 'post',
    params: {
      method: 'create'
    },
    data
  })
}

/**
 * 编辑一个专题
 * @param {Object} data
 * @returns
 */
export function setTopicItem(data) {
  return request({
    url: '/v1/topic',
    method: 'post',
    params: {
      method: 'update'
    },
    data
  })
}

/**
 * 批量删除专题
 * @param {Array} topic_id
 * @returns
 */
export function delTopicList(topic_id) {
  return request({
    url: '/v1/topic',
    method: 'post',
    params: {
      method: 'delete'
    },
    data: {
      topic_id
    }
  })
}

/**
 * 获取一个专题
 * @param {Number} topic_id
 * @returns
 */
export function getTopicItem(topic_id) {
  return request({
    url: '/v1/topic',
    method: 'post',
    params: {
      method: 'info'
    },
    data: {
      topic_id
    }
  })
}

/**
 * 获取专题列表
 * @param {Object} data
 * @returns
 */
export function getTopicList(data) {
  return request({
    url: '/v1/topic',
    method: 'post',
    params: {
      method: 'list'
    },
    data
  })
}

/**
 * 批量设置专题是否显示
 * @param {Array} topic_id
 * @param {Number} status
 * @returns
 */
export function setTopicStatus(topic_id, status) {
  return request({
    url: '/v1/topic',
    method: 'post',
    params: {
      method: 'update_status'
    },
    data: {
      topic_id,
      status
    }
  })
}
