import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/components/Login/index.vue') //登录页

const Layout = () => import('@/components/Layout/index.vue') // 引入主体容器

Vue.use(Router)

// hidden  不需要出现再导航栏上的路由

// roles 权限 ['admin']

// 固定路由表
export const fixedRouter = [
  {
    path: '',
    component: Login,
    hidden: true,
  },
  {
    path: '*',
    hidden: true,
    component: () => import('../components/errorPage/404.vue')
  }
]

export const permissionRouter = [
  {
    path: '/home',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'el-icon-platform-eleme',
      roles: ['spAdmin', 'admin']
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/Home/index.vue')
      }
    ]
  },
  {
    path: '/list',
    component: () => import('../components/Layout/index.vue'),
    meta: {
      title: '订单列表',
      icon: 'el-icon-s-goods',
      roles: ['spAdmin']
    },
    children:[
      {
        path: '',
        name: 'list',
        component: () => import('../views/List/index.vue')
      }
    ]
  },
  {
    path: '/list/detail',
    name: 'detail',
    hidden: true,
    component: () => import('../views/List/detail.vue')
  }
]

export default new Router({
  routes: fixedRouter
})