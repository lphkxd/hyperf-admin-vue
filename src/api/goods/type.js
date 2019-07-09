import request from '@/utils/request'

/**
 * 添加一个商品模型
 * @param {String} type_name
 * @returns {AxiosPromise}
 */
export function addGoodsTypeItem(type_name) {
  return request({
    url: '/v1/goods_type',
    method: 'post',
    params: {
      method: 'add.goods.type.item'
    },
    data: {
      type_name
    }
  })
}

/**
 * 编辑一个商品模型
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setGoodsTypeItem(data) {
  return request({
    url: '/v1/goods_type',
    method: 'post',
    params: {
      method: 'set.goods.type.item'
    },
    data
  })
}

/**
 * 批量删除商品模型
 * @param {Array} goods_type_id
 * @returns {AxiosPromise}
 */
export function delGoodsTypeList(goods_type_id) {
  return request({
    url: '/v1/goods_type',
    method: 'post',
    params: {
      method: 'del.goods.type.list'
    },
    data: {
      goods_type_id
    }
  })
}

/**
 * 查询商品模型名称是否已存在
 * @param {String} type_name
 * @param {Number} exclude_id
 * @returns {AxiosPromise}
 */
export function uniqueGoodsTypeName(type_name, exclude_id) {
  return request({
    url: '/v1/goods_type',
    method: 'post',
    params: {
      method: 'unique.goods.type.name'
    },
    data: {
      type_name,
      exclude_id
    }
  })
}

/**
 * 获取一个商品模型
 * @param {Number} goods_type_id
 * @returns {AxiosPromise}
 */
export function getGoodsTypeItem(goods_type_id) {
  return request({
    url: '/v1/goods_type',
    method: 'post',
    params: {
      method: 'get.goods.type.item'
    },
    data: {
      goods_type_id
    }
  })
}

/**
 * 获取商品模型列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getGoodsTypeList(data) {
  return request({
    url: '/v1/goods_type',
    method: 'post',
    params: {
      method: 'get.goods.type.list'
    },
    data
  })
}

/**
 * 获取商品模型选择列表
 * @returns {AxiosPromise}
 */
export function getGoodsTypeSelect() {
  return request({
    url: '/v1/goods_type',
    method: 'post',
    params: {
      method: 'get.goods.type.select'
    }
  })
}
