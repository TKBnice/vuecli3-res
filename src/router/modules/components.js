
// // 非登录页的包裹组件
const Layout = resolve => require(['@/views/Layout'], resolve)


const componentsRouter = [
    {
        path: '/QuillEditor',
        redirect: "/QuillEditor/index",
        component: Layout,
        meta: {
            title: 'QuillEditor',
            icon:'el-icon-edit-outline',
            requireAuth: true
        },
        children: [{
            path: 'index',
            name: 'QuillEditor',
            component: () => import('@/views/QuillEditor'),
            meta: {
                title: 'QuillEditor',
                icon: 'quillEditor'
            }
        }]
    },
    {
        path: '/Intelligence',
        redirect: "/Intelligence/index",
        component: Layout,
        meta: {
            title: 'Intelligence',
            
            icon:'el-icon-time',
            requireAuth: true
        },
        children: [{
            path: 'index',
            name: 'Intelligence',
            meta: {
                title: 'Intelligence',
                requireAuth: true
            },
            component: () => import('@/views/intelligencedelivered'),
        }]
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
        redirect: '/404'
    }

]

export default componentsRouter