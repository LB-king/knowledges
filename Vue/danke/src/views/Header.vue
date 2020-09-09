<template lang="pug">
  el-header.header_wrapper
    el-row(:gutter="10")
      | 用户信息
</template>
<style lang="scss">
.header_wrapper {
  height: 60px;
  line-height: 60px;
  background: linear-gradient(
    to right,
    rgb(210, 230, 241),
    rgb(145, 181, 247),
    rgba(84, 110, 179, 0.8)
  );
  .bg-red {
    background-color: #bbffcc;
  }
}
</style>
