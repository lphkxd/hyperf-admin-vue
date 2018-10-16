import request from '@/utils/request'

/**
 * 添加一条规则
 * @param {Array} data
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

