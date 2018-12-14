<template>
  <div class="about">
    <div>
      <RippleButton classsName="main-step-button small" @click="openModal">
        <i class="el-icon-setting"></i>打开模态框
      </RippleButton>
    </div>

    <div style="height:60px;line-height:60px;">
        <UiCheckBox v-model="checkBoxed" @changed="UiCheckBoxchanged" :marginRight="20"></UiCheckBox>
        <span>表格复选框</span>
    </div>

    <UiModal v-model="isLoading">
      <div class="notice-box" style="width:280px;height:80px;padding-top:15px;">
        <UiLoading :show="true" :size="20" :mode="1" text="系统正在处理，请稍候..."></UiLoading>
      </div>
    </UiModal>

    <div>
      <RippleButton classsName="main-step-button small" @click="handleProgress">
        进度条80%
      </RippleButton>
      <UiProgress :progress="finishedPercentage" style="margin-top:10px;"></UiProgress>
    </div>




  </div>
</template>



<script>
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
  components: {},
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
<style lang="less" >
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
</style>