import request from '@/utils/request'

/**
 * 检测商品货号是否唯一
 * @param {String} goods_code
 * @param {Number} exclude_id
 * @returns
 */
export function uniqueGoodsCode(goods_code, exclude_id) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'unique.goods.code'
    },
    data: {
      goods_code,
      exclude_id
    }
  })
}

/**
 * 添加一个商品
 * @param {Object} data
 * @returns
 */
export function addGoodsItem(data) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'add.goods.item'
    },
    data
  })
}

/**
 * 编辑一个商品
 * @param {Object} data
 * @returns
 */
export function setGoodsItem(data) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'set.goods.item'
    },
    data
  })
}

/**
 * 获取一个商品
 * @param {Number} goods_id
 * @returns
 */
export function getGoodsItem(goods_id) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'get.goods.item'
    },
    data: {
      goods_id
    }
  })
}

/**
 * 批量删除或恢复商品(回收站)
 * @param {Array} goods_id
 * @param {Number} is_delete
 * @returns
 */
export function delGoodsList(goods_id, is_delete) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'del.goods.list'
    },
    data: {
      goods_id,
      is_delete
    }
  })
}

/**
 * 批量设置或关闭商品可积分抵扣
 * @param {Array} goods_id
 * @param {Number} is_integral
 * @returns
 */
export function setIntegralGoodsList(goods_id, is_integral) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'set.integral.goods.list'
    },
    data: {
      goods_id,
      is_integral
    }
  })
}

/**
 * 批量设置商品是否推荐
 * @param {Array} goods_id
 * @param {Number} is_recommend
 * @returns
 */
export function setRecommendGoodsList(goods_id, is_recommend) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'set.recommend.goods.list'
    },
    data: {
      goods_id,
      is_recommend
    }
  })
}

/**
 * 批量设置商品是否为新品
 * @param {Array} goods_id
 * @param {Number} is_new
 * @returns
 */
export function setNewGoodsList(goods_id, is_new) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'set.new.goods.list'
    },
    data: {
      goods_id,
      is_new
    }
  })
}

/**
 * 批量设置商品是否为热卖
 * @param {Array} goods_id
 * @param {Number} is_hot
 * @returns
 */
export function setHotGoodsList(goods_id, is_hot) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'set.hot.goods.list'
    },
    data: {
      goods_id,
      is_hot
    }
  })
}

/**
 * 批量设置商品是否上下架
 * @param {Array} goods_id
 * @param {Number} status
 * @returns
 */
export function setShelvesGoodsList(goods_id, status) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'set.shelves.goods.list'
    },
    data: {
      goods_id,
      status
    }
  })
}

/**
 * 获取指定商品的属性列表
 * @param {Number} goods_id
 * @returns
 */
export function getGoodsAttrList(goods_id) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'get.goods.attr.list'
    },
    data: {
      goods_id
    }
  })
}

/**
 * 获取指定商品的规格组合列表
 * @param {Number} goods_id
 * @returns
 */
export function getGoodsSpecList(goods_id) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'get.goods.spec.list'
    },
    data: {
      goods_id
    }
  })
}

/**
 * 获取指定商品的规格图
 * @param {Number} goods_id
 * @returns
 */
export function getGoodsSpecImage(goods_id) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'get.goods.spec.image'
    },
    data: {
      goods_id
    }
  })
}

/**
 * 获取管理后台商品列表
 * @param {Object} data
 * @returns
 */
export function getGoodsAdminList(data) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'get.goods.admin.list'
    },
    data
  })
}

/**
 * 设置商品排序
 * @param {Number} goods_id
 * @param {Number} sort
 * @returns
 */
export function setGoodsSort(goods_id, sort) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'set.goods.sort'
    },
    data: {
      goods_id,
      sort
    }
  })
}

/**
 * 获取商品关键词联想词
 * @param {String} keywords
 * @returns
 */
export function getGoodsKeywordsSuggest(keywords) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'get.goods.keywords.suggest'
    },
    data: {
      keywords
    }
  })
}

/**
 * 复制一个商品
 * @param {Number} goods_id
 * @returns
 */
export function copyGoodsItem(goods_id) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'copy.goods.item'
    },
    data: {
      goods_id
    }
  })
}

/**
 * 获取指定商品的属性配置数据
 * @param {Number} goods_id
 * @returns
 */
export function getGoodsAttrConfig(goods_id) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'get.goods.attr.config'
    },
    data: {
      goods_id
    }
  })
}

/**
 * 获取指定商品的规格配置数据
 * @param {Number} goods_id
 * @param {Number} key_to_array
 * @returns
 */
export function getGoodsSpecConfig(goods_id, key_to_array = 0) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'get.goods.spec.config'
    },
    data: {
      goods_id,
      key_to_array
    }
  })
}

/**
 * 获取指定商品的规格菜单数据
 * @param {Number} goods_id
 * @returns
 */
export function getGoodsSpecMenu(goods_id) {
  return request({
    url: '/v1/goods',
    method: 'post',
    params: {
      method: 'get.goods.spec.menu'
    },
    data: {
      goods_id
    }
  })
}
