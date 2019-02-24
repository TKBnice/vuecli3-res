<template>
  <div class="main-body" v-title="'智能上下架'">
    <!-- <div class="tab-labels">
        <el-button type="primary" @click="handleChangeTab('intelligencedelivery')">智能上下架</el-button>
        <el-button type="primary" @click="handleChangeTab('commoditylock')">商品锁定</el-button>
        <el-button type="primary" @click="handleChangeTab('deliveryRecord')">上下架历史</el-button>
    </div> -->
    <div class="tab-labels" style="margin-top:10px">
        <div class="tab-lable first" :class="{'active':activeTab==1}" @click="switchTab(1)"><div class="tab-active-bar" ></div>
        智能上下架配置</div>
        <div class="tab-lable middle" :class="{'active':activeTab==2}" @click="switchTab(2)"><div class="tab-active-bar" ></div>
        锁定商品设置</div>  
        <div class="tab-lable middle" :class="{'active':activeTab==3}" @click="switchTab(3)"><div class="tab-active-bar" ></div>
        上下架历史</div>            
        <div class="tab-lable placeholder">&nbsp;</div>
    </div>
    <div class="tab-main"> 
        <component :is="currentTabComponent"></component>
    </div>
  </div>

</template>

<script>
import intelligencedelivery from './intelligencedelivery';
import commoditylock from './commoditylock';
import deliveryRecord from './deliveryRecord';

export default {
  data() {
    return {
      activeTab:1,
      currentTabComponent:"intelligencedelivery"
    };
  },
  components: {
    intelligencedelivery,
    commoditylock,
    deliveryRecord
  },
 watch: {
      $route: {
          handler: function(newRouter){
              var activeTab= newRouter.query.activeTab||1;
              this.switchTab(activeTab)
          },
          deep: true
      }
    },
  mounted() {},
  methods: {
    switchTab(tabIdx){
          this.activeTab=tabIdx;
          if(tabIdx==2){
              // this.loadWareRecords('');
              this.currentTabComponent = "commoditylock";
          }else if(tabIdx==3){
              this.currentTabComponent = "deliveryRecord";
          }
          else{
              // this.initFilter();
              this.currentTabComponent = "intelligencedelivery";
          }
      },
  }
};
</script>
<style lang="less" >
.marginT20 {
  margin-top: 20px;
}
.textCenter {
  text-align: center;
}
.verticalLine-title {
  padding-left: 10px;
  height: 32px;
  line-height: 32px;
  position: relative;
  &::after {
    content: "";
    width: 4px;
    height: 14px;
    background: #2992ee;
    position: absolute;
    left: 0px;
    top: 8px;
  }
}
</style>