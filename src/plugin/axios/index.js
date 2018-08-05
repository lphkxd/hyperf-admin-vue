import Vue from 'vue'
import axios from 'axios'
import util from '@/utils/util'

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 5000, // request timeout
  changeOrigin: true, // 允许跨域
  headers: { 'Content-Type': 'application/json; charset=utf-8' }
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 数据不存在则需要创建
  if (!config.data || config.data === undefined) {
    config.data = {}
  }

  // 附带 token
  config.data['token'] = util.cookies.get('token')
  // 附带 app_key
  config.data['app_key'] = process.env.VUE_APP_KEY
  // 附带 timestamp
  config.data['timestamp'] = Math.round(new Date() / 1000)
  // 附带 format
  config.data['format'] = 'json'

  // TODO:正在完成签名与注销,待续...

  return config
}, error => {
  // 做一些请求错误
  console.log('err' + error)
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  // 此错误从后端返回
  if (response.data.status !== 200) {
    return Promise.reject(response.data.message)
  }

  return response.data
}, error => {
  console.log('err' + error) // for debug
  return Promise.reject(error)
})

Vue.prototype.$axios = service
