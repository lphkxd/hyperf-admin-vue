import request from '@/utils/request'

/**
 * 根据权限获取菜单列表
 * @param data
 */
export function getMenuAuthList(data) {
  return request({
    url: '/v1/menu',
    method: 'post',
    params: {
      method: 'get.menu.auth.list',
      module: 'admin'
    },
    data
  })
}
