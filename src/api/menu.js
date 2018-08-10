const url = '/v1/menu/'

/**
 * 根据权限获取菜单列表
 * @param data
 */
export function getMenuAuthList(data) {
  return this.$axios({
    method: 'post',
    url,
    params: { method: 'get.menu.auth.list' },
    data: { data }
  })
}
