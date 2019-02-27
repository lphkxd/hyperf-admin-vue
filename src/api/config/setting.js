import request from '@/utils/request'

/**
 * 获取某个模块的设置
 * @param {String} module
 * @param {String} code
 */
export function getSettingList(module, code = '') {
  return request({
    url: '/v1/setting',
    method: 'post',
    params: {
      method: 'get.setting.list'
    },
    data: {
      module,
      code
    }
  })
}
