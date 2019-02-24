<template>
  <div>
<div class="floating-bar" :class="{'floatingBarCollapse':isCollapse}">
        <div class="portage-steps-main-footer"  style="margin-top:15px">
            
          <div style="width: 200px;display: inline-block;color:#FFF;font-size:16px;position:absolute;left:0px">
              已选择&nbsp;<span style="font-size:20px;font-weight:bold">{{selectedWareIds.length}}</span> 个商品
          </div> 
          <RippleButton classsName="main-step-button mid2" @click="onShelfLock">&nbsp;上架锁定</RippleButton>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <RippleButton classsName="main-step-button mid2" @click="lowerFrameLock">&nbsp;下架锁定</RippleButton>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <RippleButton classsName="main-step-button mid2" @click="cancelOnShelfLock">&nbsp;取消上架锁定</RippleButton>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <RippleButton classsName="main-step-button mid2" @click="cancelLowerFrameLock">&nbsp;取消下架锁定</RippleButton>
        </div>
    </div>
    <WareFilter
      ref="wareFilter0"
      @change="wareFilterChange"
      :watermarkId="watermarkId"
      :wareFilters="wareFilters"
      :lockViewShow="lockViewShow"
      :shopId="shopId"
      :shopAuthCode="shopAuthCode"
    ></WareFilter>
    <div style="margin-top:15px;">
        <div class="grid-title">
            <div class="grid-title-left">
            <template v-if="!isViewSelectedOnly">
            &nbsp;&nbsp;共找到 <span style="font-size: 16px;font-weight: bold">{{totalCount}}</span> 个商品
            已选择 <span style="font-size: 16px;font-weight: bold">{{selectedWareIds.length}}</span> 个商品
            &nbsp;&nbsp;<button class="button-2" style="width:160px" :class="{'hightlight':(totalCount==selectedWareIds.length) && totalCount>0}" @click="loadWareIds">
                            <i class="el-icon-circle-check" ></i>&nbsp;全选{{totalCount}}个商品
                        </button>
            </template>
            <template v-else>
                &nbsp;&nbsp;正在查看已选的商品，共<span style="font-size: 16px;font-weight: bold">{{selectedWareIds.length}}</span> 个
            </template>
            &nbsp;&nbsp;<button class="button-2"  @click="loadOnlySelectedWares">
                <i class="el-icon-ext-inspect" ></i>&nbsp;{{isViewSelectedOnly?'查看全部':'只看已选'}}</button>
            <!-- &nbsp;&nbsp;<button class="button-2" style="width:150px" @click="exportSelectedWareId">
                <i class="el-icon-ext-inspect" ></i>&nbsp;导出已选的商品编码</button> -->
            &nbsp;&nbsp;<button class="button-2" @click="cleanAllSelected"><i class="el-icon-delete" ></i>&nbsp;清空已选</button>
            
            
            </div>
            
            <div class="grid-title-right" style="display:flex;flex-flow:row;align-items:center">
                <span v-if="portingWareOnly" style="color:#999">仅显示搬家商品&nbsp;&nbsp;&nbsp;&nbsp;</span>

                <el-select v-model="orderby" placeholder="排序" size="mini" style="width: 155px" @change="loadWares">
                    <el-option label="按上(下)架时间排序" value="onoff"></el-option>
                    <el-option label="按最后修改时间排序" value="modified"></el-option>
                </el-select>

                &nbsp;&nbsp;<button v-if="supportedBigPicMode" class="button-2" @click="changeListMode"><i class="el-icon-ext-compare" ></i>&nbsp;{{listMode==1?"大图":"列表"}}模式
                </button>
            </div>
        </div>
        <GoodsLockWareList v-if="wareListMode=='goodsLock'"
            :wares="wares" :isLoading="isLoading" 
            :hasTrafficData="hasTrafficData"
            :listMode="listMode"
            @selectWare="selectWare" 
            @unselectWare="unselectWare"
            @action="onWareAction"
            >
        </GoodsLockWareList>
    </div>
    
  </div>
</template>

<script>
import utils from "@/common/Utils";
import WareFilter from "./WareFilter";
import GoodsLockWareList from "./GoodsLockWareList";

import vue from "vue";
import Data1 from './data1.json';

export default {
  name: "filterWares",
  props: {
    value: {
      type: Number,
      default: 0
    },
    wareListMode:{
      type:String,
      default:''
    },
    watermarkId: {
      type: String,
      default: ""
    },
    wareFilters: {
      type: String,
      default: ""
    },
    lockViewShow: {
      type: Boolean,
      default: false
    },
    shopId: {
      type: String,
      default: ""
    },
    shopAuthCode: {
      type: String,
      default: ""
    },
    portingWareOnly:{
        type:Boolean,
        default:false
    },
  },

  data() {
    return {
      page: 1,
      pageSize: 10,
      wares:Data1.wares,
      totalCount: 0,
      utils: utils,
      selectedWareIds: [],
      queryParams: {
        wareFilter: {}
      },
      isLoading: false,
      orderby: "modified",
      isViewSelectedOnly:false,
      previusQueryParams:{},
      hasTrafficData:false,
      listMode:1
    };
  },
  components: {
    WareFilter,
    GoodsLockWareList
  },
  computed: {
    supportedBigPicMode:function(){
      return this.wareListMode!='matting' && this.wareListMode!='whiteGroundImages' ;
    },
    isCollapse() {
      return this.$store.getters.isCollapse
    }
  },
  watch: {
    wares: {
      handler: function(newVal, oldVal) {
        this.checkStatus = [];
        this.selectAll = false;
        var count = 0;
        for (var i in newVal) {
          if (newVal[i].selected) {
            this.checkStatus.push(true);
            count++;
          } else {
            this.checkStatus.push(false);
          }
        }
        if (count == this.checkStatus.length && count > 0) {
          this.selectAll = true;
        }
      },
      deep: true
    }
  },
  mounted() {
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  methods: {
    onShelfLock(){

    },
    lowerFrameLock(){

    },
    cancelOnShelfLock(){

    },
    cancelLowerFrameLock(){

    },
    initFilters(fitler) {
      if(this.$refs.wareFilter0!=undefined){
          this.$refs.wareFilter0.initFilters(fitler);
      }
      else{
          setTimeout(()=>{
              this.initFilters(fitler);
          },500);
      }
    },
    loadWareIds() {
      this.queryParams = this.getQueryParamater();
    //   backendAPI
    //     .postAPI("queryWareIds.do?shopId=" + this.shopId, this.queryParams)
    //     .then(data => {
    //       this.selectedWareIds = utils.merge(
    //         data.wareIds,
    //         this.selectedWareIds
    //       );
    //       for (var i = 0; i < this.wares.length; i++) {
    //         var ware = this.wares[i];
    //         ware.selected = true;
    //         this.$set(this.wares, i, ware);
    //       }

    //       this.updateValue();
    //     })
    //     .catch(errormsg => {
    //       //this.$messager.error(errormsg.error||errormsg);
    //     });
    },
    loadOnlySelectedWares(){
        this.isViewSelectedOnly=!this.isViewSelectedOnly;

        this.page=1;
        if(this.isViewSelectedOnly){
            this.previusQueryParams = utils.cloneJSON(this.queryParams);
            this.queryParams = {
                wareFilter: {
                        wareIds:this.selectedWareIds
                    }
            };
            
            this.loadWares();
        }
        else{
            this.queryParams = this.previusQueryParams;
            this.loadWares();
        }
    },
    loadWares() {

      if(this.isLoading)
      {
        return;
      }
      
      this.isLoading = true;
      this.wares = [];

      //console.log("this.queryParams ",JSON.stringify(this.queryParams))
    //   backendAPI
    //     .postAPI(
    //       "queryWares.do?shopId=" +
    //         this.shopId +
    //         "&shopAuthCode=" +
    //         this.shopAuthCode +
    //         "&pageSize=" +
    //         this.pageSize +
    //         "&page=" +
    //         this.page +
    //         "&orderby=" +
    //         this.orderby+
    //         "&"+this.addQueryParam,
    //       this.queryParams
    //     )
    //     .then(data => {
    //       this.wares = data.wares;
    //       this.totalCount = data.count;
    //       this.hasTrafficData = data.hasTrafficData;
    //       var checkedCount = 0;
    //       for (var i = 0; i < this.wares.length; i++) {
    //         this.wares[i].selected = false;
    //         for (var k in this.selectedWareIds) {
    //           if (this.wares[i].ware_id == this.selectedWareIds[k]) {
    //             this.wares[i].selected = true;
    //             checkedCount++;
    //           }
    //         }
    //         if (this.wares[i].skuIds) {
    //           this.wares[i].itemUrl =
    //             "https://item.jd.com/" + this.wares[i].skuIds[0] + ".html";
    //         }
    //       }
    //       this.isLoading = false;
    //       this.$emit("loaded");
    //       //console.log("this.syncTransPic...",this.syncTransPic)
    //       if(this.syncTransPic){
    //         this.startSyncTransPics();
    //       }
    //     })
    //     .catch(errormsg => {
    //       this.isLoading = false;
    //       //this.$messager.error(errormsg.error||errormsg);
    //     });
    },
    getQueryParamater() {
      return this.queryParams;
    },
    wareFilterChange(fitler) {
      //console.log("ws wareFilterChange .... ",fitler)
      this.queryParams = fitler;
      this.isViewSelectedOnly = false;
      //   this.loadWares();
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
      // console.log(l);
      this.$emit("input", l);
    },
    resetSelectedWareIds() {
      //this.selectedWareIds = [];
      this.cleanAllSelected();
    },
    cleanAllSelected() {
      this.selectedWareIds = [];
      this.updateValue();
      for (var i = 0; i < this.wares.length; i++) {
        var ware = this.wares[i];
        ware.selected = false;
        this.$set(this.wares, i, ware);
      }
      //this.changeSelectAll(false);
    },
    changeListMode(){
      if(this.listMode==1){
          this.listMode=2;
      }
      else{
        this.listMode=1;
      }
     // console.log("  listMode {{listMode}}",  this.listMode)
    },
     onWareAction(msg){
      this.$emit('action',msg);      
    },
  }
};
</script>
<style>
.grid-row-cell-a {
  margin-left: 5px;
  color: #333;
  text-decoration: none;
}
.grid-row-cell-a:hover {
  color: blue;
}
</style>
