// // 非登录页的包裹组件
const Layout = resolve => require(['@/views/Layout'], resolve)


const componentsRouter = [{
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

export default componentsRouter