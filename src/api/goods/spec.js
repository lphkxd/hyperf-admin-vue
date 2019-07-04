import request from '@/utils/request'

/**
 * 添加一个商品规格
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addGoodsSpecItem(data) {
  return request({
    url: '/v1/spec',
    method: 'post',
    params: {
      method: 'add.goods.spec.item'
    },
    data
  })
}

/**
 * 编辑一个商品规格
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setGoodsSpecItem(data) {
  return request({
    url: '/v1/spec',
    method: 'post',
    params: {
      method: 'set.goods.spec.item'
    },
    data
  })
}

/**
 * 获取一条商品规格
 * @param {Number} spec_id
 * @returns {AxiosPromise}
 */
export function getGoodsSpecItem(spec_id) {
  return request({
    url: '/v1/spec',
    method: 'post',
    params: {
      method: 'get.goods.spec.item'
    },
    data: {
      spec_id
    }
  })
}

/**
 * 获取商品规格列表
 * @param {Number} goods_type_id
 * @returns {AxiosPromise}
 */
export function getGoodsSpecList(goods_type_id) {
  return request({
    url: '/v1/spec',
    method: 'post',
    params: {
      method: 'get.goods.spec.list'
    },
    data: {
      goods_type_id
    }
  })
}

/**
 * 批量删除商品规格
 * @param {Array} spec_id
 * @returns {AxiosPromise}
 */
export function delGoodsSpecList(spec_id) {
  return request({
    url: '/v1/spec',
    method: 'post',
    params: {
      method: 'del.goods.spec.list'
    },
    data: {
      spec_id
    }
  })
}

/**
 * 批量设置商品规格检索
 * @param {Array} spec_id
 * @param {Number} spec_index
 * @returns {AxiosPromise}
 */
export function setGoodsSpecKey(spec_id, spec_index) {
  return request({
    url: '/v1/spec',
    method: 'post',
    params: {
      method: 'set.goods.spec.key'
    },
    data: {
      spec_id,
      spec_index
    }
  })
}

/**
 * 设置商品规格排序
 * @param {Number} spec_id
 * @param {Number} sort
 * @returns {AxiosPromise}
 */
export function setGoodsSpecSort(spec_id, sort) {
  return request({
    url: '/v1/spec',
    method: 'post',
    params: {
      method: 'set.goods.spec.sort'
    },
    data: {
      spec_id,
      sort
    }
  })
}
