import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
// 登录
const Signin = resolve => require(['@/views/Signin'], resolve)

// // 非登录页的包裹组件
const Layout = resolve => require(['@/views/Layout'], resolve)

// // 项目信息
const Dashboard = resolve => require(['@/views/dashboard'], resolve)

// // 项目信息
const ProjectInfo = resolve => require(['@/views/ProjectInfo'], resolve)

// // 关于组件
const About = resolve => require(['@/views/About'], resolve)

// // 天气预报
const Weather = resolve => require(['@/views/Weather'], resolve)
//     // 立方体
const Cube = resolve => require(['@/views/Cube'], resolve)
//     // 权限测试
const AuthorityTest = resolve => require(['@/views/AuthorityTest'], resolve)
//     // 智能上下架
const Intelligencedelivery = resolve => require(['@/views/intelligencedelivered'], resolve)

//     // 404
const Notfound = resolve => require(['@/views/Notfound'], resolve)

 
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Layout,
            redirect: '/dashboard',
            name: 'Dashboard',
            meta: {
                requireAuth: true
            },
            children: [{
                path: 'dashboard',
                component: Dashboard
            }]
        },
        {
            path: '/signin',
            meta: {
                requireAuth: true
            },
            component: Signin
        },
        // 然后就是嵌套路由了，也就是登陆后的各个页面
        {
            path: '/project-info',
            name: 'project-info',
            component: Layout,
            redirect: '/project-info/index-1', // 重定向到第一个子路由，否则只渲染Layout组件，这块儿使用时解除注释
            // redirect: '/signin', // 这里重定向到登录页面，是为了展示使用，实际用这个项目开发时，需要注释这行，解除上一行的注释
            meta: {
                title: 'project-info',
                requireAuth: true
            },
            children: [{
                    path: 'index-1',
                    name: 'index-1',
                    meta: {
                        title: 'index-1',
                        requireAuth: true
                    },
                    component: ProjectInfo
                },
                {
                    path: 'index-2',
                    name: 'index-2',
                    meta: {
                        title: 'index-2',
                        requireAuth: true
                    },
                    component: About
                }
            ]
        },

        {
            path: '/weather',
            name: 'weather',
            meta: {
                title: 'weather',
                requireAuth: true
            },
            redirect: '/weather/index-1',
            component: Layout,
            children: [{
                path: 'index-1',
                name: 'index-1',
                meta: {
                    title: 'index-1',
                    requireAuth: true
                },
                component: Weather
            }]
        },
        {
            path: '/cube',
            name: 'cube',
            meta: {
                title: 'cube',
                requireAuth: true
            },
            redirect: '/cube/index-1',
            component: Layout,
            children: [{
                path: 'index-1',
                name: 'index-1',
                meta: {
                    title: 'index-1',
                    requireAuth: true
                },
                component: Cube
            }]
        },
        {
            path: '/authority-test',
            name: 'authority-test',
            meta: {
                title: 'authority-test',
                requireAuth: true
            },
            redirect: '/authority-test/index-1',
            component: Layout,
            children: [{
                path: 'index-1',
                name: 'index-1',
                meta: {
                    title: 'index-1',
                    requireAuth: true
                },
                component: AuthorityTest
            }]
        },
        {
            path: '/intelligence-delivery',
            name: 'intelligence-delivery',
            meta: {
                title: 'intelligence-delivery',
                requireAuth: true
            },
            redirect: '/intelligence-delivery/index-1',
            component: Layout,
            children: [{
                path: 'index-1',
                name: 'index-1',
                meta: {
                    title: 'index-1',
                    requireAuth: true
                },
                component: Intelligencedelivery
            }]
        },
        // 最后是404页面
        {
            path: '*',
            component: Notfound
        },
        { path: '/404', component: Notfound},
    ]

})

// // 当一个导航触发时，全局的 before 钩子按照创建顺序调用。钩子是异步解析执行，此时导航在所有钩子 resolve 完之前一直处于等待中。
router.beforeEach((to, from, next) => {
    // 如果已经登录，并且要去登录页，就不让TA去登录页，重定向到首页
    if (to.path === '/signin' && localStorage.token) {
        next('/project-info')
    } else {
        next()
    }
})

export default router;