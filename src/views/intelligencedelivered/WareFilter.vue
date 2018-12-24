<template>
  <div style="text-align:left">
        <el-tabs v-model="filterType" @tab-click="filterTypeChange">
            <el-tab-pane label="按商品信息过滤" name="scope" v-if="!isTrafficWareFilterOnly">
                <div class="filter-options-line">
                    <div class="filter-option">
                        商品编码&nbsp;&nbsp;
                        <input class="input-default" style="width:120px;box-sizing:content-box;" placeholder="请输入商品编码" v-model="wareId" @change="changeFilter" />
                    </div>

                     <div class="filter-option">
                        货号&nbsp;&nbsp;
                        <input class="input-default" style="width:120px;box-sizing:content-box;" placeholder="支持模糊查询货号" v-model="itemNum" @change="changeFilter"/>
                    </div>
                    <div class="filter-option">
                        京东分类&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-select split-button filterable clearable v-model="jdCid" placeholder="京东分类" size="mini" style="width: 120px" 
                        @change="changeFilter">
                        <el-option-group v-for="group in jdCategories" :label="group.cname1" :key="group.cid1">
                            <el-option v-for="item in group.sub" 
                            :label="item.cname2+' - '+item.cname3" 
                            :value="item.cid3"
                            :key="item.cid3"
                            >
                            </el-option>
                        </el-option-group>
                    </el-select>
                    </div>
                    <div class="filter-option">
                        店铺分类&nbsp;
                        <el-select split-button clearable v-model="shopCid" placeholder="店内分类" size="mini" style="width: 120px" @change="changeFilter">
                            <el-option v-for="item in shopCategroyItems" :label="item.name" :value="item.id" :key="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="filter-option">
                        商品状态&nbsp;
                        <el-select clearable v-model="wareStatus" placeholder="不限" size="mini" style="width: 110px"  @change="changeFilter">
                            <el-option v-for="item in allWareStatus" :label="item.name" :value="item.id" :key="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="filter-option" v-if="!hiddeSearchBtn">
                        <button class="small-button" @click="changeFilter">
                            <i class="el-icon-search"></i> 搜索</button>
                    </div>
    
                </div>
                <div class="filter-options-line">
                    <div class="filter-option">
                        标题关键字&nbsp;
                        <input class="input-default" style="width:305px;box-sizing:content-box;" v-model="title" placeholder="请输入标题关键字" />
                    </div>
                    <div class="filter-option">
                        价格范围&nbsp;&nbsp;
                        <input class="input-default" style="width:48px;box-sizing:content-box;" v-model="jdPriceMin"></input>
                        &nbsp;-&nbsp;
                        <input class="input-default" style="width:48px;box-sizing:content-box;" v-model="jdPriceMax"></input>
                    </div>
                    <div class="filter-option">
                        库存范围&nbsp;&nbsp;
                        <input class="input-default" style="width:76px;box-sizing:content-box;" v-model="stockNumMin"></input>
                        &nbsp;-&nbsp;
                        <input class="input-default" style="width:76px;box-sizing:content-box;" v-model="stockNumMax"></input>
                    </div>&nbsp;

                    <div class="filter-option">
                        <button class="small-button lite" @click="resetFilter">
                            <i class="el-icon-close" style="font-size:9px"></i> &nbsp;清除</button>
                    </div>    
                </div>

               <div class="filter-options-line">
                    
                      <div class="filter-option">
                        上架时间&nbsp;&nbsp;
                        <el-date-picker
                            v-model="onlineStart"
                            type="datetime" 
                            placeholder="选择开始时间"
                            size="mini" 
                            format="yyyy-MM-dd HH:mm:ss" 
                            :picker-options="pickerOptions"
                            @change="checkStartEndTime(onlineStart,onlineEnd,'上架时间',resetOnlineEnd)"
                        >
                        </el-date-picker>&nbsp;-&nbsp;
                        <el-date-picker 
                          v-model="onlineEnd" 
                          type="datetime" 
                          placeholder="选择结束时间" 
                          size="mini" 
                          format="yyyy-MM-dd HH:mm:ss"
                          :picker-options="pickerOptions"
                          @change="checkStartEndTime(onlineStart,onlineEnd,'上架时间',resetOnlineEnd)"
                        >
                        </el-date-picker>
                      </div>
                      <div class="filter-option">
                                                
                        下架时间&nbsp;
                        <el-date-picker
                            v-model="offlineStart"
                            type="datetime" 
                            placeholder="选择开始时间"
                            size="mini" 
                            format="yyyy-MM-dd HH:mm:ss" 
                            :picker-options="pickerOptions"
                            @change="checkStartEndTime(offlineStart,offlineEnd,'下架时间',resetOfflineEnd)"
                        >
                        </el-date-picker>&nbsp;-&nbsp;
                        <el-date-picker 
                          v-model="offlineEnd" 
                          type="datetime" 
                          placeholder="选择结束时间" 
                          size="mini" 
                          format="yyyy-MM-dd HH:mm:ss"
                          :picker-options="pickerOptions"
                          @change="checkStartEndTime(offlineStart,offlineEnd,'下架时间',resetOfflineEnd)"
                        >
                        </el-date-picker> 
                    </div>
              </div>
              <div class="filter-options-line" v-if="lockViewShow">
                <div class="filter-option">
                  <span>锁定状态：</span>
                      <el-radio-group v-model="lockMethod" size="small">
                        <el-radio-button  label="" style="margin-right:20px;">全部</el-radio-button>
                        <el-radio-button  label="1" style="margin-right:20px;border-left:1px solid #dcdfe6;" >锁定</el-radio-button>
                        <el-radio-button  label="-1" style="margin-right:20px;border-left:2px solid #dcdfe6;">未锁定</el-radio-button>
                      </el-radio-group>
                </div>
              </div>


            </el-tab-pane>
            <el-tab-pane v-if="false" :label="isTrafficWareFilterOnly?'商品流量销量筛查':'按流量或销量'" name="traffic">
                <span style="color:#FF6800">&nbsp;&nbsp;{{trafficStatus}}</span>
                <div class="filter-options-line">
                    
                    <div class="filter-option">
                        开始时间&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-date-picker
                                v-model="trafficQueryStartDay"
                                type="date"
                                placeholder="选择日期"
                                size="mini"
                                format="yyyy-MM-dd"
                                :picker-options="pickerOptions"
                                :default-value="defaultTrafficQueryStartDay"
                            >
                            </el-date-picker>                    
                    </div>
                    <div  class="filter-option">
                        结束时间&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-date-picker
                                v-model="trafficQueryEndDay"
                                type="date"
                                placeholder="选择日期"
                                size="mini"
                                format="yyyy-MM-dd"
                                :picker-options="pickerOptions"
                                :default-value="defaultTrafficQueryEndDay"
                            >
                            </el-date-picker>                          
                    </div>  
                    
                </div>
                <div class="filter-options-line">
                    <div class="filter-option">
                        流量指标&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-select v-model="trafficQueryIndex" size="mini" style="width: 156px">
                            <el-option label="PV(详情页访问次数)" value="pv"></el-option>
                            <el-option label="UV(买家访问人数)" value="uv"></el-option>
                        </el-select>&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-select v-model="trafficQueryCompare" size="mini" style="width: 70px">
                            <el-option label="大于" :value="1"></el-option>
                            <el-option label="等于" :value="0"></el-option>
                            <el-option label="小于" :value="-1"></el-option>
                        </el-select>&nbsp;&nbsp;&nbsp;&nbsp;
                        <input v-model="trafficQueryCompareValue" class="input-1" placeholder="非负整数" style="width:80px;">
                    </div>
                    <div class="filter-option">
                        销量指标&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-select v-model="tradeQueryIndex" size="mini" style="width: 156px">
                            <el-option label="销售数量" value="jdpay_auction_num"></el-option>
                            <el-option label="销售金额" value="jdpay_trade_amt"></el-option>
                            <el-option label="订单数量" value="jdpay_trade_num"></el-option>
                        </el-select>&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-select v-model="tradeQueryCompare" size="mini" style="width: 70px">
                            <el-option label="大于" :value="1"></el-option>
                            <el-option label="等于" :value="0"></el-option>
                            <el-option label="小于" :value="-1"></el-option>
                        </el-select>&nbsp;&nbsp;&nbsp;&nbsp;
                        <input v-model="tradeQueryCompareValue" class="input-1" placeholder="非负整数" style="width:80px;">
                    </div>
                </div>

                <div class="filter-options-line">                    
                      <div class="filter-option">
                        上架时间&nbsp;&nbsp;
                        <el-date-picker
                            v-model="onlineStart"
                            type="datetime" 
                            placeholder="选择开始时间"
                            size="mini" 
                            format="yyyy-MM-dd HH:mm:ss" 
                            :picker-options="pickerOptions"
                            @change="checkStartEndTime(onlineStart,onlineEnd,'上架时间',resetOnlineEnd)"
                        >
                        </el-date-picker>&nbsp;-&nbsp;
                        <el-date-picker 
                          v-model="onlineEnd" 
                          type="datetime" 
                          placeholder="选择结束时间" 
                          size="mini" 
                          format="yyyy-MM-dd HH:mm:ss"
                          :picker-options="pickerOptions"
                          @change="checkStartEndTime(onlineStart,onlineEnd,'上架时间',resetOnlineEnd)"
                        >
                        </el-date-picker>
                      </div>
                      <div class="filter-option" style="margin-left:30px;">
                                                
                        下架时间&nbsp;
                        <el-date-picker
                            v-model="offlineStart"
                            type="datetime" 
                            placeholder="选择开始时间"
                            size="mini" 
                            format="yyyy-MM-dd HH:mm:ss" 
                            :picker-options="pickerOptions"
                            @change="checkStartEndTime(offlineStart,offlineEnd,'下架时间',resetOfflineEnd)"
                        >
                        </el-date-picker>&nbsp;-&nbsp;
                        <el-date-picker 
                          v-model="offlineEnd" 
                          type="datetime" 
                          placeholder="选择结束时间" 
                          size="mini" 
                          format="yyyy-MM-dd HH:mm:ss"
                          :picker-options="pickerOptions"
                          @change="checkStartEndTime(offlineStart,offlineEnd,'下架时间',resetOfflineEnd)"
                        >
                        </el-date-picker> 
                    </div>
              </div>

                  <div class="filter-options-line">
                    <div class="filter-option">
                        京东分类&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-select split-button filterable clearable v-model="jdCid" placeholder="京东分类" size="mini" style="width:192px" 
                        >
                        <el-option-group v-for="group in jdCategories" :label="group.cname1" :key="group.cid1">
                            <el-option v-for="item in group.sub" 
                            :label="item.cname2+' - '+item.cname3" 
                            :value="item.cid3"
                            :key="item.cid3"
                            >
                            </el-option>
                        </el-option-group>
                    </el-select>
                    </div>

                     <div class="filter-option">
                        店铺分类&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-select split-button clearable v-model="shopCid" placeholder="店内分类" size="mini" style="width: 192px">
                            <el-option v-for="item in shopCategroyItems" :label="item.name" :value="item.id" :key="item.id">
                            </el-option>
                        </el-select>
                    </div>

                    <div class="filter-option">
                        商品状态&nbsp;
                        <el-select clearable v-model="wareStatus" placeholder="不限" size="mini" style="width: 255px">
                            <el-option v-for="item in allWareStatus" :label="item.name" :value="item.id" :key="item.id">
                            </el-option>
                        </el-select>
                    </div>

                    
                    
                    <div class="filter-option" v-if="!hiddeSearchBtn">
                        <button class="small-button" @click="queryTraffic">
                            <i class="el-icon-search"></i> 搜索</button>
                    </div>
    
                </div>
                


            </el-tab-pane>            
             <el-tab-pane label="批量输入商品编号" name="wareId"  v-if="!isTrafficWareFilterOnly">
                <div class="ware-filter-tab">
                 <div class="filter-textarea">
                    <textarea v-model="wareIdsText" :disabled="wareIdsNumber>200"
                    placeholder="多个商品编号可用分号 ； 或者换行符分隔" 
                    class="input-default filter-text" 
                    ></textarea>
                 </div>
                  <div class="filter-button-area" v-if="!hiddeSearchBtn">
                    <div><button class="small-button" @click="changeFilter">
                                <i class="el-icon-search"></i> 搜索</button>
                    </div>
                    <div style="margin-top:13px;">
                        <button class="small-button lite" @click="resetFilter">
                        <i class="el-icon-close" style="font-size:9px"></i> &nbsp;清除</button>
                    </div>
                  </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="批量输入货号" name="itemNum"  v-if="!isTrafficWareFilterOnly">
                <div class="ware-filter-tab">
                 <div class="filter-textarea">
                    <textarea v-model="itemNumsText" :disabled="itemNumsNumber>200"
                    placeholder="多个货号可用分号 ； 或者换行符分隔" 
                    class="input-default filter-text" 
                    ></textarea>
                 </div>
                  <div class="filter-button-area" v-if="!hiddeSearchBtn">
                    <div><button class="small-button" @click="changeFilter">
                                <i class="el-icon-search"></i> 搜索</button>
                    </div>
                    <div style="margin-top:13px;">
                        <button class="small-button lite" @click="resetFilter">
                        <i class="el-icon-close" style="font-size:9px"></i> &nbsp;清除</button>
                    </div>
                  </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="按SKU" name="skuId"  v-if="!isTrafficWareFilterOnly">
                <div class="ware-filter-tab">
                 <div class="filter-textarea">
                    <textarea v-model="skuIdsText" :disabled="skuIdsNumber>200"
                    placeholder="多个SKU ID可用分号 ； 或者换行符分隔" 
                    class="input-default filter-text" 
                    ></textarea>
                 </div>
                  <div class="filter-button-area" v-if="!hiddeSearchBtn">
                    <div><button class="small-button" @click="changeFilter">
                                <i class="el-icon-search"></i> 搜索</button>
                    </div>
                    <div style="margin-top:13px;">
                        <button class="small-button lite" @click="resetFilter">
                        <i class="el-icon-close" style="font-size:9px"></i> &nbsp;清除</button>
                    </div>
                  </div>
                </div>
            </el-tab-pane>

            <el-tab-pane label="按商品链接" name="itemLink"  v-if="!isTrafficWareFilterOnly">
                 <div class="ware-filter-tab">
                 <div class="filter-textarea">
                    <textarea v-model="itemLinksText" :disabled="skuIdsFromLinkNumber>200"
                    placeholder="多个商品链接可用分号 ； 或者换行符分隔" 
                    class="input-default filter-text" 
                    ></textarea>
                 </div>
                  <div class="filter-button-area" v-if="!hiddeSearchBtn">
                    <div><button class="small-button" @click="changeFilter">
                                <i class="el-icon-search"></i> 搜索</button>
                    </div>
                    <div style="margin-top:13px;">
                        <button class="small-button lite" @click="resetFilter">
                        <i class="el-icon-close" style="font-size:9px"></i> &nbsp;清除</button>
                    </div>
                  </div>
                </div>
             </el-tab-pane> 
        </el-tabs>
      </div>
</template>

<script>
import utils from "@/common/Utils";
// import backendAPI from "@/common/BackendAPI";
export default {
  name: "changeFilter",
  props: {
    value: {
      type: Number,
      default: 0
    },
    shopId: {
      type: String,
      default: ""
    },
    shopAuthCode: {
      type: String,
      default: ""
    },
    watermarkId:{
        type:String,
        default:''
    },
    hiddeSearchBtn:{
      type:Boolean,
      default:false
    },
    wareFilters:{
      type:String,
      default:''
    },
    lockViewShow:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      
      filterIdx: 1,
      jdCategories: [],
      jdCid: null,
      shopCategories: [],
      shopCid: null,
      wareStatus: 8,
      allWareStatus: [{ name: "正在销售", id: 8 }, 
                      { name: "全部待售", id: -8 },
                      // { name: "从未上架", id: 1 }, 
                      // { name: "自主下架", id: 2 },
                      // { name: "系统下架", id: 4 }
                      ],
      trafficOptions: [{ name: "无流量", id: 0 }, 
                      { name: "有流量", id: 1 }],                    
      title: null,
      stockNumMin: null,
      stockNumMax: null,
      jdPriceMax: null,
      jdPriceMin: null,
      lockMethod:'',
      itemNum:"",
      wareId:"",
      itemNumsText: "",
      wareIdsText: "",
      skuIdsText: "",
      itemLinksText: "",
      filterType: "scope",
      watermarkOption:'',
      mobileDescOption:'',
      mobileDescStatusOption:"",
      mattingOption:'',
      relevanceOption:"",
      hasTraffic:'',
      utils: utils,
      getQueryParamaterPost: {
        wareFilter: {}
      },
      hasTrafficData:false,
      trafficDataStartDate:'',
      trafficDataEndDate:'',
      trafficQueryStartDay:'',
      trafficQueryEndDay:'',
      trafficQueryIndex:'pv',
      trafficQueryCompare:-1,
      trafficQueryCompareValue:'',
      tradeQueryIndex:'jdpay_auction_num',
      tradeQueryCompare:-1,
      tradeQueryCompareValue:'',
      pickerOptions: {
          disabledDate(time) {
              return time.getTime() > Date.now();
          }
      },
      defaultTrafficQueryStartDay:null,
      defaultTrafficQueryEndDay:null,
      modifiedStart:null,
      modifiedEnd:null,
      onlineStart:null,
      onlineEnd:null,
      offlineStart:null,
      offlineEnd:null
    };
  },
  computed: {
    isTrafficWareFilterOnly(){
      return this.wareFilters==='trafficOnly';
    },
    trafficStatus(){
      if(this.hasTrafficData){
        return "您店铺可供查询的流量数据日期范围：【"+ this.trafficDataStartDate +"】 ~ 【"+ this.trafficDataEndDate +"】（来源于京东，仅供参考）";
      }
      else{
        return "您店铺当前无可用流量统计数据。（注：新用户首次登录后第二天开始，系统将每日从京东提取数据）";
      }
    },
    itemNums() {
      if (this.itemNumsText && this.itemNumsText != "") {
        var valueArray = this.getArray(this.itemNumsText);
        var stringArray = new Array();
        for (var i in valueArray) {
          var v = valueArray[i];
          if (v && v != "") {
            stringArray.push(v);
          }
        }
        return stringArray;
      } else {
        return null;
      }
    },
    itemNumsNumber() {
      if (this.itemNums) {
        console.log(this.itemNums.length);
        return this.itemNums.length;
      } else {
        return 0;
      }
    },
    wareIds() {
     
      if (this.wareIdsText && this.wareIdsText != "") {
        var wareIdsText= this.wareIdsText.trim();
        //console.log("wareIdsText",wareIdsText)
        var valueArray = this.getArray(wareIdsText);
        //console.log("valueArray",valueArray)
        var longArray = new Array();
        for (var i in valueArray) {
          var v = valueArray[i].trim();
          if (v != "" && utils.isLongNumber(v)) {
            longArray.push(Number(v));
          }
        }
        return longArray;
      } else {
        return null;
      }
    },
    wareIdsNumber() {
      if (this.wareIds) {
        return this.wareIds.length;
      } else {
        return 0;
      }
    },
    skuIds() {
      if (this.skuIdsText && this.skuIdsText != "") {
        var valueArray = this.getArray(this.skuIdsText);
        var stringArray = new Array();
        for (var i in valueArray) {
          var v = valueArray[i];
          if (v && v != "" && utils.isLongNumber(v)) {
            stringArray.push(v);
          }
        }
        return stringArray;
      } else {
        return null;
      }
    },
    skuIdsNumber() {
      if (this.skuIds) {
        return this.skuIds.length;
      } else {
        return 0;
      }
    },
    skuIdsFromLink() {
      if (this.itemLinksText.trim() == "") {
        this.itemLinksText = "";
        return null;
      }
      var text = this.itemLinksText
        .replace(new RegExp(/(\n)/g), "<>")
        .replace(new RegExp(/(;<>)/g), "<>")
        .replace(new RegExp(/(；<>)/g), "<>")
        .replace(new RegExp(/(;http)/g), "<>http")
        .replace(new RegExp(/(；http)/g), "<>http")
        .replace(new RegExp(/(;|；)$/g), "<>");

      var linkArray = text.split("<>");

      var jdItemUrlReg = new RegExp(/item\.jd\.com\/[0-9]*\.html/g);
      var skuIds = new Array();

      for (var i in linkArray) {
        var link = linkArray[i];

        if ((link + "").search(jdItemUrlReg) > 0) {
          var skuid = link.match(/[0-9]{2,20}/);
          //console.log("skuid", skuid[0]);
          skuIds.push(skuid[0]);
        }
      }
      return skuIds;
    },
    skuIdsFromLinkNumber() {
      if (this.skuIdsFromLink) {
        return this.skuIdsFromLink.length;
      } else {
        return 0;
      }
    },
    shopCategroyItems() {
      var items = new Array();
      for (var i = 0; i < this.shopCategories.length; i++) {
        var cate = this.shopCategories[i];

        var item = {
          id: cate.cid,
          name: cate.name
        };

        if (cate.subCateInfo && cate.subCateInfo.length > 0) {
          for (var j = 0; j < cate.subCateInfo.length; j++) {
            var subCate = cate.subCateInfo[j];

            var subItem = {
              id: subCate.cid,
              name: cate.name + " - " + subCate.name
            };
            items.push(subItem);
          }
        } else {
          items.push(item);
        }
      }
      return items;
    }
  },
  created(){
    // var today = new Date();
    // this.defaultTrafficQueryEndDay = today;
    // var weekAgoTs = today.getTime() - 7*24*60*60*1000;
    // var weekAgoDate = new Date();
    // weekAgoDate.setTime(weekAgoTs);
    // this.defaultTrafficQueryStartDay = weekAgoDate;
  },
  watch:{
    shopId:function(newVal){
      //console.log("shopIdshopId:",this.shopId);
      this.loadCategroeis();
    }
  },
  mounted() {    
    this.filterType=this.isTrafficWareFilterOnly?"traffic":"scope"
    // this.loadCategroeis();
    //this.loadTrafficData();

    
    var now = new Date();
    var day7Ago = now.getTime() - 7*24*60*60*1000;
    this.trafficQueryStartDay= utils.getDateStringFromUTC(day7Ago,true);
    this.trafficQueryEndDay=utils.getDateString(now,true);

  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  methods: {
    resetModifiedEnd(){
      this.modifiedEnd=null;
    },
    resetOnlineEnd(){
      this.onlineEnd=null;
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
    },
    queryTraffic(){

      if(this.filterType == "traffic"){
        if(this.trafficQueryStartDay==''){
          this.$messager.error("请输入起始时间");
          return;
        }
        if(this.trafficQueryCompareValue=='' &&  this.tradeQueryCompareValue==''){
          this.$messager.error("请输入流量或者销量指标数量");
          return;
        }
        if(this.trafficQueryCompareValue!='' 
          && !utils.isNonZeroInteger(this.trafficQueryCompareValue) 
          && this.trafficQueryCompareValue!="0"){
          this.$messager.error("流量指标数量有误");
          return;
        }
        if(this.tradeQueryCompareValue!='' 
          && !utils.isNonZeroInteger(this.tradeQueryCompareValue) 
          && this.tradeQueryCompareValue!="0"){
          this.$messager.error("销量指标数量有误");
          return;
        }
      }
      else{
        this.$messager.error("");
        return;
      }
               
      this.changeFilter();
    },
    changeFilter(){
        this.$emit('change',this.getQueryParamater());
    },  
    filterTypeChange(tab) {
      //this.resetFilter();
    },
    getArray(text) {
      text = text.replace(new RegExp(/(\n)/g), "<>");
      text = text.replace(new RegExp(/(;)/g), "<>");
      text = text.replace(new RegExp(/(；)/g), "<>");
      var arr = text.split("<>");
      return arr;
    },
    initFilters(filter) {
      // console.log("WFFF initFilters .... ",filter)
      if (filter) {
        if (filter.title && filter.title != "") {
          this.title = filter.title;
        }
        if (filter.wareId!=undefined && filter.wareId!='') {          
          this.wareId = filter.wareId;
        }
      
        if (filter.shopCids && filter.shopCids.length > 0) {
          this.shopCid = filter.shopCids[0];
        }

        if (filter.wareStatus!=undefined) {          
          this.wareStatus = filter.wareStatus;
        }

        if (filter.hasTraffic!=undefined && filter.hasTraffic!="") {          
          this.hasTraffic = filter.hasTraffic;
        }


        if (filter.stockNumMin && filter.stockNumMin != "") {
          this.stockNumMin = Number(filter.stockNumMin);
        }

        if (filter.stockNumMax && filter.stockNumMax != "") {
          this.stockNumMax = Number(filter.stockNumMax);
        }

        if (filter.jdPriceMax && filter.jdPriceMax != "") {
          this.jdPriceMax = filter.jdPriceMax;
        }

        if (filter.jdPriceMin && filter.jdPriceMin != "") {
          this.jdPriceMin = filter.jdPriceMin;
        }

        if (filter.mattingOption && filter.mattingOption != "") {
          this.mattingOption = filter.mattingOption;
        }

        if (filter.mobileDescOption && filter.mobileDescOption != "") {
          this.mobileDescOption = filter.mobileDescOption;
        }
        if(filter.lockMethod&& filter.lockMethod != ""){
          this.lockMethod = filter.lockMethod;
        }
        
      }

      this.changeFilter();
    },
    resetFilter() {
      this.title = "";
      this.jdCid = "";



      this.jdPriceMax = "";
      this.jdPriceMin = "";
      this.wareStatus = "";
      this.hasTraffic = "";
      this.shopCid = "";
      this.stockNumMax = "";
      this.stockNumMin = "";
      this.itemNum="";
      this.wareId="";
      this.page = 1;
      this.wareIdsText = "";
      this.itemNumsText = "";
      this.skuIdsText = "";
      this.itemLinksText = "";
      this.watermarkOption="";
      this.mobileDescOption="";
      this.mobileDescStatusOption="";
      this.mattingOption="";     
      this.relevanceOption="";
      this.modifiedStart=null;
      this.modifiedEnd=null;
      this.offlineStart=null;
      this.offlineEnd=null;
      this.onlineEnd=null;
      this.onlineStart=null;
      this.lockMethod="";

      var now = new Date();
      var day7Ago = now.getTime() - 7*24*60*60*1000;
      this.trafficQueryStartDay= utils.getDateStringFromUTC(day7Ago,true);
      this.trafficQueryEndDay=utils.getDateString(now,true);
      this.trafficQueryCompare=-1;
      this.trafficQueryCompareValue='';
      this.trafficQueryIndex='pv';
      this.tradeQueryCompare=-1;
      this.tradeQueryCompareValue='';
      this.tradeQueryIndex='jdpay_auction_num'

      this.$emit('change',this.getQueryParamater());
    },

    loadCategroeis() {
      backendAPI
        .getAPI(
          "getCategroies.do?shopId=" +
            this.shopId +
            "&shopAuthCode=" +
            this.shopAuthCode +"&r="+Math.random()
        )
        .then(data => {
          if (data.categroies) {
            this.shopCategories = data.categroies.shopCategories;
            this.shopCategories.push(
              {subCateInfo: [], parent_id: 0, name: "无店铺分类商品", index_id: 1000, is_parent: true, cid: -1, id: -1}
              );
            this.jdCategories = data.categroies.jdCategroeis;
            //console.log(this.jdCategroeis,this.shopCategories);
          } else {
            //
          }
        })
        .catch(errormsg => {
          //this.$messager.error(errormsg.error||errormsg);
        });
    },
    loadTrafficData() {
      backendAPI
        .getAPI("getTrafficeDateRange.do")
        .then(data => {
          if (data.traffic) {
            this.hasTrafficData = data.traffic.has_traffic_data;
            this.trafficDataStartDate = data.traffic.start;
            this.trafficDataEndDate = data.traffic.end;
          }
        })
        .catch(errormsg => {
          //this.$messager.error(errormsg.error||errormsg);
        });
    },
    getQueryParamater() {
      var param = {
        wareFilter: {}
      };

      if (this.filterType == "scope") {
        if (this.title && this.title != "") {
          param.wareFilter.title = this.title;
        }

        if (this.itemNum && this.itemNum != "") {
          this.itemNum=this.itemNum.trim();
          param.wareFilter.itemNum = this.itemNum;
        }


        if (this.wareId && this.wareId != "") {
          this.wareId = this.wareId.trim();
          param.wareFilter.wareId = this.wareId;
        }

        if (this.jdCid && this.jdCid != "") {
          param.wareFilter.jdCid = this.jdCid;
        }

        if (this.shopCid && this.shopCid != "") {
          param.wareFilter.shopCids = new Array();
          param.wareFilter.shopCids.push(this.shopCid);
        }

        if (this.wareStatus && this.wareStatus != "") {
          param.wareFilter.wareStatus = this.wareStatus;
        }
        if (this.hasTraffic !== "") {
          param.wareFilter.hasTraffic = this.hasTraffic;
        }
        if (this.stockNumMin && this.stockNumMin != "") {
          param.wareFilter.stockNumMin = Number(this.stockNumMin);
        }

        if (this.stockNumMax && this.stockNumMax != "") {
          param.wareFilter.stockNumMax = Number(this.stockNumMax);
        }

        //jd价格范围
        if (this.jdPriceMin && this.jdPriceMin != "") {
          param.wareFilter.jdPriceMin = Number(this.jdPriceMin);
        }

        if (this.jdPriceMax && this.jdPriceMax != "") {
          param.wareFilter.jdPriceMax = Number(this.jdPriceMax);
        }


        if(this.modifiedStart && this.modifiedStart!=""){
            param.wareFilter.modifiedStart = this.modifiedStart;
        }

        if(this.modifiedEnd && this.modifiedEnd!=""){
            param.wareFilter.modifiedEnd = this.modifiedEnd;
        }


        if(this.onlineStart && this.onlineStart!=""){
            param.wareFilter.onlineStart = this.onlineStart;
        }

        if(this.onlineEnd && this.onlineEnd!=""){
            param.wareFilter.onlineEnd = this.onlineEnd;
        }


        if(this.offlineStart && this.offlineStart!=""){
            param.wareFilter.offlineStart = this.offlineStart;
        }

        if(this.offlineEnd && this.offlineEnd!=""){
            param.wareFilter.offlineEnd = this.offlineEnd;
        }

        if (this.watermarkOption && this.watermarkOption != "") {
          param.wareFilter.watermarkOption = this.watermarkOption;
        }
      

        if (this.mobileDescOption && this.mobileDescOption != "") {
          param.wareFilter.mobileDescOption = this.mobileDescOption;
        }
        if (this.lockMethod && this.lockMethod != "") {
          param.wareFilter.lockMethod = this.lockMethod;
        }

        if (this.mobileDescStatusOption && this.mobileDescStatusOption != "") {
          param.wareFilter.mobileDescStatusOption = this.mobileDescStatusOption;
        }


      if (this.mattingOption && this.mattingOption != "") {
          param.wareFilter.mattingOption = this.mattingOption;
        }

        if (this.relevanceOption && this.relevanceOption != "") {
          param.wareFilter.relevanceOption = this.relevanceOption;
        }

      }

      if (
        this.filterType == "wareId" &&
        this.wareIds
      ) {
        param.wareFilter.wareIds = this.wareIds;
      }

      if (
        this.filterType == "itemNum" &&
        this.itemNums &&
        this.itemNums.length > 0
      ) {
        param.wareFilter.itemNums = this.itemNums;
      }

      if (this.filterType == "skuId" && this.skuIds && this.skuIds.length > 0) {
        param.wareFilter.skuIds = this.skuIds;
      }

      if (
        this.filterType == "itemLink" &&
        this.skuIdsFromLink &&
        this.itemLinksText.length > 0
      ) {
        param.wareFilter.skuIds = this.skuIdsFromLink;
      }


      if (
        this.filterType == "traffic"
         && this.trafficQueryStartDay!=''
         && (this.trafficQueryCompareValue!='' || this.tradeQueryCompareValue!='' )
      ) {

        if (this.shopCid && this.shopCid != "") {
          param.wareFilter.shopCids = new Array();
          param.wareFilter.shopCids.push(this.shopCid);
        }
        
        param.wareFilter={
          'onlineStart':this.onlineStart,
          'onlineEnd':this.onlineEnd,
          'offlineStart':this.offlineStart,
          'offlineEnd':this.offlineEnd,
          'jdCid':this.jdCid,
          'shopCid':this.shopCid,
          'wareStatus':this.wareStatus
        },

        param.wareFilter.trafficAndTradeQuery = {
          'trafficQueryStartDay':this.trafficQueryStartDay,
          'trafficQueryEndDay':this.trafficQueryEndDay,
          'trafficQueryIndex':this.trafficQueryIndex,
          'trafficQueryCompare':this.trafficQueryCompare,
          'trafficQueryCompareValue':this.trafficQueryCompareValue,
          'tradeQueryIndex':this.tradeQueryIndex,
          'tradeQueryCompare':this.tradeQueryCompare,
          'tradeQueryCompareValue':this.tradeQueryCompareValue,
        }
      }

      return param;
    }
  }
};
</script>
<style>
.el-tabs__item {
  font-size: 12px;
}

.filter-textarea {
  float: left;
  width: 563px;
}
.filter-button-area {
  float: left;
  margin-left: 20px;
  width: 120px;
}

.filter-text {
  width: 100%;
  height: 70px;
}

.ware-filter-tab{
  margin-top:3px;height:70px;
}
</style>
