// 使用 Mock
// import Mock from 'mockjs'


import Mock from 'mockjs'
let debug = 1;
if (debug) {
//   Mock.mock('/login', function(options) {
//   // console.log(options);
//     return Mock.mock({
//       "username": "admin",
//       "userpassword": "123456"
//     });
// });
    Mock.mock(/login/, {
        "data": {
            userId: "@integer(1,10)",
            "userName|1": ["鲁班七号", "后裔", "蔡文姬", "王昭君", "妲己", "铠"],
            token: '@string(30)'
        },
        "msg": "Success",
        "status": "YQ-000"
    })
    Mock.mock(/getMenu/, {
        "data": {
            menu: [{
                name: '项目管理',
                name_en: 'Projects',
                router: '',
                icon: 'el-icon-time',
                children: [{
                    name: '开发备忘',
                    name_en: 'Notes',
                    router: '/Projects/Notes',
                    icon: 'el-icon-date'
                }, {
                    name: '关于组件',
                    name_en: 'About',
                    router: '/Projects/About',
                    icon: 'el-icon-document'
                }]
            }, {
                name: '天气图表',
                name_en: 'Weather',
                router: '/Weather',
                icon: 'el-icon-picture-outline',
                children: []
            }, {
                name: '魔幻立方',
                name_en: 'Cube',
                router: '/cube',
                icon: 'el-icon-menu',
                children: []
            }, {
                name: '权限测试',
                name_en: 'Authority',
                router: '/Authority',
                icon: 'el-icon-setting',
                children: []
            }, {
                name: '智能上下架',
                name_en: 'Intelligence',
                router: '/Intelligence',
                icon: 'el-icon-time',
                children: []
            }, {
                name: '富文本编辑器',
                name_en: 'QuillEditor',
                router: '/QuillEditor',
                icon: 'el-icon-edit-outline',
                children: []
<<<<<<< HEAD
            }, {
                name: '拖拽组件',
                name_en: 'DragComp',
                router: '/DragComp',
                icon: 'el-icon-rank',
                children: [
                    {
                    name: '拖拽列表',
                    name_en: 'Drag',
                    router: '/DragComp/Drag',
                    children: []
                },
                {
                    name: '拖拽弹框',
                    name_en: 'DragDialog',
                    router: '/DragComp/DragDialog',
                    children: []
                }
            ]
            }
        ]
=======
            }]
>>>>>>> 1342afe5ca0e3dbe6d159f35dcd32f56c25d6121
        },
        "msg": "Success",
        "status": "YQ-000"
    })
}