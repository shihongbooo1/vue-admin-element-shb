// 取到需要权限判断的路由表
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { permissionRouter, fixedRouter } from '@/router'
import router from '@/router'
import store from '@/store'
var addRouFlag = false
NProgress.configure({ showSpinner: false })// NProgress configuration
router.beforeEach((to, from, next) => {
  NProgress.start()
  let token = localStorage.getItem('X-Token')
    // 如果登录了
  if (token) {
    store.dispatch('GetUserInfo', token).then(res => {
      next()
      let GetRole = store.getters.roles
      if (!addRouFlag) {
        addRouFlag = true
        // 2.根据用户的角色、和需要动态展示的路由，生成符合用户角色的路由
        var getRoutes = baseRoleGetRouters(permissionRouter, GetRole.split(","))
        // 3.利用global属性，让渲染菜单的组件sideMeuns.vue重新生成左侧菜单
        global.antRouter = fixedRouter.concat(getRoutes)
        // 4.将生成好的路由addRoutes
        router.addRoutes(fixedRouter.concat(getRoutes))
        // 5.push之后，会重新进入到beforeEach的钩子里,直接进入第一个if判断
        router.push({ path: '/home' }) // 白名单免登录
      }
    })
  } else {
    if (to.path === '/') {
      next()
    } else {
      next('/')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})


function hasPermission(route, roles) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}
// 根据用户的角色取到该用户对应的路由
function baseRoleGetRouters(allRoutes, roles) {
  // allRoutes是动态路由表
  // roles是取到的用户角色，数组
  let rightRoutes = allRoutes.filter((route, index) => {
    if (hasPermission(route, roles)) {
      if (route.children && route.children.length) {
        route.children = baseRoleGetRouters(route.children, roles)
      }
      return true
    }
    return false
  })
  return rightRoutes
  
}
