<template>
<div>

        <div class="marginT20">
          <div class="verticalLine-title" >
            <span style="height:20px;line-height:20px;font-size:16px;" >上下架历史/查看</span>
          </div>
            <div class="operation-wrap" style="" >
                <button class="button-default" style="width:120px;height: 34px;" @click="action('goBack')">
                  <i class="icon-go-back" icon="el-icon-share"></i>&nbsp;返回上一级
                </button>
                <span style="height:20px;line-height:20px;font-size:16px;margin-left:12px;">操作类型：</span>
                <el-select v-model="operationType" clearable  style="width:120px;" placeholder="选择星期" size="small">
                <el-option
                    v-for="item in operationTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
                </el-select>
                <span style="height:20px;line-height:20px;font-size:16px;margin-left:12px;">操作结果：</span>
                <el-select v-model="operationResult" clearable style="width:120px;" placeholder="选择时间" size="small">
                <el-option
                    v-for="item in operationResults"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
                </el-select>
                <div style="float:right;display:flex;">
                  <!-- <el-input size="small" v-model="input" placeholder="请输入内容">
                  </el-input> -->
                  <input type="text" class="input-serach" style="width:280px;" v-model="serachContent" placeholder="商品编码/SKU ID/标题">
                  <button class="button-serach" >搜索</button>
                </div>
            </div>
        </div>
        <div class="marginT20">
        <table style="width: 100%;border-collapse:collapse;border: 1px solid #d1d3e0;border-bottom:none; "> 
            <tr class="grid-header">
                <td class="grid-header-cell" style="width:33%">
                  商品标题
                </td>
                <td class="grid-header-cell textCenter" style="width: 14%;">
                  编码
                </td>
                <td class="grid-header-cell textCenter" style="width: 14%;">
                  货号
                </td>
                <td class="grid-header-cell textCenter" style="width: 12%;">
                    操作
                </td>
                <td class="grid-header-cell textCenter" style="width: 12%;">
                    结果
                </td>
                <td class="grid-header-cell textCenter" style="width: 16%">
                    完成时间
                </td>              
            </tr>
            <tr class="grid-row"  v-if="isLoading">
                <td class="grid-row-cell head tail" style="text-align:center;width:500px" colspan="7">
                    <UiLoading :show="isLoading" :size="20" text="正在加载..."></UiLoading>
                </td>
            </tr>
            <tr v-else class="grid-row" :class="{'selected':checkStatus[n]}" v-for="(ware,n) in wares" :key="ware.ware_id">
                <td class="grid-row-cell" style="display:flex;align-items: center;justify-content: flex-start">
                    <div class="item-pic-wrap" style="cursor:pointer">
                        <img :src="utils.getJDMainImgSrc(ware.logo)" class="main-pic-wrapper" style="width:40px;height:40px;" />
                        <div :class="{'img-pic-tooltip':true,'item-pic-tooltip-shift':utils.shouldShift(n,wares.length)}">
                            <img :src="utils.getJDMainImgSrc(ware.logo)" class="item-pic-big" />
                        </div>
                    </div>
                    <div style="flex:1;margin-left:5px;">
                        <a class="alink" :href="ware.itemUrl" :title="ware.title" target="_Blank">
                            {{utils.maxLen(ware.title,35)}}
                        </a>
                    </div>
                </td>
                <td class="grid-row-cell textCenter">
                    {{ware.ware_id}}
                </td>
                <td class="grid-row-cell textCenter">
                  {{utils.maxLen(ware.itemNum,20)}}
                </td>
                <td class="grid-row-cell textCenter">
                  成功
                </td>
                <td class="grid-row-cell textCenter">
                  上架
                </td>
                <td class="grid-row-cell textCenter">
                  2018-11-19 14:00
                </td>
            </tr>
    </table>
    </div>
</div>

</template>

<script>
import utils from "@/common/Utils";

export default {
  props: {
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
    wares: {
      type: Array,
      default: []
    },
    listMode: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
        serachContent:'',
        selectAll: false,
        checkStatus: [],
        utils: utils,
        currentWareId: "",
        showEditor: false,
        operationType: 'all',
        operationResult:'all',
        offlineStart:'',
        offlineEnd:'',
        pickerOptions: {
            disabledDate(time) {
                return time.getTime() > Date.now();
            }
        },
        operationTypes: 
        [
          {
          value: 'all',
          label: '全部'
          }, {
            value: 'onShelf',
            label: '上架'
          }, {
            value: 'offShelf',
            label: '下架'
          }
        ],
        operationResults:[
            {
            value: 'all',
            label: '全部'
          }, {
            value: 'success',
            label: '成功'
          }, {
            value: 'fail',
            label: '失败'
          }
        ]
    };
  },
  computed: {},
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
  mounted() {},
  beforeRouteLeave(to, from, next) {
    next();
  },
  methods: {
    gotoEditor(wid) {
      this.currentWareId = wid;
      this.showEditor = true;
    },
    onWareClick(wareId, n) {
      this.$set(this.checkStatus, n, !this.checkStatus[n]);
      this.onWareSelectionChange(wareId, n);
    },
    getShopCateText(shopCateNames) {
      var text = "";
      //console.log("shopCateNames",shopCateNames)
      for (var i = 0; i <= shopCateNames.length - 1; i++) {
        var shopCateName = shopCateNames[i];
        if (i != 0 && text != "") {
          text += "<br>";
        }
        if (
          shopCateName.length == 1 &&
          shopCateName[0] &&
          shopCateName[0] != ""
        ) {
          text += shopCateName[0];
        } else if (
          shopCateName.length == 2 &&
          shopCateName[0] != "" &&
          shopCateName[1] != ""
        ) {
          text += shopCateName[0] + ">" + shopCateName[1];
        }
      }
      return utils.maxLen(text, 20);
    },
    onWareSelectionChange(wareId, n) {
      this.$emit(this.checkStatus[n] ? "selectWare" : "unselectWare", wareId);
      this.checkSelectAll();
    },
    changeSelectAll() {
      for (var i in this.checkStatus) {
        this.checkStatus[i] = this.selectAll;
        this.$emit(
          this.selectAll ? "selectWare" : "unselectWare",
          this.wares[i].taskId
        );
      }
    },
    checkSelectAll() {
      var selAll = true;
      for (var i = 0; i <= this.checkStatus.length - 1; i++) {
        if (!this.checkStatus[i]) {
          selAll = false;
        }
      }
      this.selectAll = selAll;
    },
    action(t) {
      this.$emit("action", { t: t });
    },
        resetOfflineEnd(){
      this.offlineEnd=null;
    },
    checkStartEndTime(start,end,name,errCallback){
      if(start && start!='' && end && end!='' && start>end){
        this.$messager.error(name+"范围有误: 【开始时间】晚于【结束时间】");     
        if(errCallback){
          errCallback();
        }
        return;
      }
    }
  }
};
</script>
<style scoped>
.operation-wrap{
  padding-left: 10px;
  overflow: hidden;
  padding-right: 30px;
  margin-top:10px;
}
.grid-header-cell,.grid-row-cell{
  border: none;
}
.grid-row-cell-a {
  margin-left: 5px;
  color: #333;
  text-decoration: none;
}
.grid-row-cell-a:hover {
  color: blue;
}
.button-default{
  width: 60px;
  text-align: center;
  border-radius: 4px;
  border: none;
  background-color: #2992ee;
  height: 24px;
  line-height: 22px;
  color: #fff;
  cursor: pointer;
  outline: none;
  font-size: 12px;
  font-family: "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", "Arial", "sans-serif";
}
.button-primary {
  width: 60px;
  text-align: center;
  border-radius: 25px;
  border: none;
  background-color: #2992ee;
  height: 24px;
  line-height: 22px;
  color: #fff;
  cursor: pointer;
  outline: none;
  font-size: 12px;
  font-family: "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", "Arial", "sans-serif";
}
.button-serach:hover,.button-default:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
}
.button-serach{
  width: 60px;
  text-align: center;
  border: none;
  background-color: #2992ee;
  height: 34px;
  line-height: 22px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  color: #fff;
  cursor: pointer;
  outline: none;
  font-size: 12px;
  font-family: "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", "Arial", "sans-serif";
}
.input-serach {
    outline: none;
    font-size: 12px;
    border: 1px solid #d3d3db;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    height: 34px;
    padding-left: 5px;
    font-family: "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", "Arial", "sans-serif";
}
.input-serach:hover {
    border: 1px solid #AAAAAA;
}
.input-serach:focus{
      border: 1px solid #2992EE;
}
.icon-go-back{
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: middle;
  display: inline-block;
  width: 16px;
  height: 18px;
  -webkit-font-smoothing: antialiased;
  background:url('../../../static/img/goBack.png') no-repeat;
  background-size:16px; 

}
</style>
