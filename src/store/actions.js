// import reqwest from 'reqwest';
// reqwest,一个封装了promise的异步请求插件
// 需要cnpm install reqwest --save]

//异步请求提交
import axios from 'axios'
export const funUserData = ({ commit },userData) => {
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
};
export const fun = ({commit})=>{
    commit({
        type: 'getMsg', // 这个type很重要，vue会自动去找mutations.js中名为getMsg的方法
        msg:'提交的数据1111', // 成功后把得到的数据通过commit传入mutations});}

    });
}
