
<template>
  <div class="frame-wrapper">
    <div class="main-container">

      <div class="filter-options-wrap">
        <div class="vertical-line-title">设置筛选项</div>
        <el-row :gutter="10" style="padding:20px;">
          <el-col :span="6" style="text-align: center;">
            <div class="filter-option">
              店内分类&nbsp;
              <el-select split-button clearable v-model="filterItemValue" placeholder="店内分类" size="mini" style="width: 220px" @change="changeFilter">
                  <el-option v-for="item in filterItems" :label="item.label" :value="item.value" :key="item.value">
                  </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6" style="text-align: center;">
            <div class="filter-option">
                访客数&nbsp;&nbsp;
                <input class="input-default" style="width:48px;box-sizing:content-box;" v-model="visitorsMin" />
                &nbsp;-&nbsp;
                <input class="input-default" style="width:48px;box-sizing:content-box;" v-model="visitorsMax" />
            </div>
          </el-col>
          <el-col :span="6" style="text-align: center;">
            <div class="filter-option" >
                好评率&nbsp;&nbsp;
                <input class="input-default" style="width:48px;box-sizing:content-box;" v-model="favorRateMin" />
                &nbsp;%-&nbsp;
                <input class="input-default " style="width:48px;box-sizing:content-box;" v-model="favorRateMax" />%
            </div>
          </el-col>
          <el-col :span="6" style="text-align: center;">
            <div class="filter-option">
                <input class="input-default"  placeholder="链接/SPU" style="width:286px;box-sizing:content-box;" v-model="favorRateMin" />
            </div>
          </el-col>
        </el-row>
        <!-- <div class="filter-options-line">

          <div class="filter-option">
            店内分类&nbsp;
            <el-select split-button clearable v-model="filterItemValue" placeholder="店内分类" size="mini" style="width: 220px" @change="changeFilter">
                <el-option v-for="item in filterItems" :label="item.label" :value="item.value" :key="item.value">
                </el-option>
            </el-select>
          </div>

          <div class="filter-option">
              访客数&nbsp;&nbsp;
              <input class="input-default" style="width:48px;box-sizing:content-box;" v-model="visitorsMin" />
              &nbsp;-&nbsp;
              <input class="input-default" style="width:48px;box-sizing:content-box;" v-model="visitorsMax" />
          </div>

          <div class="filter-option" >
              好评率&nbsp;&nbsp;
              <input class="input-default" style="width:48px;box-sizing:content-box;" v-model="favorRateMin" />
              &nbsp;%-&nbsp;
              <input class="input-default " style="width:48px;box-sizing:content-box;" v-model="favorRateMax" />%
          </div>

          <div class="filter-option">
              <input class="input-default"  placeholder="链接/SPU" style="width:286px;box-sizing:content-box;" v-model="favorRateMin" />
          </div>

        </div> -->
        <div class="filter-options-buttons">
          <button class="medium-button"><i class="el-icon-search"></i> 筛选</button>
          <button class="medium-button lite" ><i class="el-icon-close" style="font-size:9px"></i> &nbsp;重置</button>
        </div>
      </div>
        
      <div class="filter-options-table">
        <div class="vertical-line-title">评价分析</div>
        <div style="margin-top:10px;">
            <table style="width: 100%;border-collapse:collapse;border: 1px solid #d1d3e0;">
                <tr class="grid-header">
                    <td class="grid-header-cell" style="width:calc(100% - 1200px)">
                        商品信息
                    </td>
                    <td class="grid-header-cell" style="width: 120px;">
                        评价数
                    </td>
                    <td class="grid-header-cell" style="width: 120px;">
                        好评数
                    </td>
                    <td class="grid-header-cell tail" style="width: 120px;">
                        中评数
                    </td>
                    <td class="grid-header-cell tail" style="width: 120px;">
                        差评数
                    </td>
                    <td class="grid-header-cell tail" style="width: 120px;">
                        追评数
                    </td>
                    <td class="grid-header-cell tail" style="width: 120px;">
                        晒单数
                    </td>
                    <td class="grid-header-cell tail" style="width: 120px;">
                        好评率
                    </td>
                    <td class="grid-header-cell tail" style="width: 200px;">
                        更新时间
                    </td>
                    <td class="grid-header-cell tail" style="width:160px;">
                        操作
                    </td>
                </tr>
                <!-- <tr class="grid-row" v-if="isLoading">
                    <td class="grid-row-cell head tail" style="text-align:center;width:500px" colspan="7">
                        <UiLoading :show="isLoading" :size="20" text="正在加载..."></UiLoading>
                    </td>
                </tr> -->
                <tr class="grid-row" style="height:100px;"  v-for="(ware,n) in wares" :key="ware.ware_id">
                    <td class="grid-row-cell">
                      <div style="display:flex;align-items: center;justify-content: flex-start">
                        <div class="item-pic-wrap" style="cursor:pointer">
                            <img :src="utils.getJDMainImgSrc(ware.logo)" class="main-pic-wrapper" style="width:80px;height:80px;" />
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
                      7
                    </td>
                    <td class="grid-row-cell" style="">
                      8
                    </td>
                    <td class="grid-row-cell" style="">
                      9
                    </td>
                    <td class="grid-row-cell" style="">
                      
                      <template >
                        <!-- :ref="'popover'+n" -->
                        <el-popover
                          placement="right"
                          width="588"
                          @show="drawLine(n)"
                          @hide="watchHistoricalData(n)"
                          trigger="click">
                          <div style="width:100%;">
                            <div style="height:50px;line-height:50px;text-align:center;font-weight:bold;">评论历史数据</div>
                            <div style="overflow:hidden;padding:20px 10px;">
                              <div style="float:left;width:80px;height:210px;">
                                <ul>
                                  <li>评价数</li>
                                  <li>好评数</li>
                                  <li>中评数</li>
                                  <li>差评数</li>
                                  <li>追评数</li>
                                  <li>晒单数</li>
                                </ul>
                              </div>
                              <div style="float:left">
                                <div :id="'myChart'+n" style="width:450px;height:200px;"></div>
                              </div>
                            </div>
                          </div>
                          <button  slot="reference"  class="button-border-none" ><i class="el-icon-view"></i>历史数据</button>
                        </el-popover>
                      </template>
                      
                    </td>
                </tr>
            </table>

            <div style="padding:20px;text-align: center;">
              <el-pagination 
                background
                layout="prev, pager, next" 
                :small="false"
                :page-size="10"
                :total="30"
                :current-page="1"
                >
              </el-pagination>
            </div>

        </div>
      </div>

    </div>
    
  </div>
</template>

<script>
// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

import data from "./test.json";
import utils from '../../common/Utils';

export default {
  data() {
    
    return {
        wares:data.taobao.splice(0,10),
        filterItems: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }
        ],
        filterItemValue: '',
        visitorsMin:'',
        visitorsMax:'',
        favorRateMin:'',
        favorRateMax:'',
        utils:utils,
        // myChart:echarts.init(document.getElementById('myChart'))
    }
  },
  computed: {
    // myChart(){ return echarts.init(document.getElementById('myChart'))}
  },
  components: {

  },
  methods: {
    changeFilter() {

    },
    watchHistoricalData(n){
      // console.log('123222222222222');
      echarts.dispose(document.getElementById('myChart'+n));
    },
    drawLine(n) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'+n))
      // 绘制图表
      console.log('12')
      let option = null;
      if (n==2) {
        option = {
          tooltip: {
              trigger: 'axis',
              confine :true,//将 tooltip 框限制在图表的区域内。
                  formatter : function(params){
                    // console.log('params---',params)
                          var res  =  '';
                          res += '<div>'+params[0].data+'</div>';
                          res += '<div>'+params[1].data+'</div>';
                          res += '<div>'+params[2].data+'</div>';
                          res += '<div>'+params[3].data+'</div>';
                         return res;
                  }
          },
          grid: {
              top:'3%',
              left: '1%',
              right: '4%',
              bottom: '1%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['03-01','03-02','03-03','03-04','03-05','03-06','03-07']
          },
          yAxis: {
              type: 'value'
          },
          series: [
              {
                  name:'邮件营销',
                  type:'line',
                  smooth: true,
                  stack: '总量',
                  data:[120, 132, 101, 134, 90, 230, 210]
              },
              {
                  name:'联盟广告',
                  type:'line',
                  smooth: true,
                  stack: '总量',
                  data:[220, 182, 191, 234, 290, 330, 310]
              },
              {
                  name:'视频广告',
                  type:'line',
                  stack: '总量',
                  smooth: true,
                  data:[150, 232, 201, 154, 190, 330, 410]
              },
              {
                  name:'直接访问',
                  type:'line',
                  smooth: true,
                  stack: '总量',
                  data:[320, 332, 301, 334, 390, 330, 320]
              }
          ]
        };
      }else{
        option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
            }]
        };

      }
      myChart.setOption(option);
    }
  }
}
</script>

<style lang="less" scoped>
.button-border-none{
    width:90px;
    border:none;
    text-align: center;
    border-radius: 4px;
    background-color: transparent;
    width: 120px;
    height: 24px;
    line-height: 22px;
    color: #2992EE;
    cursor: pointer;
    outline: none;
    font-size: 12px;
}
.main-container{
  
  color: #131114;
  .vertical-line-title{
    height: 42px;
    line-height: 24px;
    padding: 9px;
    padding-left: 30px;
    box-sizing: border-box;
    font-weight: bold;
    background: #EBEBEB;
    position: relative;
    &::before{
      content: '';
      position: absolute;
      left: 20px;
      width: 4px;
      height: 24px;
      background-color:#009CF1; 
    }
  }

  .filter-options-wrap{
      background-color:#fff;
      padding: 5px;
      
      .filter-options-line{
        display: flex;
        padding: 20px;
        .filter-option{
          margin-right: 20px;
        }
      }
      .filter-options-buttons{
        text-align: center;
        padding-bottom:10px;
        .medium-button{
          width: 160px;
          height: 34px;
          background-color: #2992ee;
          border-radius: 4px;
          margin-right: 10px;
          border: none;
          outline: none;
          color: #fff;
          font-size: 12px;
          font-family: "Microsoft YaHei",Arial,"sans-serif";
          cursor: pointer;
          &:hover{
            text-shadow: 0 0 4px hsla(0,0%,100%,.75);
            box-shadow: 0 0 4px 0 #2992ee;
          }
        }

      }
  } 
  .filter-options-table{
    padding: 5px;
    margin-top: 8px;
    background-color:#fff;
  }
  
}

</style>