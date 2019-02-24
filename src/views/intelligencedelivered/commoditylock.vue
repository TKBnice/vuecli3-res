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

  },
  watch: {
    selectedIdNums(newVal){
      console.log(newVal)
    }
  },
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