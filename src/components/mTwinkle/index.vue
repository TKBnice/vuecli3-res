<style scoped>
  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .main p, .main span {
    width: 388px;
    padding: 3px 10px;
    border-radius: 5px;
    font-size: 14px;
  }
  p:nth-of-type(1) {
    background-color: #f4f4f5;
    color: #909399;
    animation: 1s blink-normal infinite step-end;
  }
  p:nth-of-type(2) {
    background-color: #fdf6ec;
    color: #e6a23c;
    animation: .5s blink-alternate infinite;
    animation-direction: alternate;
  }
  p:nth-of-type(3) {
    background: #fef0f0;
    color: #f56c6c;
    animation: .5s blink-alternate infinite;
    animation-direction: alternate-reverse;
  }
  @keyframes blink-normal {
    50% {
      color: transparent;
    }
  }
  @keyframes blink-alternate {
    to {
      color: transparent;
    }
  }
</style>
<template>
  <main class="main">
    <span>animation-direction: 默认<code>normal</code></span><p>info~</p>
    <span>animation-direction: 反向<code>alternate</code></span><p>warning~ warning~</p>
    <span>animation-direction: 反向交替<code>alternate-reverse</code></span><p>error~ error~ error~</p>
  </main>
</template>
<script>
</script>