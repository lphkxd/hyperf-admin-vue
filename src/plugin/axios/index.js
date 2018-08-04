import Vue from 'vue'
import axios from 'axios'

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 在发送请求之前做一些事情
  return config
}, error => {
  // 做一些请求错误
  console.log(error)
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  return response.data
}, error => {
  console.log('err' + error) // for debug
  return Promise.reject(error)
})

Vue.prototype.$axios = service
