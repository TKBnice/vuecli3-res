<template>
    <div class="app-container" v-title="'权限测试'">
      <div style="margin:0 auto; margin-top:60px">
        <el-button   :type="switchRoles==='admin'?'primary':''" size="large" @click="setAdmin" >
          <i class="fa fa-user"></i>&nbsp;&nbsp;我是管理员</el-button>
        <el-button   :type="switchRoles==='admin'?'':'primary'" size="large" @click="setUser" >
          <i  class="fa fa-user-o"></i>&nbsp;&nbsp;我是吃瓜群众</el-button>
      </div>
      <div :key="key" style="margin-top:30px;"> 
              <div>
        <span v-permission="['admin']" class="permission-alert">
            Only
            <el-tag class="permission-tag" size="small">admin</el-tag> can see this
          </span>
          <el-tag v-permission="['admin']" class="permission-sourceCode" type="info">v-permission="['admin']"</el-tag>
        </div>
        
        <div>
          <span v-permission="['editor']" class="permission-alert">
            Only
            <el-tag class="permission-tag" size="small">editor</el-tag> can see this
          </span>
          <el-tag v-permission="['editor']" class="permission-sourceCode" type="info">v-permission="['editor']"</el-tag>
        </div>

        <div>
          <span v-permission="['admin','editor']" class="permission-alert">
            Both
            <el-tag class="permission-tag" size="small">admin</el-tag> and
            <el-tag class="permission-tag" size="small">editor</el-tag> can see this
          </span>
          <el-tag v-permission="['admin','editor']" class="permission-sourceCode" type="info">v-permission="['admin','editor']"</el-tag>
        </div>
      </div>
    </div>
</template>
<script>

export default {
  name: "tpl",
  data(){
    return {
      key:0,
      switchRoles:'admin'
    }
  },
  computed: {
    roles() {
      return this.$store.getters.roles
    },
    isAdminAble() {//权限判断
      console.log('getters',this.$store.getters.roles)
      let roles = this.$store.getters.roles;
      if (roles.length === 2) {
        return true;
      } else if (roles.length === 1 ){
        return false;
      }
    },
    checkPermission(value) {
      if (value && value instanceof Array && value.length > 0) {
        const roles = store.getters && store.getters.roles
        const permissionRoles = value

        const hasPermission = roles.some(role => {
          return permissionRoles.includes(role)
        })

        if (!hasPermission) {
          return false
        }
        return true
      } else {
        console.error(`need roles! Like v-permission="['admin','editor']"`)
        return false
      }
    },
    // switchRoles: {
    //   get() {
    //     return this.roles[0]
    //   },
    //   set(val) {
    //     this.$store.dispatch('ChangeRoles', val).then(() => {
    //       this.$emit('change')
    //     })
    //   }
    // }

  },
  methods: {
    handleRolesChange() {
        this.$router.push({ path: '/Authority/index?' + +new Date() })
    },
    setAdmin() {
      this.switchRoles = 'admin';
      this.$store.dispatch('ChangeRoles', 'admin').then(() => {
        this.handleRolesChange()
      })
    },
    setUser() {
      this.switchRoles = 'editor';
      this.$store.dispatch('ChangeRoles', 'editor').then(() => {
          this.handleRolesChange()
      })
    },
    handleRolesChange() {
      this.key++
    }
  }
};
</script>
<style lang="less" scoped>
.app-container {
  padding:250px;
  /deep/ .permission-alert {
    width: 320px;
    margin-top: 15px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: inline-block;
  }
  /deep/ .permission-sourceCode {
    margin-left: 15px;
  }
  /deep/ .permission-tag {
    background-color: #ecf5ff;
  }
}
</style>

