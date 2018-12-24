<template>
  <div style="margin:30px;background:#fff;">
    <div class="marginT20">
          <div class="verticalLine-title" >
              <span style="height:20px;line-height:20px;font-size:16px;">开启智能上下架</span>
              <el-switch
              style="left: 20px;top: -3px;"
                v-model="intelligenceShelf"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
          </div>
    </div>
    <div class="marginT20">
      <div class="verticalLine-title" >
        <span style="height:20px;line-height:20px;font-size:16px;">设置商品总数</span>
      </div>
      <div style="padding-left:10px;margin-top:10px;color:#777777;">
        <div style="">在售商品阈值<el-input type="number" size="mini" v-model="thresholdValue" style="width:100px;margin-left:10px;" placeholder=""></el-input>个</div>
        <div style="margin-top:10px;">您的主营类目是【<span style="color:#E78C53;">{{cateName}}</span>】,在售商品该类目的阈值是：<span  style="color:#FF7070;">{{onShelvesMaxNumber}}</span>个,已上架商品数：<span style="color:#FF7070;">{{onSaleNumber}}</span></div>
      </div>
    </div>
    <div class="marginT20">
      <div class="verticalLine-title" >
        <span style="height:20px;line-height:20px;font-size:16px;">待上架商品个数：</span>
      </div>
      <div style="padding-left:10px;margin-top:10px;color:#777777;">
        <div >  
          <div style="width:270px;overflow: hidden;" >
            <el-checkbox v-model="neverOnShelves">从未上架的商品</el-checkbox>
          （当前<span>{{neverOnShelvesNumber}}</span>个）
          <el-tooltip class="item" effect="dark" content="待上架规则：最近15天内创建，且库存大于0的商品" placement="right">
            <span class="interrogation">?</span>
          </el-tooltip>
          </div>
        </div>
          
        <div style="margin-top:10px;color:#777777;">
            <div  style="width:270px;overflow: hidden;">
              <el-checkbox v-model="alreadyDown">自主下架的商品</el-checkbox>
            （当前<span>{{alreadyDownNumber}}</span>个）
            <el-tooltip class="item" effect="dark" content="待上架规则：最近15天内下架，且库存大于0的商品" placement="right">
              <span class="interrogation">?</span>
            </el-tooltip>
            </div>
          </div>
      </div>
    </div>
    <div class="marginT20">
      <div class="verticalLine-title" >
        <span style="display:inline-block;width:150px;height:20px;line-height:20px;font-size:16px;">每周上下架计划：
            <el-tooltip class="item" effect="dark" placement="bottom">
              <div slot="content">
                <p>每个时间点只会上下架一次，完成后不会重新触</p>
                <p>发，在此时间点修改了商品数量需等待下一个周</p>
                <p>期才会执行。</p>
              </div>
              <span class="interrogation">?</span>
            </el-tooltip>
        </span>
      </div>
      <div style="margin-top:10px;padding-right: 30px;position:relative;min-width:1300px;">
        <div class="table-d"> 
          <table> 
            <thead>
              <tr >
								<th style="font-weight:bold;width:80px;" >时间</th>
								<th style="font-weight:bold;" colspan="8">00:00~07:00</th>
								<th style="font-weight:bold;" colspan="10">08:00~17:00</th>
								<th style="font-weight:bold;" colspan="6" >18:00~24:00</th>
							</tr>
            </thead>
            <tbody v-clickoutside="handleClose"> 
              <tr class="first-tr"> 
                <td  style="font-weight:bold;line-height: 1.42857143;" v-for="index in tableColumn" :key="index">
                  {{index}}
                </td> 
              </tr> 
              <tr ref="tableTr" class="table-d-tr" v-for="(item,k) in tableData" :key="k" > 
                <td  style="color:#9F6CAF;font-weight:bold;padding:8px;line-height: 1.42857143;">
                  {{item['dataWeek']}}
                </td> 

                <td @click="openInput(k,j,item,$event)" v-for="j in 24" :key="j" :class="{'skyblue':item['date'+(j-1)].skyblue}">
                      <el-tooltip  :data-position="k+','+j"  content="点击设置此时段的商品上架数" :enterable="false" placement="top">
                        <span style="display:inline-block;width:100%;height:46px;line-height:46px;">
                          {{item['date'+(j-1)].value}}
                        </span>
                      </el-tooltip>
                </td>
              </tr> 
            </tbody>
          </table> 
        </div> 
        <div ref="childPopover" id="childPopover" class="child-popover arrow" v-show="childPopoverShow">
          <div>
            <input ref="popoverInput" type="number" placeholder="数字0~100" style="width: 98px;" class="input-default" v-model="popoverValue" />
          </div>
          <div style="overflow: hidden;text-align: center;">
            <button class="button-default" @click="applyCancel" style="margin-top: 10px;">取消</button>
            <button class="button-default" @click="applyOk" style="margin-top: 10px;background:#66b1ff;color:#fff;">确定</button>
          </div>
        </div>
      </div>
    </div>
    <div class="marginT20" style="padding-bottom:20px;">
      <div class="verticalLine-title" >
        <span style="height:20px;line-height:20px;font-size:16px;">在售商品到达阈值处理：</span>
      </div>
      <div style="padding-left:10px;margin-top:10px;color:#777777;">
        <div > 
            <el-radio v-model="autoOnShelves" label="1">停止自动上架</el-radio>
        </div>
        <div style="margin-top:10px;">
          <el-radio v-model="autoOnShelves" label="2">自动下架滞销商品，为上架腾出额度</el-radio>
          <div>
          <div class="sanjiao_down"  v-show="autoOnShelves=='2'" style="padding:20px 20px 20px 20px;margin-top:20px;">
						  <div class=" ">
							  <span class="">当商品到达最大限制数时，自动清理</span>
                <el-select v-model="value1" placeholder="请选择" size="mini" style="width:120px;">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
						    <span class=" ">天内，同时</span>
                <el-select v-model="value2" placeholder="请选择" size="mini" style="width:120px;">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="value3" placeholder="请选择" size="mini" style="width:120px;">
                  <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="value4" placeholder="请选择" size="mini" style="width:120px;">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span class="">的商品，为上架商品腾出额度。</span>
              </div>
              <div style="margin-top:10px;">
                上架时间未满
                <el-select v-model="value5" placeholder="请选择" size="mini" style="width:120px;">
                  <el-option
                    v-for="item in options5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>天的商品不下架，
              </div>
	        </div>

          </div>
        </div>
      </div>
    </div>
    <div class="marginT20">
      <div style="text-align: center;">
        <el-button type="primary" @click="savePlan" style="width:142px;height:44px;" round>保存计划</el-button>
      </div>
    </div>



  </div>

</template>

<script>


export default {
  props: {},
  data() {
    return {
      childPopoverShow: false,
      intelligenceShelf: false,
      thresholdValue: 10000,
      onShelvesMaxNumber: 10000,
      cateName: "拼购-母婴",
      onSaleNumber: 669,
      neverOnShelves: false,
      neverOnShelvesNumber: 9912,
      alreadyDown: true,
      alreadyDownNumber: 72,
      autoOnShelves: "1",
      value1: "15",
      value2: "noSales",
      value3: "noFlow",
      value4: "noAddPurchase",
      value5: "15",
      popoverValue: "",
      handleDate: [],
      handleTempDate: [],
      handleColumn: "",
      options1: [
        {
          value: "15",
          label: "15"
        },
        {
          value: "30",
          label: "30"
        },
        {
          value: "60",
          label: "60"
        },
        {
          value: "90",
          label: "90"
        }
      ],
      options2: [
        {
          value: "noSales",
          label: "无销量"
        },
        {
          value: "arbitrarySales",
          label: "任意销量"
        }
      ],
      options3: [
        {
          value: "noFlow",
          label: "无流量"
        },
        {
          value: "arbitraryFlow",
          label: "任意流量"
        }
      ],
      options4: [
        {
          value: "noAddPurchase",
          label: "无加购"
        },
        {
          value: "arbitraryAddPurchase",
          label: "任意流量"
        }
      ],
      options5: [
        {
          value: "15",
          label: "15"
        },
        {
          value: "30",
          label: "30"
        },
        {
          value: "60",
          label: "60"
        },
        {
          value: "90",
          label: "90"
        }
      ],
      tableData: this.getTableData()
    };
  },
  computed: {
    tableColumn: function() {
      var n = 24;
      var arr = [];
      for (let index = 0; index < n; index++) {
        arr[index] = (index + "").length > 1 ? "" + index : "0" + index;
      }
      arr.unshift("星期");
      return arr;
    }
  },
  components: {},
  watch: {},
  mounted() {
    // this.tableData = this.getTableData();
    console.log(this.tableData)
  },
  methods: {

    openInput(k, j, item, event) {
      let ele = event.currentTarget;
      let w = ele.offsetWidth ;
      let h = ele.offsetHeight;
      let a = JSON.stringify(this.tableData);
      let obj = JSON.parse(a);
      let left = event.currentTarget.offsetLeft;
      if (this.handleDate.length != 0) {
        let oldDateName = this.handleDate[0];
        let oldK = this.handleDate[1];
        this.handleTempDate = ["date" + (j - 1), k];
        this.handleDate.length = 0;
        obj[oldK][oldDateName]["skyblue"] = false;
      } else {
        if (this.handleTempDate.length != 0) {
          // console.log(obj)
          obj[this.handleTempDate[1]][this.handleTempDate[0]]["skyblue"] = false;
        }
        this.handleDate = ["date" + (j - 1), k];
      }

      if (this.handleColumn != k) {
        obj = this.clearSkyblue(obj, this.handleColumn);
        this.$set(this.tableData, this.handleColumn, obj[this.handleColumn]);
      }
      this.popoverValue = "";
      this.handleColumn = k;
      obj[k]["date" + (j - 1)]["skyblue"] = true;
      // console.log(left,w)
      this.$refs["childPopover"].style.left = left-(120-w)/2+ "px";
      this.$refs['childPopover'].style.top = h*(k+0.2+3)+'px';
      this.$refs["childPopover"].setAttribute("data-x", k);
      this.$refs["childPopover"].setAttribute("data-y", j);
      this.childPopoverShow = true;
      this.$set(this.tableData, k, obj[k]);
      setTimeout(() => {
        this.$refs["popoverInput"].focus();
      }, 100);
      
    },
    savePlan(){
      // this.intelligenceShelf
      console.log('开启智能上下架：',this.intelligenceShelf);
      console.log('在售商品阈值：',this.thresholdValue);
      console.log('从未上架的商品：',this.neverOnShelves);
      console.log('自主下架的商品：',this.alreadyDown);
      console.log('每周上下架计划：',this.tableData);
      console.log('停止自动上架：',this.autoOnShelves);
      console.log('自动清理：',this.value1);
      console.log('同时：',this.value2);
      console.log('同时：',this.value3);
      console.log('同时：',this.value4);
      console.log('上架时间未满：',this.value5);

    },
    applyCancel(){
        this.$refs["popoverInput"].blur();
        this.childPopoverShow = false;
        this.cancelSkyblue();
    },
    applyOk() {
      let k = this.$refs["childPopover"].getAttribute("data-x");
      let j = this.$refs["childPopover"].getAttribute("data-y");
      let obj = JSON.parse(JSON.stringify(this.tableData));

      if(this.popoverValue<0||this.popoverValue>100||this.popoverValue==""||!this.popoverValue){
        this.applyCancel();
        this.$alert('商品上架数量在0~100之间', '友情提示', {
          confirmButtonText: '确定',
          type: 'warning'
        });
        return false;
      }
      obj[k]["date" + (j - 1)]["value"] = this.popoverValue;
      obj[k].dataWeek = this.getWeek(Number(k) + 1);
      this.$set(this.tableData, k, obj[k]);
      this.applyCancel();
      // this.cancelSkyblue();
    },
    handleClose(e) {
      var isChildPopover = this.$refs["childPopover"].contains(e.target);
      if (isChildPopover) {
        return false;
      }
      this.applyCancel();
    },
    getTableData() {
      let n = 7;
      let arrs = [];
      for (let index = 0; index < n; index++) {
        let arr = {
          dataWeek: this.getWeek(index + 1),
          date0: {
            value: "",
            skyblue: false
          },
          date1: {
            value: "",
            skyblue: false
          },
          date2: {
            value: "",
            skyblue: false
          },
          date3: {
            value: "",
            skyblue: false
          },
          date4: {
            value: "",
            skyblue: false
          },
          date5: {
            value: "",
            skyblue: false
          },
          date6: {
            value: "",
            skyblue: false
          },
          date7: {
            value: "",
            skyblue: false
          },
          date8: {
            value: "",
            skyblue: false
          },
          date9: {
            value: "",
            skyblue: false
          },
          date10: {
            value: "",
            skyblue: false
          },
          date11: {
            value: "",
            skyblue: false
          },
          date12: {
            value: "",
            skyblue: false
          },
          date13: {
            value: "",
            skyblue: false
          },
          date14: {
            value: "",
            skyblue: false
          },
          date15: {
            value: "",
            skyblue: false
          },
          date16: {
            value: "",
            skyblue: false
          },
          date17: {
            value: "",
            skyblue: false
          },
          date18: {
            value: "",
            skyblue: false
          },
          date19: {
            value: "",
            skyblue: false
          },
          date20: {
            value: "",
            skyblue: false
          },
          date21: {
            value: "",
            skyblue: false
          },
          date22: {
            value: "",
            skyblue: false
          },
          date23: {
            value: "",
            skyblue: false
          }
        };
        arrs[index] = arr;
      }
      return arrs;
    },
    cancelSkyblue(){
      for (let j = 0; j < this.tableData.length; j++) {
        let element = this.tableData[j];
        for (let i = 0; i < 24; i++) {
          element["date" + i]["skyblue"] = false;
        }
      }
    },
    clearSkyblue(data, k) {
      // for(let i = 0;i<data.length;i++){
      if(!k||k=="") return data;
      let element = data[k];
      for (let j = 0; j < 24; j++) {
        element["date" + j]["skyblue"] = false;
      }
      data[k] = element;
      return data;
      // }
    },
    getWeek(d) {
      switch (d) {
        case 7:
          return "星期日";
          break;
        case 1:
          return "星期一";
          break;
        case 2:
          return "星期二";
          break;
        case 3:
          return "星期三";
          break;
        case 4:
          return "星期四";
          break;
        case 5:
          return "星期五";
          break;
        case 6:
          return "星期六";
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
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
.interrogation {
  float: right;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  text-align: center;
  border-radius: 50%;
  background-color: #545454;
  color: #fff;
  cursor: pointer;
}
.table-d table {
    border: 1px solid #ddd;
    width: 100%;
    max-width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    font-size: 12px !important;
}
.table-d table thead>tr>th{
  border: 1px solid #ddd;
  text-align: center;
  vertical-align: middle;
}
.table-d table td {
  text-align: center;
  vertical-align: middle;
  border: 1px solid #ddd;
}
.table-d table tr {
  height: 46px;
}

.table-d .table-d-tr td {
  // width: 36px;
  position: relative;
}
.table-d table tbody .first-tr {
  color: #fa6b4b;
  font-weight: bold;
  cursor: default;
}
.table-d .table-d-tr td:hover {
  background: #aad7ff;
  cursor: pointer;
}
.table-d table tbody tr td:first-child {
  color: #9f6caf !important;
}
.table-d table tbody tr td:first-child:hover {
  background: #fff;
  cursor: default;
}
.sanjiao_down {
  position: relative;
  left: -16px;
  border: 1px solid #ebebeb;
  box-shadow: 0px 1px 3px #ebebeb;
  border-radius: 6px;
}
.sanjiao_down::before {
  content: "";
  display: inline-block;
  position: absolute;
  top: -7px;
  left: 14px;
  width: 0;
  height: 0;
  overflow: hidden;
  font-size: 0; /*是因为, 虽然宽高度为0, 但在IE6下会具有默认的 */
  line-height: 0; /* 字体大小和行高, 导致盒子呈现被撑开的长矩形 */
  border-width: 11px 7px 7px 11px;
  border-style: solid;
  border-color: transparent transparent #fff #fff;
  transform: rotate(-45deg);
  box-shadow: 2px -2px 2px #ebebeb;
  z-index: 9;
  background: #fff;
}
.arrow:after {
  content: "";
  display: inline-block;
  position: absolute;
  top: -8px;
  left: 48px;
  width: 0;
  height: 0;
  overflow: hidden;
  font-size: 0; /*是因为, 虽然宽高度为0, 但在IE6下会具有默认的 */
  line-height: 0; /* 字体大小和行高, 导致盒子呈现被撑开的长矩形 */
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent #fff #fff;
  transform: rotate(-45deg);
  box-shadow: 1px -1px 2px rgba(0, 0, 0, 0.25);
  z-index: 9;
  background: #fff;
}

.child-popover {
  width: 120px;
  padding: 15px 10px;
  position: absolute;
  top: 60px;
  left: 0;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  z-index: 9;
}
.button-default {
  padding: 2px 4px;
  font-size: 14px;
  border-radius: 3px;
  text-align: center;
  color: #333;
  background-color: #fff;
  border: 1px solid transparent;
  border-color: #ccc;
  cursor: pointer;
}
.skyblue {
  background: #aad7ff;
}
</style>