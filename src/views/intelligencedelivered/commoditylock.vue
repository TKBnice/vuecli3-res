<template>
  <div style="padding:10px; height: auto;">
    
    <div class="tab-main">
      <GoodsLockWare ref="goodsLockSelector"
        wareListMode="goodsLock"
        v-model="selectedIdNums"
        :filterType="filterType"
        :watermarkId="watermarkId"
        :wareFilters="wareFilters"
        :lockViewShow="lockViewShow"
        :shopId="shopId"
        :shopAuthCode="shopAuthCode"
        @change="wareFilterChange"
        >
      </GoodsLockWare>
    </div>
      <div class="floating-bar" :class="{'floatingBarCollapse':isCollapse}">
            <div class="portage-steps-main-footer"  style="margin-top:15px">
                
              <div style="width: 200px;display: inline-block;color:#FFF;font-size:16px;position:absolute;left:0px">
                  已选择&nbsp;<span style="font-size:20px;font-weight:bold">{{selectedIdNums}}</span> 个商品
              </div> 
              <RippleButton classsName="main-step-button mid2" @click="onShelfLock">&nbsp;上架锁定</RippleButton>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <RippleButton classsName="main-step-button mid2" @click="lowerFrameLock">&nbsp;下架锁定</RippleButton>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <RippleButton classsName="main-step-button mid2" @click="cancelOnShelfLock">&nbsp;取消上架锁定</RippleButton>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <RippleButton classsName="main-step-button mid2" @click="cancelLowerFrameLock">&nbsp;取消下架锁定</RippleButton>

              <!-- &nbsp;&nbsp;&nbsp;&nbsp;
              <RippleButton classsName="main-step-button mid2" @click="showConfig=true"><i class="el-icon-setting"></i>&nbsp;自动白底图配置</RippleButton> -->
      
            </div>
      </div>
  </div>

</template>

<script>
import utils from "@/common/Utils";
import GoodsLockWare from './GoodsLockWare';

export default {
  data() {
    return {
      lockViewShow: true,
      filterType: "scope",
      selectedIdNums:0,
      wareFilters:"",
      watermarkId:"",
      shopAuthCode:"",
      selectedWareIds: [],
      shopId:'413483'
    };
  },
  components: {
    GoodsLockWare
  },
  computed: {
    isCollapse() {
      // return this.$store.state.common.isCollapse

      return this.$store.getters.isCollapse
      // return true

    }
  },
  watch: {},
  mounted() {
    this.initFilter();
  },
  methods: {
   initFilter(){
        var initFilterOptions={
            'wareStatus':''                
        };
        if(this.$refs.goodsLockSelector!=undefined){
            this.$refs.goodsLockSelector.initFilters(initFilterOptions);
            this.$refs.goodsLockSelector.resetSelectedWareIds();
        }
        else{
            setTimeout(()=>{
                this.initFilter();
            },500);
        }
    },
    onAction(msg){
        console.log("onAction --->",msg); 
        var t = msg.t;
        var id = msg.wareId;

        if(t=='lock'){
          console.log('id',id)
            this.handlockGoods(id);
        }
        else if(t=='cancelLock'){
            //this.$router.push("/manage-ware/transparent-pic?tab=transparentPics&id="+id);
            this.handCancelLock(id);
        }
    },
    onShelfLock(){

    },
    lowerFrameLock(){

    },
    cancelOnShelfLock(){

    },
    cancelLowerFrameLock(){

    },
    handlockGoods(id){
      console.log('id',id)
      // backendAPI
      // .getAPI("getShopWhiteGroundImagesSummary.do?shopId="+id)
      // .then(data => {

      // })
      // .catch(errormsg => {
      // });
    },
    handCancelLock(id){
      console.log(id)
    },
    selectWare(id) {
      utils.push(this.selectedWareIds, id);
      this.updateValue();
    },
    unselectWare(id) {
      utils.remove(this.selectedWareIds, id);
      this.updateValue();
    },
    updateValue() {
      var l = this.selectedWareIds.length;
      console.log(l)
      this.$emit("input", l);
    },
    wareFilterChange(fitler) {
      //console.log("ws wareFilterChange .... ",fitler)
      this.queryParams = fitler;
      this.isViewSelectedOnly=false;
      // this.loadWares();
    },
  }
};
</script>
<style lang="less" >
</style>