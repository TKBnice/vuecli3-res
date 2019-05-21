<style scoped>
  main {
    width: 100%; 
    display: flex;
  }
  main > span {
    background: #409eff ;
    color: white;
    margin: auto;
    padding: .3em 1em .5em;
    border-radius: 3px;
    box-shadow: 0 0 .5em #409eff ;
    animation: shake-baidu 2s ease 0s infinite;
    animation-play-state: paused;
  }
  .main:hover > span,
  .main > span:hover {
    animation-play-state: running;
  }
  @keyframes shake-baidu {
    from    { transform: rotate(0deg); }
    4%      { transform: rotate(5deg); }
    12.5%   { transform: rotate(-5deg); }
    21%     { transform: rotate(5deg); }
    29%     { transform: rotate(-5deg); }
    37.5%   { transform: rotate(5deg); }
    46%     { transform: rotate(-5deg); }
    50%,to  { transform: rotate(0deg); }
  }
</style>
<template>
  <main class="main">
    <span>You-need-to-know-css!</span>
  </main>
</template>
<script>
</script>