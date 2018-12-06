<template>
    <div>
        <!-- 这是侧导航 -->
        <side-bar></side-bar>
        <div class="con-wrap" :class="{conCollapse: isCollapse}">
            <!-- 这是顶部导航 -->
            <top-bar></top-bar>
            <!-- 这是组件要插入的地方 -->
            <router-view class="page-component-wrap animated fadeIn"></router-view>
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

