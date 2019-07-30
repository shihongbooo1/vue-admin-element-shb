import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import StoreGlobal from './modules/global'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    StoreGlobal
  },
  getters
})

export default store