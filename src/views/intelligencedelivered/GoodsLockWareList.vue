<template>
<div>
<table v-if="listMode==1" style="width: 100%;border-collapse:collapse;"> 
            <tr class="grid-header">
                <td class="grid-header-cell head" style="width: 70px;">
                    <UiCheckBox v-model="selectAll" @changed="changeSelectAll"></UiCheckBox> 本页
                </td>
                <td class="grid-header-cell" style="width: 100px;">
                    锁定状态
                </td>
                <td class="grid-header-cell" style="width:calc(100% - 750px)">
                    商品标题
                </td>
                <td class="grid-header-cell" style="width: 200px;">
                    京东分类
                </td>
                <td class="grid-header-cell tail" style="width: 120px;">
                    价格/库存
                </td> 
                <td class="grid-header-cell tail" style="width: 220px;">
                    操作
                </td>               
            </tr>
            <tr class="grid-row"  v-if="isLoading">
                <td class="grid-row-cell head tail" style="text-align:center;width:500px" colspan="7">
                    <UiLoading :show="isLoading" :size="20" text="正在加载..."></UiLoading>
                </td>
            </tr>
            <tr v-else class="grid-row" :class="{'selected':checkStatus[n]}" v-for="(ware,n) in wares" :key="ware.ware_id">
                <td class="grid-row-cell head">
                    <UiCheckBox v-model="checkStatus[n]" @changed="onWareSelectionChange(ware.ware_id,n)"></UiCheckBox> {{(n+1)+(page-1)*pageSize}}
                </td>
                <td class="grid-row-cell">锁定</td>
                <td class="grid-row-cell" style="display:flex;align-items: center;justify-content: flex-start">
                    <div class="item-pic-wrap" style="cursor:pointer">
                        <img :src="utils.getJDMainImgSrc(ware.logo)" class="main-pic-wrapper" style="width:40px;height:40px;" />
                        <div :class="{'img-pic-tooltip':true,'item-pic-tooltip-shift':utils.shouldShift(n,wares.length)}">
                            <img :src="utils.getJDMainImgSrc(ware.logo)" class="item-pic-big" />
                        </div>
                    </div>
                    <div style="flex:1;margin-left:5px;">
                        <div v-if="ware.wareStatus" class="ware-status-box" :class="{'onsale':ware.wareStatus==8}">{{ware.wareStatus==8?'在售':'待售'}}</div>
                        <a class="alink" :href="ware.itemUrl" :title="ware.title" target="_Blank">
                            {{utils.maxLen(ware.title,35)}}
                        </a>
                        <!-- <i class="el-icon-edit" style="color:gray;cursor:pointer" title="前往快速编辑" @click="gotoEditor(ware.ware_id)"></i> -->
                        <br/>
                        <span style="color:#999">
                        编码：{{ware.ware_id}}&nbsp;&nbsp;
                        <span :title="ware.itemNum" style="margin-left:3px;">货号：{{utils.maxLen(ware.itemNum,20)}}</span>
                        </span>
                    </div>
                </td>
                <td class="grid-row-cell">
                     {{ware.cateName1}}>{{ware.cateName2}}>{{ware.cateName3}}
                </td>

                <td class="grid-row-cell ">
                    <div style="">
                        京东价：¥ {{ware.jdPrice}}<br/>
                        库存：{{ware.stockNum}}
                    </div>
                </td>
                <td class="grid-row-cell">
                     <button class="button-2" style="width:120px;"  @click="action('lock',ware)"><i class="el-icon-circle-check"></i>&nbsp;锁定</button>
                     <!-- <button class="button-2" style="width:120px;"  @click="action('cancelLock',ware)"><i class="el-icon-ext-stop"></i>&nbsp;取消锁定</button> -->
                </td>
            </tr>
    </table>
    <div class="big-picture-list-mode" v-if="listMode==2">

        <template v-if="isLoading">
            <div style="height:200px;width:100%;display:flex;justify-content:center;align-items:center;">
             <UiLoading :show="isLoading" :size="20" text="正在加载..."></UiLoading>
            </div>
        </template>
        <template v-else>
        <div class="item" v-for="(ware,n) in wares"  :key="ware.ware_id" :title="ware.cmTitle">
            <div  @click="onWareClick(ware.ware_id,n)">
                <div class="mask" :class="{'selected':checkStatus[n]}">
                    <i class="el-icon-circle-check" style="font-size:40px;color:#FFF"></i>
                </div>
                <img :src="utils.getJDMainImgSrc(ware.logo,'n1')" style="width:220px;height:220px;"/>
            </div>
            <div class="info"><a class="alink" :href="ware.itemUrl" :title="ware.cmTitle" target="_Blank">{{utils.maxLen(ware.title,30)}}</a>
            </div>
        </div>
        </template>
    </div>
</div>

</template>

<script>
import utils from "@/common/Utils";
import vue from 'vue';
export default {
  name: "filterWares",
  props: {
    value: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    wares:{
        type: Array,
        default:[]
    },
    hasTrafficData:{
        type: Boolean,
        default: false
    },
    listMode:{
        type:Number,
        default:1
    }
  },
  
  data() {
    return {
      selectAll:false,
      checkStatus:[],
      utils:utils,
      currentWareId:'',
      showEditor:false
    };
  },
  computed: {
    
  },
  watch: {
        wares:{
            handler: function (newVal, oldVal) {
                this.checkStatus=[];
                this.selectAll=false;
                var count=0;
                for(var i in newVal){
                    if(newVal[i].selected){
                        this.checkStatus.push(true);
                        count++;
                    }
                    else{
                        this.checkStatus.push(false);
                    }
                }
                if(count==this.checkStatus.length && count>0){
                    this.selectAll=true;
                }  
            },
            deep: true
        }
    },
  mounted() {
    // this.selectedWareIds = this.$store.state.batchUpdate.curBatch.selectedWareIds;
    this.selectedWareIds = [];

  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  methods: {
       gotoEditor(wid){
           this.currentWareId=wid;
           this.showEditor = true;
       },
       onWareClick(wareId,n){
            vue.set(this.checkStatus,n,!this.checkStatus[n]);
            this.onWareSelectionChange(wareId,n);
        },
        getShopCateText(shopCateNames) {
            var text = "";
            //console.log("shopCateNames",shopCateNames)
            for (var i=0;i<=shopCateNames.length-1;i++) {
                var shopCateName = shopCateNames[i];
                if(i != 0 && text!=""){
                    text += "<br>";
                }
                if (shopCateName.length == 1 && shopCateName[0] && shopCateName[0] != "") {
                    text += shopCateName[0];
                }
                else if (shopCateName.length == 2 && shopCateName[0] != "" && shopCateName[1] != "") {
                    text += shopCateName[0] + ">" + shopCateName[1]
                }
            }
            return utils.maxLen(text,20);
        },
        onWareSelectionChange(wareId,n){
            this.$emit(this.checkStatus[n]?'selectWare':'unselectWare',wareId);
            this.checkSelectAll();
        },
        changeSelectAll(){
            for(var i in this.checkStatus){
                this.checkStatus[i]=this.selectAll;
                this.$emit(this.selectAll?'selectWare':'unselectWare',this.wares[i].ware_id);
            }
        },
        checkSelectAll(){
            var selAll = true;
            for(var i = 0;i <= this.checkStatus.length-1;i++){
                if(!this.checkStatus[i]){
                    selAll = false;
                }
            }
            this.selectAll= selAll;
        },
      action(t, w) {
        this.$emit("action", { t: t, id: w.ware_id });
      }
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
