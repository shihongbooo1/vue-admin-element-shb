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
      icon: 'icon-find-fav',
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
    path: '/audit',
    component: () => import('../components/Layout/index.vue'),
    meta: {
      title: '人工审核',
      icon: 'icon-shenhe',
    },
    children:[
      {
        path: '',
        name: 'audit',
        component: () => import('../views/Audit/index.vue')
      }
    ]
  },
  {
    path: '/audit/detail',
    name: 'detail',
    hidden: true,
    component: () => import('../views/Audit/detail.vue')
  },
  {
    path: '/loan',
    component: () => import('../components/Layout/index.vue'),
    meta: {
      title: '银行放款',
      icon: 'icon-50',
    },
    children:[
      {
        path: '',
        name: 'loan',
        component: () => import('../views/Loan/index.vue')
      }
    ]
  },
  {
    path: '/overdue',
    component: () => import('../components/Layout/index.vue'),
    meta: {
      title: '逾期列表',
      icon: 'icon-yiyuqi',
    },
    children:[
      {
        path: '',
        name: 'overdue',
        component: () => import('../views/Overdue/index.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('../components/Layout/index.vue'),
    meta: {
      title: '用户中心',
      icon: 'icon-dingbudaohang-zhangh',
    },
    children:[
      {
        path: '',
        name: 'user',
        component: () => import('../views/User/index.vue')
      }
    ]
  },
  {
    path: '/settleAccounts',
    component: () => import('../components/Layout/index.vue'),
    meta: {
      title: '清账列表',
      icon: 'icon-pinpaiqushi',
    },
    children:[
      {
        path: '',
        name: 'settleAccounts',
        component: () => import('../views/SettleAccounts/index.vue')
      }
    ]
  },
  {
    path: '/setup',
    component: () => import('../components/Layout/index.vue'),
    meta: {
      title: '系统设置',
      icon: 'icon-xitongshezhi',
    },
    children:[
      {
        path: '',
        name: 'setup',
        component: () => import('../views/Setup/index.vue')
      }
    ]
  },
]

export default new Router({
  routes: fixedRouter
})