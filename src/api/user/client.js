import request from '@/utils/request'

/**
 * 验证账号是否合法
 * @param {String} username
 * @returns {AxiosPromise}
 */
export function checkUserUsername(username) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'check.user.username'
    },
    data: {
      username
    }
  })
}

/**
 * 验证账号是否合法
 * @param {String} mobile
 * @returns {AxiosPromise}
 */
export function checkUserMobile(mobile) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'check.user.mobile'
    },
    data: {
      mobile
    }
  })
}

/**
 * 验证账号昵称是否合法
 * @param {String} nickname
 * @returns {AxiosPromise}
 */
export function checkUserNickname(nickname) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'check.user.nickname'
    },
    data: {
      nickname
    }
  })
}

/**
 * 注册一个新账号
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addUserItem(data) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'add.user.item'
    },
    data
  })
}

/**
 * 编辑一个账号
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setUserItem(data) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'set.user.item'
    },
    data
  })
}

/**
 * 批量设置账号状态
 * @param {Array} client_id
 * @param {Number} status
 * @returns {AxiosPromise}
 */
export function setUserStatus(client_id, status) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'set.user.status'
    },
    data: {
      client_id,
      status
    }
  })
}

/**
 * 修改一个账号密码
 * @param {Number} client_id
 * @param {String} password
 * @param {String} password_confirm
 * @returns {AxiosPromise}
 */
export function setUserPassword(client_id, password, password_confirm) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'set.user.password'
    },
    data: {
      client_id,
      password,
      password_confirm
    }
  })
}

/**
 * 批量删除账号
 * @param {Array} client_id
 * @returns {AxiosPromise}
 */
export function delUserList(client_id) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'del.user.list'
    },
    data: {
      client_id
    }
  })
}

/**
 * 获取一个账号
 * @param {Number} client_id
 * @returns {AxiosPromise}
 */
export function getUserItem(client_id) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'get.user.item'
    },
    data: {
      client_id
    }
  })
}

/**
 * 获取一个账号的简易信息
 * @param {Number} client_id
 * @returns {AxiosPromise}
 */
export function getUserInfo(client_id) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'get.user.info'
    },
    data: {
      client_id
    }
  })
}

/**
 * 获取账号列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getUserList(data) {
  return request({
    url: '/v1/user',
    method: 'post',
    params: {
      method: 'get.user.list'
    },
    data
  })
}
