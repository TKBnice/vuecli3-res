<template>
    <div style="text-align:center;padding:250px" v-title="'权限测试'">
        <el-button class="animated rollIn" type="primary" size="large" @click="setAdmin" :disabled="isAdminAble"><i class="fa fa-user"></i>&nbsp;&nbsp;我是管理员</el-button>
        <el-button class="animated rollIn rythm rythm-high" size="large" @click="setUser" :disabled="!isAdminAble"><i class="fa fa-user-o"></i>&nbsp;&nbsp;我是吃瓜群众</el-button>
    </div>
</template>
<script>

export default {
  name: "tpl",
  computed: {
    isAdminAble() {//权限判断
      console.log('getters',this.$store.getters.roles)
      let roles = this.$store.getters.roles;
      if (roles.length === 2) {
        return true;
      } else {
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
    }

  },
  methods: {
    setAdmin() {

      this.$router.go(0);

    },
    setUser() {


    }
  }
};
</script>
