import request from '@/utils/request'

/**
 * 账号登录，并且获取授权码
 * @param username
 * @param password
 */
export function loginAdminUser(username, password) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'login.admin.user',
      platform: 'admin'
    },
    data: {
      username,
      password
    }
  })
}

/**
 * 注销当前已登录的账号
 */
export function logoutAdminUser() {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'logout.admin.user'
    }
  })
}
