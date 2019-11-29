import request from '@/utils/request'

/**
 * 添加一个应用
 * @param {Object} data
 * @returns
 */
export function addAppItem(data) {
  return request({
    url: '/v1/app',
    method: 'post',
    params: {
      method: 'add.app.item'
    },
    data
  })
}

/**
 * 编辑一个应用
 * @param {Object} data
 * @returns
 */
export function setAppItem(data) {
  return request({
    url: '/v1/app',
    method: 'post',
    params: {
      method: 'set.app.item'
    },
    data
  })
}

/**
 * 获取一个应用
 * @param {Number} app_id
 * @returns
 */
export function getAppItem(app_id) {
  return request({
    url: '/v1/app',
    method: 'post',
    params: {
      method: 'get.app.item'
    },
    data: {
      app_id
    }
  })
}

/**
 * 获取应用列表
 * @param {Object} data
 * @returns
 */
export function getAppList(data) {
  return request({
    url: '/v1/app',
    method: 'post',
    params: {
      method: 'get.app.list'
    },
    data
  })
}

/**
 * 批量删除应用
 * @param {Array} app_id
 * @returns
 */
export function delAppList(app_id) {
  return request({
    url: '/v1/app',
    method: 'post',
    params: {
      method: 'del.app.list'
    },
    data: {
      app_id
    }
  })
}

/**
 * 查询应用名称是否已存在
 * @param {String} app_name
 * @param {Number} exclude_id
 * @returns
 */
export function uniqueAppName(app_name, exclude_id) {
  return request({
    url: '/v1/app',
    method: 'post',
    params: {
      method: 'unique.app.name'
    },
    data: {
      app_name,
      exclude_id
    }
  })
}

/**
 * 更换应用Secret
 * @param {Number} app_id
 * @returns
 */
export function replaceAppSecret(app_id) {
  return request({
    url: '/v1/app',
    method: 'post',
    params: {
      method: 'replace.app.secret'
    },
    data: {
      app_id
    }
  })
}

/**
 * 批量设置应用状态
 * @param {Array} app_id
 * @param {Number} status
 * @returns
 */
export function setAppStatus(app_id, status) {
  return request({
    url: '/v1/app',
    method: 'post',
    params: {
      method: 'set.app.status'
    },
    data: {
      app_id,
      status
    }
  })
}
