import axios from 'axios'
import util from '@/utils/util'
import store from '@/store/index'
import { Message, MessageBox } from 'element-ui'

// 创建一个错误
function errorCreat(msg) {
  const err = new Error(msg)
  errorLog(err)
}

// 记录和显示错误
function errorLog(err) {
  // 显示提示
  Message({
    message: err.message,
    type: 'error',
    duration: 5 * 1000
  })
  // 添加到日志
  store.dispatch('careyshop/log/add', {
    type: 'error',
    err,
    info: '数据请求异常'
  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(err)
  }
}

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 10000, // request timeout
  headers: { 'Content-Type': 'application/json; charset=utf-8' }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    setDefaultParams(config)
    refreshToken(config)
    return config
  }, err => {
    errorLog(err)
    return Promise.resolve(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const dataAxios = response.data
    const { status } = dataAxios // response.data.status

    if (status === 200 || response.config.responseType === 'blob') {
      return dataAxios
    } else {
      status === 401 ? reAuthorize() : errorCreat(`[status:${status}] ${dataAxios.message}`)
      return Promise.reject(dataAxios.message ? dataAxios.message : response)
    }
  },
  error => {
    if (error.response) {
      error.message = `[status:${error.response.status}] ${error.response.data.message}`
    }
    error.response.status === 401 ? reAuthorize() : errorLog(error)
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

  let userInfo = store.state.careyshop.user.info
  const nowTime = Math.round(new Date() / 1000) + 100

  if ((nowTime - 3600) > userInfo.token.token_expires && nowTime < userInfo.token.refresh_expires) {
    service({
      method: 'post',
      url: '/v1/admin/',
      params: {
        method: 'refresh.admin.token'
      },
      data: {
        refresh: userInfo.token.refresh
      }
    })
      .then(res => {
        userInfo.token = res.data.token
        store.commit('careyshop/user/set', userInfo, { root: true })
        util.cookies.set('token', res.data.token.token)
      })
      .catch(err => {
        errorLog(err)
      })
  }
}

// 重新授权确认
function reAuthorize() {
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

export default service
