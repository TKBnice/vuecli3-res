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
                name: '天气预报',
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
            }]
        },
        "msg": "Success",
        "status": "YQ-000"
    })
}