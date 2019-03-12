import router from './router/index'
import store from './store/index'
import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

// NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
// function hasPermission(roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }


// router.afterEach(() => {
//   NProgress.done() // finish progress bar
// })
const whiteList = ['/Signin'] // 不重定向白名单
// // 当一个导航触发时，全局的 before 钩子按照创建顺序调用。钩子是异步解析执行，此时导航在所有钩子 resolve 完之前一直处于等待中。
router.beforeEach((to, from, next) => {
    if (getToken()) {
        // 如果已经登录，并且要去登录页，就不让TA去登录页，重定向到首页
        if (to.path === '/Signin') {
            next('/')
        } else {
            if (store.getters.roles.length === 0) {// 判断当前用户是否已拉取完user_info信息
                store.dispatch('GetInfo').then(res => { // 拉取info
                    const roles = res.data.roles;
                    store.dispatch('GenerateRoutes', {//根据roles判断权限
                        roles
                    }).then(() => { // 生成可访问的路由表
                        // console.log(store.getters.routers)
                        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                        // console.log(router);
                        
                        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                    })
                }).catch(err => {
                    store.dispatch('FedLogOut').then(() => {
                        Message.error(err)
                        next({ path: '/' })
                    })
                    console.log(err);
                });
            }else {
                // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
                // if (hasPermission(store.getters.roles, to.meta.roles)) {
                  next()
                // } else {
                //   next({ path: '/401', replace: true, query: { noGoBack: true }})
                // }
                // 可删 ↑
            }
        }
    }else{
            /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next(`/Signin?redirect=${to.path}`) // 否则全部重定向到登录页
            // NProgress.done() 
        }
    }
})
