import { Message } from 'element-ui'
import { getUuseInfo } from '@/api/user'

export default{
  state: {
    roles: '', // 用户权限
    name: '' // 用户名称
  },
  mutations: {
    SET_ROLES(state, data) {
      state.roles = data
    },
    SET_NAME(state, data) {
      state.name = data
    }
  },
  actions: {
    // 获取用户信息
    GetUserInfo({ commit }, data) {
      return new Promise((resolve, reject) => {
        getUuseInfo({token: data}).then(res => {
          if (res.data.code == '0') {
            commit('SET_ROLES', res.data.data.roles)
            commit('SET_NAME', res.data.data.name)
            resolve()
          } else {
            reject('error')
          }
        })
      })
    },
    // 退出登录 
    LoginOut({ commit }, data) {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('X-Token')
        sessionStorage.removeItem('tagsData')
        commit('SET_ROLES', '')
        commit('SET_NAME', '')
        window.location.href = window.location.origin + window.location.pathname
      })
    }
  }
}