<template>
  <!-- 插槽测试 -->
  <div class="slot-test">
    <!-- 1.匿名插槽 -->
    <slot>匿名插槽的默认信息</slot>
    <!-- 2.具名插槽 -->
    <slot name="head">
      <p>head具名插槽的默认内容</p>
    </slot>
    <!-- 3.slotScope -->
    <slot name="foot" sProp="子组件的值">
      <p>foot具名插槽的默认内容</p>
    </slot>

    <el-button v-bind="{...$attrs}">SON组件</el-button>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('UI_LOG: ', this.$attrs) //$attrs会捕捉所有绑定的属性,可以做属性透传~~~
    console.log('UI_LOG: ', this.$listeners) //$listeners会捕捉所有绑定的事件
  }
}
</script>