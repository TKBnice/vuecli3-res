<template>
<div>
        <div style="padding-top:10px;">
            <div class="verticalLine-title" >
                <span style="height:20px;line-height:20px;font-size:16px;">批次选择：</span>
                <el-select v-model="week" clearable  style="width:120px;" placeholder="选择星期" size="small">
                <el-option
                    v-for="item in weeks"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
                </el-select>
                <el-select v-model="time" clearable style="width:120px;" placeholder="选择时间" size="small">
                <el-option
                    v-for="item in times"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
                </el-select>
                <span style="height:20px;line-height:20px;font-size:16px;margin-left:120px;">日期选择：</span>
                <el-date-picker
                    v-model="offlineStart"
                    type="date" 
                    placeholder="选择开始时间"
                    size="small" 
                    format="yyyy-MM-dd" 
                    value-format="yyyyMMdd"
                    :picker-options="pickerOptions"
                    @change="checkStartEndTime(offlineStart,offlineEnd,'下架时间',resetOfflineEnd)"
                >
                </el-date-picker>&nbsp;~&nbsp;
                <el-date-picker 
                v-model="offlineEnd" 
                type="date" 
                placeholder="选择结束时间" 
                size="small" 
                format="yyyy-MM-dd"
                value-format="yyyyMMdd"
                :picker-options="pickerOptions"
                @change="checkStartEndTime(offlineStart,offlineEnd,'下架时间',resetOfflineEnd)"
                >
                </el-date-picker> 
            </div>
        </div>
        <div class="marginT20">
            <table  style="width: 100%;border-collapse:collapse;border: 1px solid #d1d3e0;border-bottom: none;"> 
                    <tr class="grid-header">
                        <td class="grid-header-cell" style="width: 16%;">
                            任务时间
                        </td>
                        <td class="grid-header-cell textCenter" style="width:12%;">
                            商品数
                        </td>
                        <td class="grid-header-cell textCenter" style="width:13%;">
                            状态
                        </td>
                        <td class="grid-header-cell textCenter" style="width: 13%;;">
                            操作结果
                        </td> 
                        <td class="grid-header-cell textCenter" style="width: 16%;;">
                            创建时间
                        </td>
                        <td class="grid-header-cell textCenter" style="width: 16%;;">
                            完成时间
                        </td>
                        <td class="grid-header-cell textCenter" style="width: 14%;;">
                            操作
                        </td>            
                    </tr>
                    <tr class="grid-row"  v-if="isLoading">
                        <td class="grid-row-cell head" style="text-align:center;width:500px" colspan="7">
                            <UiLoading :show="isLoading" :size="20" text="正在加载..."></UiLoading>
                        </td>
                    </tr>
                    <tr v-else class="grid-row" :class="{'selected':checkStatus[n]}" v-for="(ware,n) in wares" :key="ware.taskId">
                        <td class="grid-row-cell head ">{{ware.taskTime}}</td>
                        <td class="grid-row-cell textCenter">{{ware.goodsNumber}}</td>
                        <td class="grid-row-cell textCenter" >
                            <div style="flex:1;margin-left:5px; textCenter">
                                <div v-if="ware.wareStatus=='8'" >
                                    完成
                                </div>
                                <div v-else-if="ware.wareStatus=='-8'" style="color:#FF6192;">
                                    停止
                                </div>
                                <div v-else style="color:#6ED289;">
                                    进行中...
                                </div>
                            </div>
                        </td>
                        <td class="grid-row-cell textCenter" style="padding-left:16px;">
                            <span v-show="ware.completeNumber!=''||ware.completeNumber!=0" style="color:#2793EE;">完成：8 </span>
                            <span v-show="ware.failureBumbeer!=''||ware.failureBumbeer!=0" style="color:#FF6192;margin-left:10px;">失败：{{ware.failureBumbeer}}</span>
                        </td>
                        <td class="grid-row-cell textCenter">
                            <div >
                                {{ware.creationTime}}
                            </div>
                        </td>
                        <td class="grid-row-cell textCenter">
                            <div >
                                {{ware.completionTime}}
                            </div>
                        </td>
                        <td class="grid-row-cell textCenter">
                            <div v-if="ware.wareStatus==8||ware.wareStatus==-8">
                                <button  class="button-primary" @click="action('watch',ware)">&nbsp;查看</button>
                                <button class="button-primary" style="background-color:#BBBBBB;margin-left: 12px;" >&nbsp;删除</button>
                            </div>
                            <div v-else>
                                <button  class="button-primary" style=";background-color:#BBBBBB;" >&nbsp;查看</button>
                                <button class="button-primary" style="background-color:#FF6192;margin-left: 12px;"  @click="action('stop',ware)">&nbsp;停止</button>
                            </div>
                        </td>
                    </tr>
            </table>
    </div>
</div>

</template>

<script>
import utils from "@/common/Utils";
// import vue from 'vue';
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
    }
  },

  data() {
    return {
      selectAll: false,
      checkStatus: [],
      utils: utils,
      currentWareId: "",
      showEditor: false,
        week: '',
        time:'',
        offlineStart:'',
        offlineEnd:'',
        pickerOptions: {
            disabledDate(time) {
                return time.getTime() > Date.now();
            }
        },
        weeks: 
        [
          {
          value: '1',
          label: '周一'
          }, {
            value: '2',
            label: '周二'
          }, {
            value: '3',
            label: '周三'
          }, {
            value: '4',
            label: '周四'
          }, {
            value: '5',
            label: '周五'
          }, {
            value: '6',
            label: '周六'
          }, {
            value: '7',
            label: '周日'
          }],
          times:[
            {
            value: '0',
            label: '00:00'
          }, {
            value: '1',
            label: '01:00'
          }, {
            value: '2',
            label: '02:00'
          }, {
            value: '3',
            label: '03:00'
          }, {
            value: '4',
            label: '04:00'
          }, {
            value: '5',
            label: '05:00'
          }, {
            value: '6',
            label: '06:00'
          }, {
            value: '7',
            label: '07:00'
          }, {
            value: '8',
            label: '08:00'
          }, {
            value: '9',
            label: '09:00'
          }, {
            value: '10',
            label: '10:00'
          }, {
            value: '11',
            label: '11:00'
          }, {
            value: '12',
            label: '12:00'
          }, {
            value: '13',
            label: '13:00'
          }, {
            value: '14',
            label: '14:00'
          }, {
            value: '15',
            label: '15:00'
          }, {
            value: '16',
            label: '16:00'
          }, {
            value: '17',
            label: '17:00'
          }, {
            value: '18',
            label: '18:00'
          }, {
            value: '19',
            label: '19:00'
          }, {
            value: '20',
            label: '20:00'
          }, {
            value: '21',
            label: '21:00'
          }, {
            value: '22',
            label: '22:00'
          }, {
            value: '23',
            label: '23:00'
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
    action(t, w) {
      this.$emit("action", { t: t, id: w.taskId });
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
.grid-header {
  border: 1px solid #d1d3e0;
  border-bottom: none;
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
.button-primary:hover {
  background-color: #0882ed;
}
</style>
