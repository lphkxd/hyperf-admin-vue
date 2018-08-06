import Vue from 'vue'
import axios from 'axios'
import util from '@/utils/util'
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
  // // 数据不存在则需要创建
  // if (!config.data || config.data === undefined) {
  //   config.data = {}
  // }
  //
  // // 附带 token
  // config.data['token'] = util.cookies.get('token')
  // // 附带 appkey
  // config.data['appkey'] = process.env.VUE_APP_KEY
  // // 附带 timestamp
  // config.data['timestamp'] = Math.round(new Date() / 1000)
  // // 附带 format
  // config.data['format'] = 'json'
  //
  // // 获取签名
  // const params = Object.assign(config.data, config.params)
  // config.data['sign'] = getSign(params)

  return config
}, error => {
  // 做一些请求错误
  console.log('err' + error)
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  const res = response.data
  if (res.status !== 200) {
    if (res.status === 401 || res.status === 403) {
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
    return Promise.reject(response.data.message)
  } else {
    return response.data
  }
}, error => {
  console.log('err' + error) // for debug
  return Promise.reject(error)
})

// // 签名生成
// function getSign(params) {
//   console.log(params)
// }

Vue.prototype.$axios = service
