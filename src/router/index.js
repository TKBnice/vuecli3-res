import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import componentsRouter from './modules/components'
//      //登录
const Signin = resolve => require(['@/views/Login'], resolve)

//      // 非登录页的包裹组件
const Layout = resolve => require(['@/views/Layout'], resolve)

//      // 项目信息
// const Dashboard = resolve => require(['@/views/dashboard'], resolve)

//      // 项目信息
const ProjectInfo = resolve => require(['@/views/ProjectInfo'], resolve)

//      // 关于组件
const About = resolve => require(['@/views/About/index'], resolve)

//      // 天气预报
const Weather = resolve => require(['@/views/Weather/index'], resolve)

//     // 立方体
const Cube = resolve => require(['@/views/Cube/index'], resolve)

//     // 权限测试
const AuthorityTest = resolve => require(['@/views/AuthorityTest/index'], resolve)

//     // 404
const Notfound = resolve => require(['@/views/Notfound/Notfound'], resolve)

const Test = resolve => require(['@/views/Test'], resolve)


export const adminRoutes = [{
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        meta: {
            title: 'Dashboard',
            icon: 'el-icon-setting',
            requireAuth: true
        },
        children: [{
            name: 'Dashboard',
            path: 'dashboard',
            meta: {
                
                title: 'Dashboard',
                requireAuth: true
            },
            component: () => import('@/views/Dashboard')
        }]
    },
    {
        path: '/Signin',
        name: 'Signin',
        meta: {
            title: 'Signin',
            requireAuth: true
        },
        component: Signin
    },
    {
        path: '/Test',
        name: 'Test',
        meta: {
            title: 'Test',
            icon: 'el-icon-date',
            requireAuth: true
        },
        children: [{
            name: 'Test',
            path: 'index',
            meta: {
                title: 'Test',
                requireAuth: true
            },
            component: Test
        }],
        component: Layout,
    },
    // 然后就是嵌套路由了，也就是登陆后的各个页面
    {
        path: '/Projects',
        name: 'Projects',
        component: Layout,
        redirect: 'noredirect', // 重定向到第一个子路由，否则只渲染Layout组件，这块儿使用时解除注释
        // redirect: '/signin', // 这里重定向到登录页面，是为了展示使用，实际用这个项目开发时，需要注释这行，解除上一行的注释
        meta: {
            title: 'Projects',
            icon: 'el-icon-date',
            requireAuth: true
        },
        children: [{
                path: 'Notes',
                name: 'Notes',
                meta: {
                    title: 'Notes',
                    role: ['admin', 'super_editor'],
                    icon: 'el-icon-date',
                    requireAuth: true
                },
                component: ProjectInfo
            },
            {
                path: 'About',
                name: 'About',
                meta: {
                    title: 'About',
                    role: ['admin', 'super_editor'],
                    requireAuth: true
                },
                component: About
            }
        ]
    },
    {
        path: '/Authority',
        redirect: "/Authority/index",
        component: Layout,
        meta: {
            title: 'Authority',
            icon: 'el-icon-sort',
            requireAuth: true
        },
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
        path: '/Weather',
        meta: {
            title: 'Weather',
            icon: 'el-icon-picture-outline',
            requireAuth: true
        },
        redirect: "/Weather/index",
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
        redirect: "/Cube/index",
        component: Layout,
        meta: {
            title: 'Cube',
            icon: 'el-icon-menu',
            requireAuth: true
        },
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
    // 最后是404页面
    {
        path: '/404',
        component: Notfound
    }
]
export const asyncRouterMap = componentsRouter
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: adminRoutes
})