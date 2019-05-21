<style scoped>
  main {
    width: 100%;
    padding: 39px 29px;
    font-size: 12px;
  }
  section {
    box-shadow: 0 0 0 1px #eee;
  }
  section::after {
    content: '';
    display: block;
    clear: both;
  }
  section > div {
    height: 229px;
    line-height: 1.5em;
    text-align: center;
    float: left;
    color: white;
  }
  section .left, section .right {
    width: 119px;
    padding-top: 29px;
    background: #409eff ;
  }
  section .left {
    margin-left: -100%;
  }
  section .center {
    width: 100%;
    text-align: justify;
    hyphens: auto;
  }
  section .center-inner {
    height: 100%;
    margin: 0 129px;
    padding: 29px 12px;
    background: #409eff ;
  }
  section .right {
    margin-left: -119px;
  }
  /* input range */
  input[type="range"] {
    width: 100%;
    cursor: ew-resize;
  }
</style>
<template>
  <main class="main">
    <input ref="range" type="range" value="100">
    <section :style="{ width }">
      <div class="center">
        <div class="center-inner">A paragraph of filler text. La la la de dah de dah de dah de la.</div>
      </div>
      <div class="left">left</div>
      <div class="right">right</div>
    </section>
  </main>
</template>
<script>
  export default {
    data () {
      return {
        width: "100%"
      }
    },
    mounted() {
      this.$refs.range.oninput = ({ target: { value } }) => {
        this.width = `${60 + value * .4}%`;
      }
    }
  }
</script>