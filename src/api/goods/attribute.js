import request from '@/utils/request'

/**
 * 添加一个商品属性主体
 * @param {Object} data
 * @returns
 */
export function addGoodsAttributeBodyItem(data) {
  return request({
    url: '/v1/goods_attribute',
    method: 'post',
    params: {
      method: 'add.goods.attribute.body.item'
    },
    data
  })
}

/**
 * 编辑一个商品属性主体
 * @param {Object} data
 * @returns
 */
export function setGoodsAttributeBodyItem(data) {
  return request({
    url: '/v1/goods_attribute',
    method: 'post',
    params: {
      method: 'set.goods.attribute.body.item'
    },
    data
  })
}

/**
 * 获取一个商品属性主体
 * @param {Number} goods_attribute_id
 * @returns
 */
export function getGoodsAttributeBodyItem(goods_attribute_id) {
  return request({
    url: '/v1/goods_attribute',
    method: 'post',
    params: {
      method: 'get.goods.attribute.body.item'
    },
    data: {
      goods_attribute_id
    }
  })
}

/**
 * 获取商品属性主体列表
 * @param {Number} goods_type_id
 * @param {Number} attribute_all
 * @returns
 */
export function getGoodsAttributeBodyList(goods_type_id, attribute_all = 0) {
  return request({
    url: '/v1/goods_attribute',
    method: 'post',
    params: {
      method: 'get.goods.attribute.body.list'
    },
    data: {
      goods_type_id,
      attribute_all
    }
  })
}

/**
 * 添加一个商品属性
 * @param {Object} data
 * @returns
 */
export function addGoodsAttributeItem(data) {
  return request({
    url: '/v1/goods_attribute',
    method: 'post',
    params: {
      method: 'add.goods.attribute.item'
    },
    data
  })
}

/**
 * 编辑一个商品属性
 * @param {Object} data
 * @returns
 */
export function setGoodsAttributeItem(data) {
  return request({
    url: '/v1/goods_attribute',
    method: 'post',
    params: {
      method: 'set.goods.attribute.item'
    },
    data
  })
}

/**
 * 编辑一个商品属性
 * @param {Number} goods_attribute_id
 * @returns
 */
export function getGoodsAttributeItem(goods_attribute_id) {
  return request({
    url: '/v1/goods_attribute',
    method: 'post',
    params: {
      method: 'get.goods.attribute.item'
    },
    data: {
      goods_attribute_id
    }
  })
}

/**
 * 获取商品属性列表(可翻页)
 * @param {Object} data
 * @returns
 */
export function getGoodsAttributePage(data) {
  return request({
    url: '/v1/goods_attribute',
    method: 'post',
    params: {
      method: 'get.goods.attribute.page'
    },
    data
  })
}

/**
 * 获取商品属性列表
 * @param {Number} goods_type_id
 * @param {Number} attribute_all
 * @returns
 */
export function getGoodsAttributeList(goods_type_id, attribute_all = 0) {
  return request({
    url: '/v1/goods_attribute',
    method: 'post',
    params: {
      method: 'get.goods.attribute.list'
    },
    data: {
      goods_type_id,
      attribute_all
    }
  })
}

/**
 * 批量设置商品属性检索
 * @param {Array} goods_attribute_id
 * @param {Number} attr_index
 * @returns
 */
export function setGoodsAttributeKey(goods_attribute_id, attr_index) {
  return request({
    url: '/v1/goods_attribute',
    method: 'post',
    params: {
      method: 'set.goods.attribute.key'
    },
    data: {
      goods_attribute_id,
      attr_index
    }
  })
}

/**
 * 批量设置商品属性是否核心
 * @param {Array} goods_attribute_id
 * @param {Number} is_important
 * @returns
 */
export function setGoodsAttributeImportant(goods_attribute_id, is_important) {
  return request({
    url: '/v1/goods_attribute',
    method: 'post',
    params: {
      method: 'set.goods.attribute.important'
    },
    data: {
      goods_attribute_id,
      is_important
    }
  })
}

/**
 * 设置主体或属性的排序值
 * @param {Number} goods_attribute_id
 * @param {Number} sort
 * @returns
 */
export function setGoodsAttributeSort(goods_attribute_id, sort) {
  return request({
    url: '/v1/goods_attribute',
    method: 'post',
    params: {
      method: 'set.goods.attribute.sort'
    },
    data: {
      goods_attribute_id,
      sort
    }
  })
}

/**
 * 批量删除商品主体或属性
 * @param {Array} goods_attribute_id
 * @returns
 */
export function delGoodsAttributeList(goods_attribute_id) {
  return request({
    url: '/v1/goods_attribute',
    method: 'post',
    params: {
      method: 'del.goods.attribute.list'
    },
    data: {
      goods_attribute_id
    }
  })
}

/**
 * 获取基础数据索引列表
 * @param {Number} goods_type_id
 * @param {Number} attribute_all
 * @returns
 */
export function getGoodsAttributeData(goods_type_id, attribute_all = 0) {
  return request({
    url: '/v1/goods_attribute',
    method: 'post',
    params: {
      method: 'get.goods.attribute.data'
    },
    data: {
      goods_type_id,
      attribute_all
    }
  })
}
