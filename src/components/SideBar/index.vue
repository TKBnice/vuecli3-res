<!-- 左侧导航组件 -->
<!-- 使用说明：<side-bar></side-bar> -->
<template>

    <div id="sidebar-wrap"  :class="{ collapsed: isCollapse }">
        <h3 class="logo">
          <span class="rythm twist1">{{isCollapse ? 'VUE': 'AUTO VUE'}}</span>
        </h3>
        <el-scrollbar style="height:100%;" wrap-class="scrollbar-wrapper">
          <el-menu 
          background-color="#324157" 
          text-color="#ddd" 
          :default-active="$route.path" 
          :unique-opened="isUnique" 
          :router="isRouter" 
          mode="vertical" 
          :class="{ collapsed: isCollapse }"
          :collapse="isCollapse">
            <template v-for="(item,j) in permission_routers">
                <div v-if="item.children" :key="j">
                  <!-- <el-submenu  v-if="!hasOneShowingChild(item.children,item)||(onlyOneChild.children&&!onlyOneChild.noShowingChildren)" :index="resolvePath(item.path)"> -->

                  <template v-if="hasOneShowingChild(item.children,item)&&!item.alwaysShow">
                    <el-menu-item    :index="resolvePath(item.children[0].path,item.path)" :data="resolvePath(item.children[0].path,item.path)">
                        <i :class="item.meta.icon"></i>
                        <span slot="title">{{generateTitle(item.meta.title)}}</span>
                    </el-menu-item>
                  </template>

                  <el-submenu v-else  :index="resolvePath(item.path)" :data="resolvePath(item.path)">
                        <template slot="title">
                          <i :class="item.meta.icon"></i>
                          <span  slot="title">{{generateTitle(item.meta.title)}}</span>
                        </template>

                        <el-menu-item  v-for="(child,k) in item.children"  :index="resolvePath(child.path,item.path)" :key="k">
                            <span slot="title">{{generateTitle(child.meta.title)}}</span>
                        </el-menu-item>
                  </el-submenu>
              </div>
            </template>
          </el-menu>
        </el-scrollbar >
        <div class="animated fast bounceInDown imgWrap">
            <img src="../../assets/img/little.gif" height="60px" class="gif rythm pulse3"  @click="toggleDance">
        </div>
    </div>
  
</template>
<script>
import path from 'path'
import Rythm from "rythm.js";
const rythm = new Rythm();
const music = require("../../assets/audio/romeostune.mp3");
import bus from "@/bus";
import { mapGetters } from 'vuex'
import { isExternal } from '@/utils'
export default {
  name: "sidebar",
  data() {
    return {
      isMusicOn: false,
      isUnique: false,
      isRouter: true,
      menu: localStorage.menu ? JSON.parse(localStorage.menu) : [],
      onlyOneChild:null
    };
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'isCollapse'
    ]),
    langType() {
      return this.$i18n.locale;
    }
  },
  created() {
    this.initRythm();
    bus.$on("stopMusic", () => {
      this.isMusicOn = false;
      rythm.stop();
    });
    // console.log(this.permission_routers)
    // console.log(this.menu)
  },
  methods: {
    generateTitle(title) {

      // $t(path, locale, option) // text 文本替换，locale可单独设置语言，option可传参数替换模板
      // $tc(path, choice, locale, option) // text+choice 比$t多一个choice，可以选择模板内容（模板内容间用 | 分隔，如 香蕉|苹果|梨，最多只能使用三个选项，下标从0开始，当选项为2个时下标从1开始~~）
      // $te(path) // text+exist 判断当前语言包中path是否存在
      // $d(number|Date, path, locale) // date 时间格式化
      // $n(number, path, locale) // number  数字格式化（货币等）

      const hasKey = this.$te('route.' + title)

      if (hasKey) {
        // $t :this method from vue-i18n, inject in @/lang/index.js
        const translatedTitle = this.$t('route.' + title)
        
        return translatedTitle
      }
      return title
    },
    hasOneShowingChild(children,parent){
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })
      
      if (showingChildren.length === 1) {
        // console.log('item',!this.onlyOneChild.children||this.onlyOneChild.noShowingChildren);
        return true
      }
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    resolvePath(routePath,basePath) {

      if (this.isExternalLink(routePath)) {
        return routePath
      }
      return path.resolve(basePath, routePath)
    },
    isExternalLink(routePath) {
      return isExternal(routePath)
    },
    initRythm() {
      rythm.setMusic(music);
      rythm.addRythm("twist1", "twist", 0, 10);//第一个参数是类名，第二个是动画名
      rythm.addRythm("pulse3", "pulse", 0, 10, {
        min: 0.75,
        max: 1.5
      });
    },
    toggleDance() {
      console.log(rythm)
      if (this.isMusicOn) {
        this.isMusicOn = false;
        rythm.stop();
      } else {
        this.isMusicOn = true;
        rythm.start();
      }
    }
  }
};
</script>
<style lang="less">
#sidebar-wrap.collapsed{
  width: 64px;
}
#sidebar-wrap {
    -webkit-transition: width 0.28s;
    transition: width 0.28s;
    width: 160px;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    overflow: hidden;
    background-color: rgb(50, 65, 87);
  /* 图标动画 */

  .imgWrap {
    text-align: center;
    position: absolute;
    bottom: 30px;
    width: 100%;
    .gif {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .logo {
    color: #fff;
    text-align: center;
    background: #324157;
    padding: 17px 0;
    margin: 0;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    overflow: hidden;
  }
  .el-menu.collapsed{
    -webkit-transition: width 0.28s;
    transition: width 0.28s;
    width: 64px;
  }
  .el-menu {
    width: 160px;
    height: 100%;
    border-right: none; 
  }

  .el-menu--collapse .el-submenu > .el-submenu__title > .el-submenu__icon-arrow{
    display: none;
  }

  .el-menu--collapse .el-submenu > .el-submenu__title > span{
      height: 0;
      width: 0;
      overflow: hidden;
      visibility: hidden;
      display: inline-block;
  }
  // 改变元素属性，要不动画效果不管用，是不是很厉害啊？哈哈哈
  .rythm.twist1 {
    display: block;
    height: 16px;
    line-height: 16px;
    overflow: hidden;
  }
}





</style>
