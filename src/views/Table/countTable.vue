
<template>
    <div class="main-container">
      <el-scrollbar class="summary" wrap-style="overflow-x: hidden;">
          <div style="margin-top:10px;">
            <div style="padding:10px 0;">总共已选择商品:<span class="red"> {{selectedIdNums}} </span>,本页已选商品:<span class="red"> {{curSelectedIdNums}} </span></div>
              <table style="width: 100%;border-collapse:collapse;border: 1px solid #d1d3e0;background:#fff;">
                  <tr class="grid-header">  
                      <td class="grid-header-cell head" style="width: 70px;">
                          <UiCheckBox v-model="selectAll" @changed="changeSelectAll"></UiCheckBox> 本页
                      </td>
                      <td class="grid-header-cell" style="">
                          商品信息
                      </td>
                      <td class="grid-header-cell" style="width: 120px;">
                          星级
                      </td>
                      <td class="grid-header-cell" style="width: 120px;">
                          内容
                      </td>
                      <td class="grid-header-cell tail" style="width: 120px;">
                          用户
                      </td>
                      <td class="grid-header-cell tail" style="width: 180px;">
                          时间
                      </td>
                      <td class="grid-header-cell tail" style="width: 120px;">
                          回复内容
                      </td>
                      <td class="grid-header-cell tail" style="width:160px;">
                          操作
                      </td>
                  </tr>
                  <tr class="grid-row" v-if="isLoading">
                      <td class="grid-row-cell head tail" style="text-align:center;width:500px;height: 200px;" colspan="8">
                          <UiLoading :show="isLoading" :size="20" text="正在加载..."></UiLoading>
                      </td>
                  </tr>
                  <tr class="grid-row" style="height:80px;"  v-for="(ware,n) in wares" :key="ware.ware_id">
                      <td class="grid-row-cell head">
                          <UiCheckBox v-model="checkStatus[n]" @changed="onWareSelectionChange(ware.ware_id,n)"></UiCheckBox> {{(n+1)+(page-1)*pageSize}}
                      </td>
                      <td class="grid-row-cell">
                        <div style="display:flex;align-items: center;justify-content: flex-start">
                          <div class="item-pic-wrap" style="cursor:pointer">
                              <img :src="utils.getJDMainImgSrc(ware.logo)" class="main-pic-wrapper" style="width:50px;height:50px;" />
                              <div :class="{'img-pic-tooltip':true,'item-pic-tooltip-shift':utils.shouldShift(n,wares.length)}">
                                  <img :src="utils.getJDMainImgSrc(ware.logo)" class="item-pic-big" />
                              </div>
                          </div>
                          <div style="flex:1;margin-left:5px;">
                              <a class="alink" :href="ware.itemUrl" :title="ware.title" target="_Blank" style="display:block;">
                                  <div v-if="ware.wareStatus" class="ware-status-box" :class="{'onsale':ware.wareStatus==8}">{{ware.wareStatus==8?'在售':'待售'}}</div>
                                    {{utils.maxLen(ware.title,35)}}
                                    <span v-if="!ware.title"><i class="el-icon-circle-close"></i> 商品已经被删除/不存在</span>
                                  </a>
                              
                              <span style="display: block;color:#999;margin-top:10px;">
                                  编码：{{ware.ware_id}}&nbsp;&nbsp;
                                  <span :title="ware.itemNum" style="margin-left:3px;">货号：{{utils.maxLen(ware.itemNum,20)}}  </span>
                              </span>
                          </div>
                        </div>
                      </td>
                      <td class="grid-row-cell">
                        2
                      </td>
                      <td class="grid-row-cell" >
                        3
                      </td>
                      <td class="grid-row-cell" style="">
                        4
                      </td>
                      <td class="grid-row-cell" style="">
                        5
                      </td>
                      <td class="grid-row-cell" style="">
                        6
                      </td>
                      <td class="grid-row-cell" style="">
                          <button  slot="reference"  class="button-border-none" @click="batchReply([ware.ware_id])"><i class="el-icon-edit-outline" ></i>操作</button>
                      </td>
                  </tr>
              </table>

              <div style="padding:20px;text-align: center; margin-bottom: 65px;background:#fff;">
                <el-pagination 
                  background
                  layout="prev, pager, next" 
                  :small="false"
                  :page-size="pageSize"
                  :total="total"
                  :current-page="page"
                  @current-change="pageChange"
                  >
                </el-pagination>
              </div>

          </div>
      </el-scrollbar>
    </div>
</template>

<script>
import utils from '@/common/Utils';
export default {
  data() {
    return {
        isLoading:true,
        wares:[],
        total:0,
        pageSize:10,
        page:1,
        selectAll: false,
        curSelectedIdNums:0,
        excludedWareIdsOther: [],
        checkStatus: [],
        utils:utils,
    }
  },
  computed: {
    selectedIdNums(){
      return this.excludedWareIdsOther.length;
    },
  },
  created() {
    this.getList()
  },
  methods: {
    getList(){
      this.isLoading = true;
      this.checkStatus = [];
      this.wares = [];
      this.$axios.get('https://www.easy-mock.com/mock/5c74f8ca34642251e9ef6eb8/example_copy/listShopGoodsInfo.do'+this.page)
      .then((response)=>{

        setTimeout(()=>{
            this.isLoading = false;
            var data = response.data;
            this.wares = data.rows;
            this.total = data.total
            if (this.excludedWareIdsOther.length>0) {
              this.selectAll = utils.includes(this.excludedWareIdsOther,this.wares,'ware_id')
              this.wares.some((item1,j) =>{
                let itemStatus =  false;
                this.excludedWareIdsOther.forEach((item2)=>{
                  if(item1['ware_id'] === item2){
                      itemStatus = true;
                  }
                })
                this.checkStatus[j] = itemStatus;
              });
            }
          this.changeCheckStatus();
          this.getCurSelectedIdNums();
        },1000)

      })
      .catch(function (error) {
        console.log(error);
      });
    },
    pageChange(page){//点击页数
      this.page = page;
      this.getList()
    },
    batchReply(wares){
      if (wares.length<=0) {this.$messager.error("您尚未选择任何商品");return};
      // console.log('batchReply',wares);
    },
    startTimePickerChanged(){//确定开始时间
        if(this.effectiveEndTime!='' && this.effectiveEndTime < this.effectiveStartTime){
            this.effectiveStartTime = '';
            this.$messager.error("结束时间早于生效时间")
        }
    },
    endTimePickerChanged(){//确定结束时间
        if(this.effectiveStartTime!='' && this.effectiveEndTime < this.effectiveStartTime){
            this.effectiveEndTime = '';
            this.$messager.error("结束时间早于生效时间")
        }
    },
    changeCheckStatus() {//获取数据后判断是否全选
        let allCheckStatus = this.checkStatus.every((item)=>{
          return item===true;
        })

        if (allCheckStatus&&this.checkStatus.length==this.wares.length&&this.checkStatus.length!=0) {
          this.selectAll = true;
        }else{
          this.selectAll = false;
        }
    },
    onWareSelectionChange(wareId, n) {//单选
      this.excludeWareId(wareId,n);
      this.changeCheckStatus();
      this.getCurSelectedIdNums();
    },
    changeSelectAll(b){//全选
        for(var i in this.wares){
            this.checkStatus.splice(i,1,b);
            this.excludeWareId(this.wares[i].ware_id,i);
        }
        
        this.getCurSelectedIdNums();
        // console.log(this.checkStatus,b)
        // console.log('excludedWareIdsOther',this.excludedWareIdsOther);
    },
    excludeWareId(id,n){//去重
        if(!id || id==""){
            return;
        }
        if(this.checkStatus[n]==true){
            if(this.excludedWareIdsOther.indexOf(id)<0)
            {
                utils.push(this.excludedWareIdsOther,id);
            }
        }
        else{
            utils.remove(this.excludedWareIdsOther,id);
        }
    },

    getCurSelectedIdNums() {//获取当前页被选个数
      // this.changeCheckStatus();
      this.curSelectedIdNums  = this.checkStatus.filter((item)=>{
        return item===true
      }).length
    }
  }
}
</script>

<style lang="less" scoped>


.dialog-footer{
  margin-top:30px;
  text-align: center;
}
.button-border-none {
    width: 90px;
    border: none;
    text-align: center;
    border-radius: 4px;
    background-color: transparent;
    height: 24px;
    line-height: 22px;
    color: #000;
    cursor: pointer;
    outline: none;
    font-size: 12px;
    vertical-align: middle;
    &:hover{
      color: #909399;
    }
    i{
      vertical-align: middle;
      font-size:20px;
      margin-right:3px;
    }
    
}


</style>