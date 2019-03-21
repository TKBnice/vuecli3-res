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

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/

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
                affix: true,
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
        path: '/Table',
        name: 'Table',
        meta: {
            title: 'Table',
            icon: 'el-icon-tickets',
            requireAuth: true
        },
        children: [
            {
                name: 'Table',
                path: 'index',
                meta: {
                    title: 'Table',
                    requireAuth: true
                },
                component: ()=>import('@/views/Table')
            },
            {
                name: 'DragTable',
                path: 'dragTable',
                meta: {
                    title: 'DragTable',
                    requireAuth: true
                },
                component: ()=>import('@/views/Table/dragTable')
            },
            {
                name: 'CountTable',
                path: 'countTable',
                meta: {
                    title: 'CountTable',
                    requireAuth: true
                },
                component: ()=>import('@/views/Table/countTable')
            }
        ],
        component: Layout,
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
    // 最后是404页面
    {
        path: '/404',
        component: Notfound
    }
]

export const asyncRouterMap = [
    {
        path: '/Projects',
        name: 'Projects',
        alwaysShow:true,//子菜单一个也展开
        component: Layout,
        redirect: 'noredirect', // 重定向到第一个子路由，否则只渲染Layout组件，这块儿使用时解除注释
        // redirect: '/signin', // 这里重定向到登录页面，是为了展示使用，实际用这个项目开发时，需要注释这行，解除上一行的注释
        meta: {
            title: 'Projects',
            icon: 'el-icon-date',
            roles: ['admin', 'editor'], // you can set roles in root nav
            requireAuth: true
        },
        children: [{
                path: 'Notes',
                name: 'Notes',
                // hidden: true,//控制是否在侧边栏显示
                meta: {
                    title: 'Notes',
                    icon: 'el-icon-date',
                    roles: ['admin'],
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
    componentsRouter,
    {
        path: '/QuillEditor',
        redirect: "/QuillEditor/QuillEditor",
        component: Layout,
        meta: {
            title: 'Editor',
            icon: 'el-icon-edit-outline',
            requireAuth: true
        },
        children: [
            {
                path: 'QuillEditor',
                name: 'QuillEditor',
                component: () => import('@/views/QuillEditor/QuillEditor'),
                meta: {
                        title: 'QuillEditor'
                    }
            },
            {
                path: 'UeEditor',
                name: 'UeEditor',
                component: () => import('@/views/QuillEditor/UeEditor'),
                meta: {
                        title: 'UeEditor'
                    }
            },
            {
                path: 'wangEditor',
                name: 'wangEditor',
                component: () => import('@/views/QuillEditor/WangEditor'),
                meta: {
                        title: 'wangEditor'
                }
            }
        ]
    },
    {
        path: '/DragComp',
        name: 'DragComp',
        redirect: "/DragComp/Drag",
        component: Layout,
        meta: {
            title: 'DragComp',
            icon: 'el-icon-rank',
            requireAuth: true
        },
        children: [{
                path: 'Drag',
                name: 'Drag',
                meta: {
                    title: 'Drag',
                    requireAuth: true
                },
                component: () => import('@/views/Drag/Drag')
            },
            {
                path: 'DragDialog',
                name: 'DragDialog',
                meta: {
                    title: 'DragDialog',
                    requireAuth: true
                },
                component: () => import('@/views/Drag/DragDialog')
            }
        ]
    },
    // 最后是404页面
    {
        path: '*',
        redirect: '/404'
    }
]
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: adminRoutes
})