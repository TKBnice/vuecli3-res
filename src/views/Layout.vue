<template>
    <div>
        <!-- 这是侧导航 -->
        <side-bar></side-bar>
        <div class="con-wrap" :class="{conCollapse: isCollapse}">
            <!-- 这是顶部导航 -->
            <top-bar></top-bar>
            <!-- 这是组件要插入的地方 -->
            <div style="position: relative;overflow: hidden;">
              <transition name="fade-transform" mode="out-in">
                <router-view class="page-component-wrap animated fadeIn"></router-view>
              </transition> 
            </div>
            
        </div>
    </div>
</template>
<script>
import TopBar from '@/components/TopBar'
import SideBar from '@/components/SideBar'
import '@/filters/handleNum.js'
export default {
  name: 'layout',
  computed: {
    isCollapse() {
      // return this.$store.state.common.isCollapse

      return this.$store.getters.isCollapse
      // return true

    }
  },
  components: {
    'top-bar': TopBar,
    'side-bar': SideBar
  }
}
</script>
<style scoped>
/*fade-transform*/
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .3s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

