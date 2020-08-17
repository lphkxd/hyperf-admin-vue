import request from '@/utils/request'

/**
 * @description 首页 -- 主要数据*/
export function mainDataApi() {
  return request.get('statistics_demo/main')
}
/**
 * @description 首页 -- 支付订单
 */
export function orderApi(data) {
  return request.get('statistics_demo/order', data)
}
/**
 * @description 首页 -- 成交客户
 */
export function customerApi(data) {
  return request.get('statistics_demo/user', data)
}
/**
 * @description 首页 -- 成交客户比例
 */
export function customerRatioApi(data) {
  return request.get('statistics_demo/user_rate', data)
}
/**
 * @description 首页 -- 商品支付排行
 */
export function rankingApi(data) {
  return request.get('statistics_demo/product', data)
}
/**
 * @description 首页 -- 商品访客排行
 */
export function visitorRankingApi(data) {
  return request.get('statistics_demo/product_visit', data)
}
/**
 * @description 首页 -- 商品加购排行
 */
export function ProductPlusApi(data) {
  return request.get('statistics_demo/product_cart', data)
}

