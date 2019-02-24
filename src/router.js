import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 登录
const Signin = resolve => require(['@/views/Signin'], resolve)

// // 非登录页的包裹组件
const Layout = resolve => require(['@/views/Layout'], resolve)

// // 项目信息
// const Dashboard = resolve => require(['@/views/dashboard'], resolve)

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
const Intelligencedelivery = () => import('@/views/intelligencedelivered')

//     // 404
const Notfound = resolve => require(['@/views/Notfound'], resolve)

 
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Layout,
            redirect: '/Dashboard',
            name: 'Dashboard',
            meta: {
                title: 'Dashboard',
                requireAuth: true
            },
            children: [{
                path: 'dashboard',
                component: () => import('@/views/dashboard')
            }]
        },
        {
            path: '/Signin',
            meta: {
                requireAuth: true
            },
            component: Signin
        },
        // 然后就是嵌套路由了，也就是登陆后的各个页面
        {
            path: '/Projects',
            name: 'Projects',
            component: Layout,
            redirect: '/Projects/Notes', // 重定向到第一个子路由，否则只渲染Layout组件，这块儿使用时解除注释
            // redirect: '/signin', // 这里重定向到登录页面，是为了展示使用，实际用这个项目开发时，需要注释这行，解除上一行的注释
            meta: {
                title: 'Projects',
                requireAuth: true
            },
            children: [{
                    path: 'Notes',
                    name: 'Notes',
                    meta: {
                        title: 'Notes',
                        requireAuth: true
                    },
                    component: ProjectInfo
                },
                {
                    path: 'About',
                    name: 'About',
                    meta: {
                        title: 'About',
                        requireAuth: true
                    },
                    component: About
                }
            ]
        },
        
        {
            path: '/Weather',
            // name: 'Weather',//注释后面包屑不会出现两个名称
            // meta: {
            //     title: 'Weather',
            //     requireAuth: true
            // },
            redirect:"/Weather/index",
            component: Layout,
            children: [{
                path: 'index',
                name: 'Weather',
                meta: {
                    title: 'Weather',
                    requireAuth: true
                },
                component: Weather
            }]
        },
        {
            path: '/Cube',
            redirect:"/Cube/index",
            component: Layout,
            children: [{
                path: 'index',
                name: 'Cube',
                meta: {
                    title: 'Cube',
                    requireAuth: true
                },
                component: Cube
            }]
        },
        {
            path: '/Authority',
            redirect:"/Authority/index",
            component: Layout,
            children: [{
                path: 'index',
                name: 'Authority',
                meta: {
                    title: 'Authority',
                    requireAuth: true
                },
                component: AuthorityTest
            }]
        },
        {
            path: '/QuillEditor',
            redirect:"/QuillEditor/index",
            component: Layout,
            children: [
              {
                path: 'index',
                name: 'QuillEditor',
                component: () => import('@/views/QuillEditor'),
                meta: { title: 'QuillEditor', icon: 'quillEditor' }
              }
            ]
        },
        {
            path: '/Intelligence',
            redirect:"/Intelligence/index",
            component: Layout,
            children: [{
                path: 'index',
                name: 'Intelligence',
                meta: {
                    title: 'Intelligence',
                    requireAuth: true
                },
                component: Intelligencedelivery
            }]
        },
        {
            path: '/DragComp',
            name:'DragComp',
            redirect:"/DragComp/Drag",
            component: Layout,
            meta: {
                title: 'DragComp',
                requireAuth: true
            },
            children: [{
                path: 'Drag',
                name: 'Drag',
                meta: {
                    title: 'Drag',
                    requireAuth: true
                },
                component: () => import('@/views/Drag')
            },
            {
                path: 'DragDialog',
                name: 'DragDialog',
                meta: {
                    title: 'DragDialog',
                    requireAuth: true
                },
                component: () => import('@/views/DragDialog')
            }
        ]
        },
        // 最后是404页面
        {
            path: '*',
            component: Notfound
        },
        { path: '/404', component: Notfound},
    ]

})
const whiteList = ['/Signin'] // 不重定向白名单
// // 当一个导航触发时，全局的 before 钩子按照创建顺序调用。钩子是异步解析执行，此时导航在所有钩子 resolve 完之前一直处于等待中。
router.beforeEach((to, from, next) => {
    // 如果已经登录，并且要去登录页，就不让TA去登录页，重定向到首页
    
    if(to.path === '/Signin'&&localStorage.token){
        next('/projects')
    }else {
        next()
        // if (whiteList.indexOf(to.path) !== -1) {
        //     next()
        //     console.log('123213',to.path)
        //   } else {
        //     next(`/Signin?redirect=${to.path}`) // 否则全部重定向到登录页
        //     // NProgress.done()
        //   }
    }
})

export default router;