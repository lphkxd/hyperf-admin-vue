import request from '@/utils/request'

/**
 * 添加一条规则
 * @param {Object} data
 * @returns
 */
export function addAuthRuleItem(data) {
  return request({
    url: '/v1/auth_rule',
    method: 'post',
    params: {
      method: 'add.auth.rule.item'
    },
    data
  })
}

/**
 * 获取一条规则
 * @param {Number} rule_id
 * @returns
 */
export function getAuthRuleItem(rule_id) {
  return request({
    url: '/v1/auth_rule',
    method: 'post',
    params: {
      method: 'get.auth.rule.item'
    },
    data: {
      rule_id
    }
  })
}

/**
 * 编辑一条规则
 * @param {Object} data
 * @returns
 */
export function setAuthRuleItem(data) {
  return request({
    url: '/v1/auth_rule',
    method: 'post',
    params: {
      method: 'set.auth.rule.item'
    },
    data
  })
}

/**
 * 批量删除规则
 * @param {Array} rule_id
 * @returns
 */
export function delAuthRuleList(rule_id) {
  return request({
    url: '/v1/auth_rule',
    method: 'post',
    params: {
      method: 'del.auth.rule.list'
    },
    data: {
      rule_id
    }
  })
}

/**
 * 获取规则列表
 * @param {Object} data
 * @returns
 */
export function getAuthRuleList(data) {
  return request({
    url: '/v1/auth_rule',
    method: 'post',
    params: {
      method: 'get.auth.rule.list'
    },
    data
  })
}

/**
 * 批量设置规则状态
 * @param {Array} rule_id
 * @param {Number} status
 * @returns
 */
export function setAuthRuleStatus(rule_id, status) {
  return request({
    url: '/v1/auth_rule',
    method: 'post',
    params: {
      method: 'set.auth.rule.status'
    },
    data: {
      rule_id,
      status
    }
  })
}

/**
 * 设置规则排序
 * @param {Number} rule_id
 * @param {Number} sort
 * @returns
 */
export function setAuthRuleSort(rule_id, sort) {
  return request({
    url: '/v1/auth_rule',
    method: 'post',
    params: {
      method: 'set.auth.rule.sort'
    },
    data: {
      rule_id,
      sort
    }
  })
}

/**
 * 根据编号自动设置排序值
 * @param {Array} rule_id
 * @returns
 */
export function setAuthRuleIndex(rule_id) {
  return request({
    url: '/v1/auth_rule',
    method: 'post',
    params: {
      method: 'set.auth.rule.index'
    },
    data: {
      rule_id
    }
  })
}
