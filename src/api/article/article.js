import request from '@/utils/request'

/**
 * 添加一篇文章
 * @param {Object} data
 */
export function addArticleItem(data) {
  return request({
    url: '/v1/article',
    method: 'post',
    params: {
      method: 'add.article.item'
    },
    data
  })
}

/**
 * 编辑一篇文章
 * @param {Object} data
 */
export function setArticleItem(data) {
  return request({
    url: '/v1/article',
    method: 'post',
    params: {
      method: 'set.article.item'
    },
    data
  })
}

/**
 * 批量删除文章
 * @param {Array} article_id
 */
export function delArticleList(article_id) {
  return request({
    url: '/v1/article',
    method: 'post',
    params: {
      method: 'del.article.list'
    },
    data: {
      article_id: article_id
    }
  })
}

/**
 * 获取一篇文章
 * @param {Number} article_id
 */
export function getArticleItem(article_id) {
  return request({
    url: '/v1/article',
    method: 'post',
    params: {
      method: 'get.article.item'
    },
    data: {
      article_id: article_id
    }
  })
}

/**
 * 获取文章列表
 * @param {Object} data
 */
export function getArticleList(data) {
  return request({
    url: '/v1/article',
    method: 'post',
    params: {
      method: 'get.article.list'
    },
    data
  })
}

/**
 * 批量设置文章置顶
 * @param {Array} article_id
 * @param {Number} is_top
 */
export function setArticleTop(article_id, is_top) {
  return request({
    url: '/v1/article',
    method: 'post',
    params: {
      method: 'set.article.top'
    },
    data: {
      article_id: article_id,
      is_top: is_top
    }
  })
}

/**
 * 批量设置文章是否显示
 * @param {Array} article_id
 * @param {Number} status
 */
export function setArticleStatus(article_id, status) {
  return request({
    url: '/v1/article',
    method: 'post',
    params: {
      method: 'set.article.status'
    },
    data: {
      article_id: article_id,
      status: status
    }
  })
}
