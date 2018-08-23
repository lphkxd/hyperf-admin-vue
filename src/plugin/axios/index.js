import axios from 'axios'
import util from '@/utils/util'
import store from '@/store/index'
import { MessageBox } from 'element-ui'

// 全局axios配置
axios.defaults.baseURL = process.env.VUE_APP_BASE_API
axios.defaults.timeout = 10000
axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    setDefaultParams(config)
    refreshToken(config)
    return config
  },
  err => {
    console.error(err)
    return Promise.resolve(err)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data
    } else if (response.config.responseType === 'blob') {
      return response.data
    } else {
      reAuthorize(response.data.status)
      return Promise.reject(response.data.message)
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误(400)'
          break
        case 401:
          error.message = '未授权，请重新登录(401)'
          break
        case 403:
          error.message = '拒绝访问(403)'
          break
        case 404:
          error.message = '请求出错(404)'
          break
        case 408:
          error.message = '请求超时(408)'
          break
        case 500:
          error.message = '服务器错误(500)'
          break
        case 501:
          error.message = '服务未实现(501)'
          break
        case 502:
          error.message = '网络错误(502)'
          break
        case 503:
          error.message = '服务不可用(503)'
          break
        case 504:
          error.message = '网络超时(504)'
          break
        case 505:
          error.message = 'HTTP版本不受支持(505)'
          break
      }
      console.log(error.response.status)
      reAuthorize(error.response.status)
    } else {
      console.log(error)
    }
    return Promise.reject(error.response ? error.response.data : error)
  }
)

// 刷新令牌
function refreshToken(config) {
  const token = util.cookies.get('token')
  if (!token || token === undefined) {
    return
  }

  // 以下接口不需要刷新令牌
  const whiteList = [
    'refresh.admin.token',
    'logout.admin.user',
    'login.admin.user'
  ]

  if (whiteList.indexOf(config.params['method']) >= 0) {
    return
  }

  let userInfo = store.state.careyshop.userInfo // TODO:可能数据字段位置已改变
  const nowTime = Math.round(new Date() / 1000) + 100

  if ((nowTime - 3600) > userInfo.token['token_expires'] && nowTime < userInfo.token['refresh_expires']) {
    axios({
      method: 'post',
      url: '/v1/admin/',
      params: {
        method: 'refresh.admin.token'
      },
      data: {
        refresh: userInfo.token['refresh']
      }
    })
      .then(res => {
        userInfo.token = res.data['token']
        store.commit('careyshop/user/set', userInfo)
        util.cookies.set('token', res.data['token']['token'])
      })
      .catch(err => {
        console.group('刷新令牌')
        console.log('err', err)
        console.groupEnd()
      })
  }
}

// 重新授权确认
function reAuthorize(status) {
  const token = util.cookies.get('token')
  if (!token || token === undefined) {
    return
  }

  if (status === 401 || status === 403) {
    MessageBox.confirm('您的授权已过期或在其他地方登录，是否重新登录？', '授权过期', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        util.cookies.remove('token')
        util.cookies.remove('uuid')
        location.reload()
      })
      .catch(() => {
      })
  }
}

// 添加默认参数及签名
function setDefaultParams(config) {
  const token = util.cookies.get('token')
  if (!token || token === undefined) {
    return
  }

  // 业务参数数组不存在则需要创建
  if (!config.data || config.data === undefined) {
    config.data = {}
  }

  config.data['token'] = token
  config.data['appkey'] = process.env.VUE_APP_KEY
  config.data['timestamp'] = Math.round(new Date() / 1000) + 100
  config.data['format'] = 'json'
  config.data['sign'] = getSign(Object.assign(config.data, config.params))
}

// 签名生成
function getSign(params) {
  let sorted = Object.keys(params).sort()
  let basestring = process.env.VUE_APP_SECRET

  for (let i = 0, l = sorted.length; i < l; i++) {
    let k = sorted[i]
    if (typeof params[k] !== 'object') {
      basestring += k + params[k]
    }
  }

  basestring += process.env.VUE_APP_SECRET
  return util.md5(basestring)
}

export default {
  install(Vue, options) {
    Vue.prototype.$axios = axios
  }
}
