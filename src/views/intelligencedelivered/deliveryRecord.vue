<template>
  <div style="margin-left:20px;padding-bottom:30px;">
      <GoodsLockRecords
        v-if="listMode==1"
        :wares="wares" :isLoading="isLoading" :page="page" :pageSize="pageSize"
        @action="onWareAction"
      >
      </GoodsLockRecords>
      <goodsSalesHistory
        v-if="listMode==2"
        :wares="wares" :isLoading="isLoading" :page="page" :pageSize="pageSize"
        @action="onWareAction"
      >
      </goodsSalesHistory>
      
      <div class="grid-footer">
          <el-pagination
              @current-change="pageChange"
              @size-change="pageSizeChange"
              :page-size="pageSize"
              :current-page.sync="page"
              :page-sizes="[10,20,30,50,100,200,500]"
              layout="total,sizes,prev, pager, next,jumper"
              :total="totalCount">
          </el-pagination>
      </div>
  </div>

</template>

<script>

import GoodsLockRecords from './goodsLockRecords';
import GoodsSalesHistory from './goodsSalesHistory';
// import backendAPI from '../../common/BackendAPI';
import Data from './data.json';

export default {
  data() {
    return {
        listMode:1,
        totalCount: 0,
        isLoading: false,
        page: 1,
        pageSize: 10,
        waresRecords: [
          {
            taskTime:'2018-11-19 星期二 12:00',
            goodsNumber:"10",
            completeNumber:"5",
            failureBumbeer:"5",
            creationTime:'2018-11-19 16:00',
            completionTime:'2018-11-19 16:20',
            wareStatus:8,
            taskId:'wrqwrqwqegg'
          },
          {
            taskTime:'2018-11-19 星期二 12:00',
            goodsNumber:"10",
            completeNumber:"5",
            failureBumbeer:"",
            creationTime:'2018-11-19 06:00',
            completionTime:'2018-11-19 16:10',
            wareStatus:-8,
            taskId:'wrqwrqwqegg124'
          },
          {
            taskTime:'2018-11-19 星期二 10:00',
            goodsNumber:"12",
            completeNumber:"6",
            failureBumbeer:0,
            creationTime:'2018-11-19 08:00',
            completionTime:'2018-11-19 16:10',
            wareStatus:0,
            taskId:'wrqwegg124'
          },
          {
            taskTime:'2018-11-19 星期二 12:00',
            goodsNumber:"6",
            completeNumber:"6",
            failureBumbeer:"4",
            creationTime:'2018-11-19 12:00',
            completionTime:'2018-11-19 16:10',
            wareStatus:8,
            taskId:'wrqwrqw4'
          }
          ,
          {
            taskTime:'2018-11-19 星期二 14:00',
            goodsNumber:"3",
            completeNumber:"1",
            failureBumbeer:4,
            creationTime:'2018-11-19 16:00',
            completionTime:'2018-11-19 16:10',
            wareStatus:8,
            taskId:'wrqwr64864as'
          }
          ,
          {
            taskTime:'2018-11-19 星期二 12:00',
            goodsNumber:"6",
            completeNumber:"1",
            failureBumbeer:0,
            creationTime:'2018-11-19 00:00',
            completionTime:'2018-11-19 16:10',
            wareStatus:-8,
            taskId:'wrqwr1241264as'
          },
          {
            taskTime:'2018-11-19 星期二 19:00',
            goodsNumber:"6",
            completeNumber:0,
            failureBumbeer:6,
            creationTime:'2018-11-19 18:00',
            completionTime:'2018-11-19 16:10',
            wareStatus:0,
            taskId:'q12364864as'
          }
        ],
        wares:[]
    };
  },
  components: {
    GoodsLockRecords,
    GoodsSalesHistory
  },
  watch: {},
  created() {
    this.wares = this.waresRecords;
    this.totalCount = Data.count;
  },
  mounted() {
    
  },
  methods: {
    onWareAction(msg){
      console.log(msg)
      if(msg.t=="goBack"){
        this.listMode = 1;
        this.wares = this.waresRecords;
      }else if(msg.t=="watch"){
        this.listMode = 2;
        this.wares = Data.wares;
        this.totalCount = Data.count;
      }else if(msg.t=="stop"){
        setTimeout(() => {
            this.wares = this.waresRecords;
        }, 300);
      }
    },

    pageChange(cur) {
      this.page = cur;
      // this.loadWares();
    },
    pageSizeChange(s) {
      this.pageSize = s;
      // this.loadWares();
    },
    loadWares() {
      if(this.isLoading)
      {
        return;
      }
      this.isLoading = true;
      this.wares = [];
      //console.log("this.queryParams ",JSON.stringify(this.queryParams))
      backendAPI
        .postAPI(
          // "queryWares.do?shopId=" +
          //   this.shopId +
          //   "&shopAuthCode=" +
          //   this.shopAuthCode +
          //   "&pageSize=" +
          //   this.pageSize +
          //   "&page=" +
          //   this.page +
          //   "&orderby=" +
          //   this.orderby+
          //   "&"+this.addQueryParam,
          // this.queryParams
        )
        .then(data => {
          this.wares = data.wares;
          this.totalCount = data.count;

          this.isLoading = false;
        })
        .catch(errormsg => {
          this.isLoading = false;
          //this.$messager.error(errormsg.error||errormsg);
        });
    },
  }
};
</script>
<style lang="less" >

</style>