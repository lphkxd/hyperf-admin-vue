import request from '@/utils/request'

/**
 * 验证账号是否合法
 * @param {String} username
 * @returns
 */
export function checkUserUsername(username) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'check_user_username'
    },
    data: {
      username
    }
  })
}

/**
 * 验证账号是否合法
 * @param {String} mobile
 * @returns
 */
export function checkUserMobile(mobile) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'check_user_mobile'
    },
    data: {
      mobile
    }
  })
}

/**
 * 验证账号昵称是否合法
 * @param {String} nickname
 * @returns
 */
export function checkUserNickname(nickname) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'check_user_nickname'
    },
    data: {
      nickname
    }
  })
}

/**
 * 注册一个新账号
 * @param {Object} data
 * @returns
 */
export function addUserItem(data) {
  return request({
    url: '/v1/user',
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
export function setUserItem(data) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'update'
    },
    data
  })
}

/**
 * 批量设置账号状态
 * @param {Array} user_id
 * @param {Number} status
 * @returns
 */
export function setUserStatus(user_id, status) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'update_status'
    },
    data: {
      user_id,
      status
    }
  })
}

/**
 * 修改一个账号密码
 * @param {Number} user_id
 * @param {String} password
 * @param {String} password_confirm
 * @returns
 */
export function setUserPassword(user_id, password, password_confirm) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'update_password'
    },
    data: {
      user_id,
      password,
      password_confirm
    }
  })
}

/**
 * 批量删除账号
 * @param {Array} user_id
 * @returns
 */
export function delUserList(user_id) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'delete'
    },
    data: {
      user_id
    }
  })
}

/**
 * 获取一个账号
 * @param {Number} user_id
 * @returns
 */
export function getUserItem(user_id) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'get'
    },
    data: {
      user_id
    }
  })
}

/**
 * 获取一个账号的简易信息
 * @param {Number} user_id
 * @returns
 */
export function getUserInfo(user_id) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'info'
    },
    data: {
      user_id
    }
  })
}

/**
 * 获取账号列表
 * @param {Object} data
 * @returns
 */
export function getUserList(data) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'list'
    },
    data
  })
}
