import request from '@/utils/request'

/**
 * 添加一个文章分类
 * @param {Object} data
 * @returns
 */
export function addArticleCatItem(data) {
  return request({
    url: '/v1/article_cat',
    method: 'post',
    params: {
      method: 'create'
    },
    data
  })
}

/**
 * 编辑一个文章分类
 * @param {Object} data
 * @returns
 */
export function setArticleCatItem(data) {
  return request({
    url: '/v1/article_cat',
    method: 'post',
    params: {
      method: 'update'
    },
    data
  })
}

/**
 * 批量删除文章分类(支持检测是否存在子节点与关联文章)
 * @param {Array} article_cat_id
 * @param {Number} not_empty
 * @returns
 */
export function delArticleCatList(article_cat_id, not_empty = 0) {
  return request({
    url: '/v1/article_cat',
    method: 'post',
    params: {
      method: 'delete'
    },
    data: {
      article_cat_id,
      not_empty
    }
  })
}

/**
 * 获取一个文章分类
 * @param {Number} article_cat_id
 * @returns
 */
export function getArticleCatItem(article_cat_id) {
  return request({
    url: '/v1/article_cat',
    method: 'post',
    params: {
      method: 'info'
    },
    data: {
      article_cat_id
    }
  })
}

/**
 * 获取文章分类列表
 * @param {Object} data
 * @returns
 */
export function getArticleCatList(data) {
  return request({
    url: '/v1/article_cat',
    method: 'post',
    params: {
      method: 'list'
    },
    data
  })
}

/**
 * 获取分类导航数据
 * @param {Number} article_cat_id
 * @param {Number} is_layer
 * @returns
 */
export function getArticleCatNavi(article_cat_id = 0, is_layer = 1) {
  return request({
    url: '/v1/article_cat',
    method: 'post',
    params: {
      method: 'navi'
    },
    data: {
      article_cat_id,
      is_layer
    }
  })
}

/**
 * 设置文章分类排序
 * @param {Number} article_cat_id
 * @param {Number} sort
 * @returns
 */
export function setArticleCatSort(article_cat_id, sort) {
  return request({
    url: '/v1/article_cat',
    method: 'post',
    params: {
      method: 'update_sort'
    },
    data: {
      article_cat_id,
      sort
    }
  })
}

/**
 * 批量设置是否导航
 * @param {Array} article_cat_id
 * @param {Number} is_navi
 * @returns
 */
export function setArticleCatNavi(article_cat_id, is_navi) {
  return request({
    url: '/v1/article_cat',
    method: 'post',
    params: {
      method: 'update_navi'
    },
    data: {
      article_cat_id,
      is_navi
    }
  })
}

/**
 * 根据编号自动设置排序值
 * @param {Array} article_cat_id
 * @returns
 */
export function setArticleCatIndex(article_cat_id) {
  return request({
    url: '/v1/article_cat',
    method: 'post',
    params: {
      method: 'update_index'
    },
    data: {
      article_cat_id
    }
  })
}
