<template>

  <div ref="container">
    <el-button type="primary" @click="autoTurn">开始</el-button>
    <el-button type="primary" @click="stopAutoTurn">停止</el-button>
      <div id="wrapper" ref="wrapper" :class="{'animationRun':isRun}">
          <div>前</div>
          <div>后</div>
          <div>上</div>
          <div>下</div>
          <div>左</div>
          <div>右</div>
      </div>
  </div>

</template>
<script>
export default {
  name: "cube",
  data() {
    return {
      timer:null,
      isRun:false,
      startDate:0,
      endDate:0,
      x:0,
      y:0
    };
  },
  mounted() {
      // this.listenMouseEvent();
      // this.autoTurn();
  },
  beforeDestroy () {
      document.onmousedown = null;
      this.stopAutoTurn();
  },
  methods: {
    autoTurn(){
      this.startDate=new Date();  //开始时间
      this.isRun = true;
      
      // this.$refs.wrapper.style.transform= `rotateY(${this.x}deg) rotateX(${this.y}deg)`;
      // this.$refs.wrapper.style.transition = `transform`;
    },
    stopAutoTurn(){
      this.endDate=new Date();    //结束时间
      this.isRun = false;
      // let difference=this.endDate.getTime()-this.startDate.getTime()  //时间差的毫秒数
      // this.y = 330*(difference/5000);
      // this.x = 330*(difference/5000);
      // this.$refs.wrapper.style.transform= `rotateY(${this.y}deg) rotateX(${this.x}deg)`;
    },
    listenMouseEvent() {
      let container = this.$refs.container;
      container.onmousedown = ev => {
        //在包裹层上上摁下时，获取当前鼠标的位置
        let x = ev.clientX;
        let y = ev.clientY;
        let x1,y1;
        this.stopAutoTurn();
        container.onmousemove = ev => {
          //鼠标移动时
          x1 = parseInt(ev.clientX - x + 30); //当前位置减去下时鼠标的位置，就获取移动了多少度，应为一开始有初始角度所以加30°
          y1 = parseInt(ev.clientY - y - 30); //甚至样式每次鼠标移动式更改样式
          this.$refs.wrapper.style.transform= `rotateY(${x1}deg) rotateX(${-y1}deg)`
          this.$refs.wrapper.style.transition = `transform`

        };
        container.onmouseup = () => {
          console.log(x1,y1)
          this.x = x1;
          this.y = y1;
          container.onmousemove = null;
          return false;
        };
      };
    }
  }
};
</script>
<style scoped lang="less">
#wrapper {
  width: 200px;
  height: 200px;
  margin: 150px auto;
  /*给父元素相对定位*/
  position: relative;
  /*父元素设为3d*/
  transform-style: preserve-3d;
  /*设置父元素得景深*/
  transform: rotateY(30deg) rotateX(30deg);
}
.animationRun{
  animation: run 10s infinite linear;
}
/* 每个面的样式设置 */
#wrapper > div {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 1px solid #333;
  text-align: center;
  line-height: 200px;
  font-size: 20px;
  font-weight: 600;
}

#wrapper > div:nth-child(1) {
  transform: translateZ(100px);
  background: rgba(0, 0, 255, 0.2);
}

#wrapper > div:nth-child(2) {
  transform: translateZ(-100px);
  background: rgba(0, 255, 0, 0.2);
}

#wrapper > div:nth-child(3) {
  transform: rotateX(90deg) translateZ(100px);
  background: rgba(255, 0, 0, 0.2);
}

#wrapper > div:nth-child(4) {
  transform: rotateX(90deg) translateZ(-100px);
  background: rgba(255, 255, 0, 0.2);
}

#wrapper > div:nth-child(5) {
  transform: rotateY(90deg) translateZ(-100px);
  background: rgba(0, 255, 255, 0.2);
}

#wrapper > div:nth-child(6) {
  transform: rotateY(90deg) translateZ(100px);
  background: rgba(255, 0, 255, 0.2);
}
@keyframes run {
            0%{
                transform:rotateX(30deg) rotateY(30deg);
            }
            100%{
                transform:rotateX(1080deg) rotateY(1080deg);
            }
        }
</style>
