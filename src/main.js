import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './components/icons'
import '@/utils/global'//全局
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/global.scss'
import '@/permission.js'


if (process.env.NODE_ENV == 'development') {
  require('@/mock')
}
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
