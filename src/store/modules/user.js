import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { adminRoutes,asyncRouterMap } from '@/router/'
// import reqwest from 'reqwest';
// reqwest,一个封装了promise的异步请求插件
// 需要cnpm install reqwest --save]
//异步请求提交
import axios from 'axios'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */

function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}




const user = {
  state: {
    visitedviews:[],
    routers:[],
    addRouters:[],
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    msg: '', // 初始值为空
    userData:{
        username:"",
        password:""
    },
    isCollapse: false,
    chartTheme: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3", "#e5cf0d", "#97b552", "#95706d", "#dc69aa", "#07a2a4", "#9a7fd1", "#588dd5", "#f5994e", "#c05050", "#59678c", "#c9ab00", "#7eb00a", "#6f5553", "#c14089"],
    
  },

  mutations: {
    getMsg(state, payload) {
        state.msg = payload.msg;
    },
    getUserData (state, res) {
        state.userData = res;
    },
    toggleSiderBar(state)  {
        state.isCollapse = !state.isCollapse;
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROUTERS: (state, routers) => {//设置路由
      state.addRouters = routers
      state.routers = adminRoutes.concat(routers)
    },
    ADD_VISITED_VIEWS:(state,view)=>{//打开新页签--添加路由数据的方法
      if(state.visitedviews.some(v=>v.path==view.path))return;
      state.visitedviews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    },
    DEL_VISITED_VIEWS:(state,view)=>{//关闭页签--删除路由数据的方法
      // entries() 方法返回一个数组的迭代对象，该对象包含数组的键值对 (key/value)。[key]
      for(let [i,v] of state.visitedviews.entries()){
        if(v.path == view.path){
          state.visitedviews.splice(i,1)
          break
        }
      }
    }
  },

  actions: {
    funUserData({ commit },userData){
        // console.log(userData);
        axios.get('/userInfo')
        .then(function (res) {
            // console.log('res------',res)
            commit('getUserData', // 这个type很重要，vue会自动去找mutations.js中名为getMsg的方法
                res.data, // 成功后把得到的数据通过commit传入mutations
            );
        })
        .catch(function (error) {
          console.log(error);
        });
        // this.$http.get('/userInfo').then(res => {  
        //     console.log('res------',res)
        //     commit('getUserData', // 这个type很重要，vue会自动去找mutations.js中名为getMsg的方法
        //         res, // 成功后把得到的数据通过commit传入mutations
        //     );
        // })
        // reqwest({
        //   url:'/userInfo',
        //   method: 'post',
        //   contentType: 'application/json',
        //   crossOrigin: true,
        //   data: JSON.stringify(userData),
        //   dataType: 'json',
        // }).then(res => {  
        //     console.log('res------',res)
        //     commit('getUserData', // 这个type很重要，vue会自动去找mutations.js中名为getMsg的方法
        //         res, // 成功后把得到的数据通过commit传入mutations
        //     );
        // })
    },
    fun({commit}){
        commit({
            type: 'getMsg', // 这个type很重要，vue会自动去找mutations.js中名为getMsg的方法
            msg:'提交的数据1111', // 成功后把得到的数据通过commit传入mutations});}
    
        });
    },
    addVisitedViews({commit},view){//通过解构赋值得到commit方法
      commit('ADD_VISITED_VIEWS',view)//去触发ADD_VISITED_VIEWS，并传入参数
    },
    delVisitedViews({commit,state},view){
      //删除数组存放的路由之后，需要再去刷新路由，这是一个异步的过程，需要有回掉函数，
      // 所以使用并返回promise对象，也可以让组件在调用的时候接着使用.then的方法
      //commit('DEL_VISITED_VIEWS',view)
      return new Promise((resolve)=>{//resolve方法：未来成功后回掉的方法
        commit('DEL_VISITED_VIEWS',view);
        resolve([...state.visitedviews]);
      })
    },
    // 登录
    Login ({ commit }, userInfo){
        const username = userInfo.username.trim()
        return new Promise((resolve, reject) => {
            login(username, userInfo.password).then(response => {
              const data = response.data
              commit('SET_TOKEN', data.token)
              setToken(data.token)
              resolve()
            }).catch(error => {
              reject(error)
            })
        })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.includes('admin')) {//管理员路由
          accessedRouters = asyncRouterMap
        } else {//访客路由
          // accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
          accessedRouters = []
        }
        
        commit('SET_ROUTERS', accessedRouters)//提交路由
        resolve()
      })
    }
  }
}

export default user
