import request from '@/utils/request'

/**
 * 添加一个应用安装包
 * @param {Object} data
 * @returns
 */
export function addAppInstallItem(data) {
  return request({
    url: '/v1/app_install',
    method: 'post',
    params: {
      method: 'add.app.install.item'
    },
    data
  })
}

/**
 * 编辑一个应用安装包
 * @param {Object} data
 * @returns
 */
export function setAppInstallItem(data) {
  return request({
    url: '/v1/app_install',
    method: 'post',
    params: {
      method: 'set.app.install.item'
    },
    data
  })
}

/**
 * 获取一个应用安装包
 * @param {Number} app_install_id
 * @returns
 */
export function getAppInstallItem(app_install_id) {
  return request({
    url: '/v1/app_install',
    method: 'post',
    params: {
      method: 'get.app.install.item'
    },
    data: {
      app_install_id
    }
  })
}

/**
 * 批量删除应用安装包
 * @param {Array} app_install_id
 * @returns
 */
export function delAppInstallList(app_install_id) {
  return request({
    url: '/v1/app_install',
    method: 'post',
    params: {
      method: 'del.app.install.list'
    },
    data: {
      app_install_id
    }
  })
}

/**
 * 获取应用安装包列表
 * @param {Object} data
 * @returns
 */
export function getAppInstallList(data) {
  return request({
    url: '/v1/app_install',
    method: 'post',
    params: {
      method: 'get.app.install.list'
    },
    data
  })
}

/**
 * 根据请求获取一个应用安装包
 * @param {String} user_agent
 * @param {String} ver
 * @returns
 */
export function queryAppInstallUpdated(user_agent, ver) {
  return request({
    url: '/v1/app_install',
    method: 'post',
    params: {
      method: 'query.app.install.updated'
    },
    data: {
      user_agent,
      ver
    }
  })
}

/**
 * 根据请求获取一个应用安装包
 * @returns
 */
export function requestAppInstallItem() {
  return request({
    url: '/v1/app_install',
    method: 'post',
    params: {
      method: 'request.app.install.item'
    }
  })
}
