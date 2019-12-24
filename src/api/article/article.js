import request from '@/utils/request'

/**
 * 添加一篇文章
 * @param {Object} data
 * @returns
 */
export function addArticleItem(data) {
  return request({
    url: '/v1/article',
    method: 'post',
    params: {
      method: 'create'
    },
    data
  })
}

/**
 * 编辑一篇文章
 * @param {Object} data
 * @returns
 */
export function setArticleItem(data) {
  return request({
    url: '/v1/article',
    method: 'post',
    params: {
      method: 'update'
    },
    data
  })
}

/**
 * 批量删除文章
 * @param {Array} article_id
 * @returns
 */
export function delArticleList(article_id) {
  return request({
    url: '/v1/article',
    method: 'post',
    params: {
      method: 'delete'
    },
    data: {
      article_id
    }
  })
}

/**
 * 获取一篇文章
 * @param {Number} article_id
 * @returns
 */
export function getArticleItem(article_id) {
  return request({
    url: '/v1/article',
    method: 'post',
    params: {
      method: 'info'
    },
    data: {
      article_id
    }
  })
}

/**
 * 获取文章列表
 * @param {Object} data
 * @returns
 */
export function getArticleList(data) {
  return request({
    url: '/v1/article',
    method: 'post',
    params: {
      method: 'list'
    },
    data
  })
}

/**
 * 批量设置文章置顶
 * @param {Array} article_id
 * @param {Number} is_top
 * @returns
 */
export function setArticleTop(article_id, is_top) {
  return request({
    url: '/v1/article',
    method: 'post',
    params: {
      method: 'update_top'
    },
    data: {
      article_id,
      is_top
    }
  })
}

/**
 * 批量设置文章是否显示
 * @param {Array} article_id
 * @param {Number} status
 * @returns
 */
export function setArticleStatus(article_id, status) {
  return request({
    url: '/v1/article',
    method: 'post',
    params: {
      method: 'update_status'
    },
    data: {
      article_id,
      status
    }
  })
}
