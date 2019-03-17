// // 非登录页的包裹组件
const Layout = resolve => require(['@/views/Layout'], resolve)


const componentsRouter = {
        path: '/Intelligence',
        redirect: "/Intelligence/index",
        component: Layout,
        meta: {
            title: 'Intelligence',

            icon: 'el-icon-time',
            requireAuth: true
        },
        children: [{
            path: 'index',
            name: 'Intelligence',
            meta: {
                title: 'Intelligence',
                requireAuth: true
            },
            component: () => import('@/views/Intelligencedelivered'),
        }]
    }

export default componentsRouter