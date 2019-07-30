import { Message } from 'element-ui'

export default{
  state: {
    isCollapse: false, // 左侧菜单展开/收起
    breadcrumb: ''
  },
  mutations: {
    SET_ISCOLLAPSE(state, data) {
      state.isCollapse = data
    },
    SET_BREADCRUMB(state, data) {
      state.breadcrumb = data
    }
  },
  actions: {
    // 控制菜单展开收起
    IsCollapseFn({commit}, data) {
      return new Promise((resolve, reject) => {
        let isData = data ? data : !this.state.StoreGlobal.isCollapse
        commit('SET_ISCOLLAPSE', isData)
        resolve()
      })
    },
    // 面包屑导航
    BreadcrumbFn ({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('SET_BREADCRUMB', data)
        resolve()
      })
    }
  }
}