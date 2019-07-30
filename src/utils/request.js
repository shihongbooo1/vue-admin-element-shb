import axios from 'axios'
import { MessageBox } from 'element-ui'
import { Message } from 'element-ui'
import store from '@/store'

let base_url = ''
// 解决开发环境跨域
if (process.env.NODE_ENV == 'development') {
  base_url = '/dev'
} else {
  base_url = process.env.VUE_APP_BASEURL
}

const service = axios.create({
  baseURL: base_url, // 接口地址
  timeout: 10000 // 请求超时时间
})

 // 请求拦截
service.interceptors.request.use(config => {
  if (!config.tokens) {
    config.headers['token'] = localStorage.getItem('X-Token') // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截
service.interceptors.response.use(response => {
    const res = response.data
    if (response.status === 200) {
      if (res.code == 'EDU_LOAN_OMS_007') {
        MessageBox.confirm('连接超时，是否重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            window.location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
        return Promise.reject('error')
      } else {
        return response
      }
    } else {
      Message({
        message: '服务器开小差了',
        type: 'error',
        duration: 5 * 1000
      })
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
