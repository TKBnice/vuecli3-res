<template>
  <div class="about">
    <div class="projection" style="">
      <RippleButton classsName="main-step-button small" @click="openModal">
        <i class="el-icon-setting"></i>打开模态框
      </RippleButton>
    </div>

    <div class="projection">
      <div>
        <UiCheckBox v-model="checkBoxed" @changed="UiCheckBoxchanged" :marginRight="20"></UiCheckBox>
        <span>表格复选框</span>
      </div>
    </div>



    <div class="projection">
      <RippleButton classsName="main-step-button small" @click="handleProgress">
        进度条80%
      </RippleButton>
      <UiProgress :progress="finishedPercentage" style="margin-top:10px;"></UiProgress>
    </div>

    <div class="projection">
      自定义开关选择器
      <mSwitch></mSwitch>
    </div>


    <div class="projection"> 
      弹性过度
      <mInput></mInput>
    </div>

    <div class="projection" style="height:160px;"> 
      闪烁
      <mTwinkle></mTwinkle>
    </div>

    <div class="projection" > 
      抖动1
      <mShake></mShake>
    </div>

    <div class="projection" > 
      抖动2
      <mShake2></mShake2>
    </div>

    <UiModal v-model="isLoading" >
      <div class="notice-box" style="width:280px;height:80px;padding-top:15px;">
        <UiLoading :show="true" :size="20" :mode="1" text="系统正在处理，请稍候..."></UiLoading>
      </div>
    </UiModal>

  </div>
</template>


<script>
import mSwitch from 'comp/mSwitch'
import mInput from 'comp/mInput'
import mTwinkle from 'comp/mTwinkle'
import mShake from 'comp/mShake'
import mShake2 from 'comp/mShake/index2'

export default {
  data() {
    return {
      checkBoxed: false,
      radioed:'1',
      isLoading: false,
      finishedPercentage:0,
      imgzoneUsedPercentage:50
    };
  },
  mounted() {},
  components: {
    mSwitch,
    mInput,
    mTwinkle,
    mShake,
    mShake2
  },
  watch: {},
  methods: {
    UiCheckBoxchanged(checked) { //---------------复选框
     
      console.log(checked);
    },
    openModal() {//-------------打开模态框
      
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 600);
    },
    handleProgress(){ //---------------控制进度
      this.finishedPercentage = 0;

      setTimeout(() => {
        this.finishedPercentage = 30;
        setTimeout(() => {
          this.finishedPercentage = 38;
          
        }, 1000);
        setTimeout(() => {
          this.finishedPercentage = 68;
          setTimeout(() => {
            this.finishedPercentage = 88;
          }, 600);
        }, 1000);
      }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>
.notice-box {
  background-color: #fff;
  border-radius: 4px;
  width: 537px;
  height: 400px;
  top: 10%;
  text-align: center;
}
.imgzone-full-notice{
  width:200px;
  height:200px;
  border-radius:4px;
  background-color:rgba(0,0,0,0.5);
  color:yellow;
  display:flex;
  flex-flow:column;
  align-items:center;
  justify-content:center;
  padding: 10px;
}
.projection {
  height: 116px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  background: #fff;
  box-shadow: 0 0 6px rgba(180,160,120,.8);
  
}

</style>