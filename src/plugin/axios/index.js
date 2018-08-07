import Vue from 'vue'
import axios from 'axios'
import util from '@/utils/util'
import store from '@/store/index'
import { MessageBox } from 'element-ui'

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 5000, // request timeout
  changeOrigin: true, // 允许跨域
  headers: { 'Content-Type': 'application/json; charset=utf-8' }
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 是否已登录
  const token = util.cookies.get('token')
  if (token && token !== undefined) {
    const nowTime = Math.round(new Date() / 1000) + 100
    const tokenInfo = store.state.careyshop.userInfo.token

    // 业务参数数组不存在则需要创建
    if (!config.data || config.data === undefined) {
      config.data = {}
    }

    // 自动刷新令牌
    if ((nowTime + 3600) > tokenInfo['token_expires'] && nowTime < tokenInfo['refresh_expires']) {
      if (config.params['method'] !== 'refresh.admin.token') {
        service({
          method: 'post',
          url: '/v1/admin/',
          params: {
            method: 'refresh.admin.token'
          },
          data: {
            refresh: tokenInfo['refresh']
          }
        })
          .then(res => {
            let userInfo = store.state.careyshop.userInfo
            userInfo.token = res.data['token']
            store.commit('userInfoSet', {
              nickname: userInfo.nickname,
              admin: userInfo.admin,
              token: userInfo.token
            })
            util.cookies.set('token', res.data['token']['token'])
          })
          .catch(err => {
            console.group('刷新令牌')
            console.log('err', err)
            console.groupEnd()
          })
      }
    }

    // 数据赋值(将所有参数合并后获取签名)
    config.data['token'] = token
    config.data['appkey'] = process.env.VUE_APP_KEY
    config.data['timestamp'] = nowTime
    config.data['format'] = 'json'
    config.data['sign'] = getSign(Object.assign(config.data, config.params))
  }

  return config
}, error => {
  // 做一些请求错误
  console.log('err' + error)
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  const res = response.data
  const token = util.cookies.get('token')

  if (res.status !== 200) {
    if (token && token !== undefined && (res.status === 401 || res.status === 403)) {
      util.cookies.remove('token')
      util.cookies.remove('uuid')

      MessageBox.confirm('您的授权已过期或在其他地方登录，是否重新登录？', '授权过期', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          location.reload()
        })
        .catch(() => {
        })
    }
    return Promise.reject(response.data.message)
  } else {
    return response.data
  }
}, error => {
  console.log('err' + error) // for debug
  return Promise.reject(error)
})

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

Vue.prototype.$axios = service
