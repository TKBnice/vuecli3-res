<template id="">
  <div class="tags-view-container">
    <scroll-panel class="tags-view-wrap">
      <router-link 
      v-for="tag in Array.from(visitedViews)" 
      :to="tag.path" 
      :key="tag.path"  
      class="tags-view-item" 
      @click.middle.native="closeSelectedTag(tag)"
      :class="isActive(tag)?'active':''">
        {{generateTitle(tag.title)}}
         <span v-if="!tag.meta.affix" class='el-icon-close' @click.prevent.stop="delSelectTag(tag)"></span>
      </router-link>
    </scroll-panel>
  </div>
</template>
<script>
import ScrollPane from './ScrollPane'
import path from 'path'
  export default {
    name: 'tags-view',
    data () {
      return {
        msg: 'vue-ueditor',
        affixTags:[]        
      }
    },
    components:{
        'scroll-panel':ScrollPane
    },
    computed:{
        visitedViews(){//store中取值
          return this.$store.state.user.visitedviews
        },
        routers() {
          return this.$store.state.user.routers
        }
    },
    watch:{
        $route(){
        this.addViewTags();
        }
    },
    mounted() {
      this.initTags()
      this.addTags()
      // console.log('visitedViews',this.visitedViews)
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
        initTags() {
          const affixTags = this.affixTags = this.filterAffixTags(this.routers)
          for (const tag of affixTags) {
            // Must have tag name
            if (tag.name) {
              this.$store.dispatch('addVisitedViews', tag)
            }
          }
        },
        addTags() {
          const { name } = this.$route
          if (name) {
            this.$store.dispatch('addVisitedViews', this.$route)
          }
          return false
        },
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
        },
        filterAffixTags(routes, basePath = '/') {
          let tags = []
          routes.forEach(route => {
            if (route.meta && route.meta.affix) {
              const tagPath = path.resolve(basePath, route.path)
              tags.push({
                fullPath: tagPath,
                path: tagPath,
                name: route.name,
                meta: { ...route.meta }
              })
            }
            if (route.children) {
              const tempTags = this.filterAffixTags(route.children, route.path)
              if (tempTags.length >= 1) {
                tags = [...tags, ...tempTags]
              }
            }
          })
          return tags
        },

    },
    destroyed() {

    }
  }
</script>

<style lang="less" >

.tags-view-container {
  height: 34px;
  width: 100%;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrap{
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 24px;
      line-height: 26px;
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
