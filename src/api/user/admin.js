import request from '@/utils/request'

/**
 * 账号登录，并且获取授权码
 * @param {String} username
 * @param {String} password
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

/**
 * 修改一个账号密码
 * @param {Object} data
 */
export function setAdminPassword(data) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'set.admin.password'
    },
    data
  })
}

/**
 *  验证账号是否合法
 * @param {String} username
 */
export function checkAdminUsername(username) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'check.admin.username'
    },
    data: {
      username
    }
  })
}

/**
 * 验证账号昵称是否合法
 * @param {String} nickname
 */
export function checkAdminNickname(nickname) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'check.admin.nickname'
    },
    data: {
      nickname
    }
  })
}

/**
 * 添加一个账号
 * @param {Object} data
 */
export function addAdminItem(data) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'add.admin.item'
    },
    data
  })
}

/**
 * 编辑一个账号
 * @param {Object} data
 */
export function setAdminItem(data) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'set.admin.item'
    },
    data
  })
}

/**
 * 批量设置账号状态
 * @param {Array} client_id
 * @param {Number} status
 */
export function setAdminStatus(client_id, status) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'set.admin.status'
    },
    data: {
      client_id,
      status
    }
  })
}

/**
 * 重置一个账号密码
 * @param {Number} client_id
 */
export function resetAdminItem(client_id) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'reset.admin.item'
    },
    data: {
      client_id
    }
  })
}

/**
 * 批量删除账号
 * @param {Array} client_id
 */
export function delAdminList(client_id) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'del.admin.list'
    },
    data: {
      client_id
    }
  })
}

/**
 * 获取一个账号
 * @param {Number} client_id
 */
export function getAdminItem(client_id) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'get.admin.item'
    },
    data: {
      client_id
    }
  })
}

/**
 * 获取账号列表
 * @param {Object} data
 */
export function getAdminList(data) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'get.admin.list'
    },
    data
  })
}
