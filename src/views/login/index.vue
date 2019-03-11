<template>
    <div class="bg">
        <div class="login-wrap" v-title="'Auto Vue'">
            <!-- 粒子漂浮物 -->
            <vue-particles
                color="#fff"
                :particleOpacity="0.7"
                :particlesNumber="30"
                shapeType="star"
                :particleSize="5"
                linesColor="#fff"
                :linesWidth="2"
                :lineLinked="true"
                :lineOpacity="0.4"
                :linesDistance="150"
                :moveSpeed="3"
                :hoverEffect="true"
                hoverMode="grab"
                :clickEffect="true"
                clickMode="push"
            >
            </vue-particles>
            <div class="dowebok">
                <div class="container">
                    <div class="left">
                        <div class="login">{{$t('login.login')}}</div>
                        <h3 class="eula">{{$t('login.introduction')}}</h3>
                    </div>
                    <div class="right">
                        <svg viewBox="0 0 320 350">
                            <defs>
                                <linearGradient inkscape:collect="always" id="TBlinearGradient" x1="13" y1="193.49992" x2="307"
                                    y2="193.49992" gradientUnits="userSpaceOnUse">
                                    <stop style="stop-color:#ff00ff;" offset="0" id="stop876" />
                                    <stop style="stop-color:#ff0000;" offset="1" id="stop878" />
                                </linearGradient>
                            </defs>
                            <path d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
                        </svg>
                        <div class="form">
                            <el-form ref="form" :model="form"  label-width="0px">
                            <el-form-item > 
                                <label class="label" style="margin-top: 25px;height:36px;" for="text" >{{$t('login.account')}}</label>
                                <input v-focus type="text" id="email" @focus="emailFocus" v-model="form.name" autocomplete="off" :placeholder="$t('login.name_holder')">
                                <label class="label" style="height:32px;" for="password" >{{$t('login.password')}}</label>
                                <input type="password" id="password" @focus="passwordFocus" v-model="form.password" autocomplete="off" :placeholder="$t('login.password_holder')" >
                            </el-form-item>

                            <el-form-item>
                                <el-row type="flex" justify="space-between">
                                    <el-checkbox v-model="isMemery" style="color:#eee">{{$t('login.remember')}}</el-checkbox>
                                    <a href="" @click.prevent="openMsg"  style="color:#eee">{{$t('login.forget')}}</a>
                                </el-row>
                            </el-form-item>

                            <el-form-item style="text-align:center;">
                                <el-button :loading="loading" type="info" @click.native.prevent="handleLogin">{{$t('login.button')}}</el-button>
                            </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <remote-script src="https://cdn.staticfile.org/animejs/2.2.0/anime.min.js"></remote-script>
    </div>
</template>
<script>
export default {
  name: "signin",
  data() {
    var checkone = (rule, value, callback) => {
      let regphone = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
      let regmail = /^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.){1,4}[a-z]{2,3}$/;
      if (value === "") {
        callback(new Error("请输入手机号/邮箱"));
      } else {
        if (!isNaN(value)) {
          if (!regphone.test(value)) {
            callback(new Error("请输入正确手机号"));
            return false;
          }
          callback();
        }
        if (value.indexOf("@") != -1) {
          if (!regmail.test(value)) {
            callback(new Error("请输入正确邮箱"));
            return false;
          }
          callback();
        }
        callback(new Error("请输入正确手机/邮箱"));
      }
    };
    return {
      loading:false,
      loginForm: {
        username: 'admin',
        password: '1111111'
      },
      form: {
        name: localStorage.userInfo || "admin",
        password: localStorage.passwordInfo || "654321"
      },
      isMemery: false,
      rules: {
        name: [
          {
            required: true,
            message: this.$t('login.name_tip'),
            trigger: "blur",
            validator: checkone
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('login.password_tip'),
            trigger: "blur"
          }
        ]
      },
      current:null
    };
  },
  created() {
  },
  methods: {
    handleLogin() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({ path: this.redirect || '/' });
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // Login(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       this.$axios({
    //         url: "login",
    //         method: "POST",
    //         data: {
    //           username: this.form.name,
    //           password: this.form.password
    //         }
    //       })
    //       .then(res => {
    //         // console.log(res)
    //         localStorage.userName = res.data.data.userName;
    //         localStorage.userId = res.data.data.userId;
    //         localStorage.token = res.data.data.token;
    //         this.getMenu();
    //       });
    //     } else {
    //       return false;
    //     }
    //   });
    // },
    getMenu() {
      this.$axios({
        url: "getMenu",
        method: "GET"
      }).then(res => {
        // 提取菜单数组，交给本地存储
        let menu = res.data.data.menu;
        localStorage.menu = JSON.stringify(menu);
        this.$router.push("/ProjectS");
      });
    },
    openMsg() {
      // 注意这里使用了国际化
      this.$messager.warning(this.$t('login.info'));
    },
    emailFocus(){
        let current = null;
        if (current) current.pause();
        setTimeout(()=>{
            current = anime({
                targets: 'path',
                strokeDashoffset: {
                    value: 0,
                    duration: 700,
                    easing: 'easeOutQuart'
                },
                strokeDasharray: {
                    value: '240 1386',
                    duration: 700,
                    easing: 'easeOutQuart'
                }
            });
        },200)
            
    },
    passwordFocus(){
        let current = null;
        if (current) current.pause();
        current = anime({
            targets: 'path',
            strokeDashoffset: {
                value: -336,
                duration: 700,
                easing: 'easeOutQuart'
            },
            strokeDasharray: {
                value: '240 1386',
                duration: 700,
                easing: 'easeOutQuart'
            }
        });
    },
  },
  watch: {
    isMemery(n, o) {
      if (n) {
        localStorage.userInfo = this.form.name
        localStorage.passwordInfo = this.form.password
      } else {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('passwordInfo')
      }
    }
  }
};
</script>
<style scoped lang="less">
.bg {
    position: relative;
    overflow: hidden;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../../../static/img/timg.jpg');
    background-position: -20% 10%;
    background-size: contain;
    #particles-js {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
}
.login-wrap {

  .el-form-item {
    margin-bottom: 25px !important;
  }
  .eula {
    text-align: center;
    color: #999;
    margin-top: 0px;
    margin-bottom: 5px;
        font-size: 20px;
    line-height: 1.5;
    margin: 40px;
    span {
        color: #20a0ff;
    }
  }
  a {
    text-decoration: none;
    color: #1f2d3d;
  }
  button {
    width: 100%;
    font-weight: 600;
  }
}

::selection {
    background: #2d2f36;
}
::-webkit-selection {
    background: #2d2f36;
}
::-moz-selection {
    background: #2d2f36;
}
body {
    background: white;
    font-family: 'Inter UI', sans-serif;
    margin: 0;
    padding: 20px;
}
.dowebok {
    background: #e2e2e5;
    display: flex;
    flex-direction: column;
    height: calc(100% - 20px);
    // position: absolute;
    // place-content: center;
    // width: calc(100% - 40px);
}
@media (max-width: 767px) {
    .dowebok {
        height: auto;
        // margin-bottom: 20px;
        // padding-bottom: 20px;
    }
}
.container {
    display: flex;
    height: 350px;
    margin: 0 auto;
    width: 640px;
}
@media (max-width: 767px) {
    .container {
        flex-direction: column;
        height: 630px;
        width: 320px;
    }
}
.left {
    background: white;
    height: calc(100% - 40px);
    top: 20px;
    position: relative;
    width: 50%;
}
@media (max-width: 767px) {
    .left {
        height: 100%;
        left: 20px;
        width: calc(100% - 40px);
        max-height: 270px;
    }
}
.login {
    font-size: 50px;
    font-weight: 900;
    margin: 50px 40px 40px;
}

.right {
    background: #474a59;
    // box-shadow: 0px 0px 40px 16px rgba(0, 0, 0, 0.22);
    color: #f1f1f2;
    position: relative;
    width: 50%;
}
@media (max-width: 767px) {
    .right {
        flex-shrink: 0;
        height: 100%;
        width: 100%;
        max-height: 360px;
    }
}
svg {
    position: absolute;
    width: 320px;
}
path {
    fill: none;
    stroke: url(#TBlinearGradient);
    stroke-width: 4;
    stroke-dasharray: 240 1386;
}
.form {
    padding: 20px 40px;
    padding-bottom:0;
    position: absolute;
}
.label {
    color: #c2c2c5;
    display: block;
    font-size: 16px;
    height: 36px;
    font-weight:bold;
}
input {
    background: transparent;
    border: 0;
    color: #f2f2f2;
    font-size: 20px;
    height: 30px;
    line-height: 30px;
    outline: none !important;
    width: 100%;
}
input::-moz-focus-inner {
    border: 0;
}
#submit {
    color: #fff;

    transition: color 300ms;
}
#submit:focus {
    color: #f2f2f2;
}
#submit:active {
    color: #d0d0d2;
}
</style>