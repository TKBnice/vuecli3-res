<style scoped>
.projection {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  background: #fff;
  box-shadow: 0 0 6px rgba(180,160,120,.8);
  box-sizing: border-box;
}
</style>
<template>
    <div>
        <div class="projection">
            <h2 style="margin:20px auto;">将元素左右padding设置为父元素宽度的50%减去等宽内容的一半即可，无需设置width～</h2>   
            <EqualWidthCentered></EqualWidthCentered>
        </div>

        <div class="projection">
            <h2 style="margin:20px auto;">所谓 Sticky Footer 是指一种网页效果，如果页面内容不足够长时，页脚紧贴在视口的最底部；如果内容足够长时，页脚紧跟在内容的下方.</h2>   
            <StickyFooter></StickyFooter>
        </div>

        <div class="projection">
            <h2>圣杯布局</h2>
            <HolyGrail></HolyGrail>
        </div>

        <div class="projection">
            <h2>双飞翼布局</h2>
            <DoubleWing></DoubleWing>
        </div>

        <div class="projection">
            <h2>类订单布局</h2>
            <ClassOrders></ClassOrders>
        </div>
        
    </div>
</template>
<script>
import EqualWidthCentered from '@/components/layout/EqualWidthCentered'
import StickyFooter from '@/components/layout/StickyFooter'
import HolyGrail from '@/components/layout/HolyGrail'
import DoubleWing from '@/components/layout/DoubleWing'
import ClassOrders from '@/components/layout/ClassOrders'

export default {
  data() {
    return {

    };
  },
  mounted() {},
  components: {
    EqualWidthCentered,
    StickyFooter,
    HolyGrail,
    DoubleWing,
    ClassOrders
  },
  methods: {}
}
</script>