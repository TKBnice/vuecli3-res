// 使用 Mock
// import Mock from 'mockjs'


import Mock from 'mockjs'
import articleAPI from './article'

import {
    param2Obj
} from '@/utils'
let debug = 1;
const userMap = {
    admin: {
        roles: ['admin'],
        token: 'admin',
        introduction: '我是超级管理员',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    editor: {
        roles: ['editor'],
        token: 'editor',
        introduction: '我是编辑',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}
if (debug) {
    //   Mock.mock('/login', function(options) {
    //   // console.log(options);
    //     return Mock.mock({
    //       "username": "admin",
    //       "userpassword": "123456"
    //     });
    // });
    // Mock.mock(/\/login\/login/, 'post', config => {
    //     return {
    //         "data": {
    //             userId: "@integer(1,10)",
    //             "userName|1": ["鲁班七号", "后裔", "蔡文姬", "王昭君", "妲己", "铠"],
    //             token: '@string(30)'
    //         },
    //         "code": 20000,
    //         "status": "Success"
    //     }
    // })
    // 登录相关
    Mock.mock(/\/login\/login/, 'post', (config) => {
        const { username } = JSON.parse(config.body);
        return {
            "data":  userMap[username],
            "code": 20000,
            "status": "Success"
        }
    })

    Mock.mock(/\/login\/logout/, 'post', (config) => { return { "code":20000,"status": "Success"}})

    Mock.mock(/\/login\/info\.*/, 'get', config => {//根据token获取用户信息
        const { token } = param2Obj(config.url)
        if (userMap[token]) {
            return {
                "data": userMap[token],
                "code": 20000,
                "status": "Success"
            }
        } else {
            return false
        }
    })

    // 文章相关
    Mock.mock(/\/article\/list/, 'get', articleAPI.getList)

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
            }, {
                name: '拖拽组件',
                name_en: 'DragComp',
                router: '/DragComp',
                icon: 'el-icon-rank',
                children: [{
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
            }]
        },
        "msg": "Success",
        "status": "YQ-000"
    })
}