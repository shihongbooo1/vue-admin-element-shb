import request from '@/utils/request'

export function Login(data) {
  return request({
    url: '/login',
    method: 'post',
    data: data // data params
  })
}

export function  getUuseInfo(data) {
  return request({
    url: '/user/info',
    method: 'post',
    data: data
  })
}