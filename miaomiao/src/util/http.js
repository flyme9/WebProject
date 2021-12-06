// 封装axios
import Vue from 'vue'
import axios from 'axios'
import { Toast } from 'vant'
Vue.use(Toast)

const http = axios.create({
  baseURL: 'https://m.maizuo.com',  // 请求地址
  timeout: 10000,                   // 请求超时设置
  headers: {                        // 设置请求头
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16367848715056039795818497","bc":"110100"}'
  }
})
//
// axios拦截器
// 在发请求前拦截：showLoading
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  Toast.loading({
    message: '加载失败',
    forbidClick: true,
    duration: 0
  })
  return Promise.reject(error)
})
// 在成功后拦截：hideLoading
// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  Toast.clear()
  return response
}, function (error) {
  // 对响应错误做点什么
  Toast.clear()
  return Promise.reject(error)
})

export default http
