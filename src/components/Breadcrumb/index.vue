<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title | capitalize(langType)}}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title | capitalize(langType)}}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
const MENU_ZH  = require('@/lang/zh.js').m.menu
const MENU_EN  = require('@/lang/en.js').m.menu

// console.log(MENU_ZH)

export default {
  data() {
    return {
      levelList: null
    }
  },
  computed:{
    langType() {
      return this.$i18n.locale;
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb();
    // console.log(this.capitalize2('Dashboard'))
  },
  filters: {
    capitalize: function (value,langType) {
      if (!value) return '';
      let title = Object.keys(MENU_ZH).find((item,i)=>{
        item = item.charAt(0).toUpperCase() + item.slice(1)
        return item==value;
      })

      console.log(value)
      if(langType=='zh'){
        return MENU_ZH[title]
      }else{
        return title
      }
      

    }
  },
  methods: {
    capitalize2: function (value) {
      if (!value) return ''
      // console.log(this.langMessages.zh.m.menu)
      // console.log(this.langMessages.en.m.menu)
      const MENU_ZH = this.langMessages.zh.m.menu;
      return Object.keys(MENU_ZH).find((item,i)=>{
        item = item.charAt(0).toUpperCase() + item.slice(1)
        return item==value;
      })
    },
    getBreadcrumb() {
      console.log(this.$route.matched)
      let matched = this.$route.matched.filter(item => {
        if (item.name) {
          return true
        }
      })
      
      const first = matched[0]
      if (first && first.name !== 'Dashboard') {
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      }
      this.levelList = matched
    },
    pathCompile(path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }

      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style  lang="less" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    a{
      color: #2992ee;
    }
    .no-redirect {
      color: #fff;
      cursor: text;
    }
  }
  /*fade*/
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .3s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .3s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
