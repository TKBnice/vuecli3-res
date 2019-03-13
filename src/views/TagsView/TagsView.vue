<template id="">
  <div class="tags-view-container">
    <scroll-panel class="tags-view-wrap">
      <router-link v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path"  class="tags-view-item" :class="isActive(tag)?'active':''">
        {{tag.title}}
         <span class='el-icon-close' @click.prevent.stop="delSelectTag(tag)"></span>
      </router-link>
    </scroll-panel>
  </div>
</template>
<script>
import ScrollPane from './ScrollPane'
  export default {
    name: 'tags-view',
    data () {
      return {
        msg: 'vue-ueditor',

      }
    },
    components:{
        'scroll-panel':ScrollPane
    },
    computed:{
        visitedViews(){//store中取值
        return this.$store.state.user.visitedviews
        }
    },
    watch:{
        $route(){
        this.addViewTags();
        }
    },
    mounted() {

    },
    methods: {
        isActive(route){
            return route.path == this.$route.path
        },
        addViewTags(){//路由改变时执行的方法
            if(this.$route.name){
                const route = this.$route
                this.$store.dispatch('addVisitedViews',route);
            }
        }, 
        delSelectTag(route){//先提交删除数据的方法,数组删除出掉数据后，如果关闭的是当前打开的路由需要将路由改为数组最后一次push进去的路由
            this.$store.dispatch('delVisitedViews',route).then((views)=>{
                if(this.isActive(route)){//只有在关闭当前打开的标签页才会有影响
                    let lastView = views.slice(-1)[0]//选取路由数组中的最后一位
                    if(lastView){
                        this.$router.push(lastView);
                    }else{
                        this.$router.push('/');
                    }
                }
            })
        }

    },
    destroyed() {

    }
  }
</script>

<style lang="less" >

.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrap{
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      text-decoration: none;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
