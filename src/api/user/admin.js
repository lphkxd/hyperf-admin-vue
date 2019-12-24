import request from '@/utils/request'

/**
 * 账号登录，并且获取授权码
 * @param {String} username
 * @param {String} password
 * @returns
 */
export function loginAdminUser(username, password) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'login',
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
 * @returns
 */
export function logoutAdminUser() {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'logout'
    }
  })
}

/**
 * 修改一个账号密码
 * @param {Object} data
 * @returns
 */
export function setAdminPassword(data) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'update_password'
    },
    data
  })
}

/**
 *  验证账号是否合法
 * @param {String} username
 * @returns
 */
export function checkAdminUsername(username) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'check_username'
    },
    data: {
      username
    }
  })
}

/**
 * 验证账号昵称是否合法
 * @param {String} nickname
 * @returns
 */
export function checkAdminNickname(nickname) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'check_nickname'
    },
    data: {
      nickname
    }
  })
}

/**
 * 添加一个账号
 * @param {Object} data
 * @returns
 */
export function addAdminItem(data) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'create'
    },
    data
  })
}

/**
 * 编辑一个账号
 * @param {Object} data
 * @returns
 */
export function setAdminItem(data) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'update'
    },
    data
  })
}

/**
 * 批量设置账号状态
 * @param {Array} admin_id
 * @param {Number} status
 * @returns
 */
export function setAdminStatus(admin_id, status) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'update_status'
    },
    data: {
      admin_id,
      status
    }
  })
}

/**
 * 重置一个账号密码
 * @param {Number} admin_id
 * @returns
 */
export function resetAdminItem(admin_id) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'reset'
    },
    data: {
      admin_id
    }
  })
}

/**
 * 批量删除账号
 * @param {Array} admin_id
 * @returns
 */
export function delAdminList(admin_id) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'delete'
    },
    data: {
      admin_id
    }
  })
}

/**
 * 获取一个账号
 * @param {Number} admin_id
 * @returns
 */
export function getAdminItem(admin_id) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'info'
    },
    data: {
      admin_id
    }
  })
}

/**
 * 获取账号列表
 * @param {Object} data
 * @returns
 */
export function getAdminList(data) {
  return request({
    url: '/v1/admin',
    method: 'post',
    params: {
      method: 'list'
    },
    data
  })
}
