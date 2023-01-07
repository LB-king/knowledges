<template>
  <div>
    <Son>
      <!-- 1.匿名插槽 -->
      <!-- <slot>1.父组件的匿名插槽</slot> -->
      <!-- 2.具名插槽 -->
      <!-- <h3 slot="head">
        2.具名插槽
      </h3> -->
      <!-- 3.作用域插槽 -->
      <!-- <span slot="foot" slot-scope="slotProps">
        3.作用域插槽---{{ slotProps.sProp }}
      </span> -->
      <template v-slot:foot="{ sProp }">
        <h2>默认插槽-v-slot---{{ sProp }}</h2>
      </template>
    </Son>
  </div>
</template>

<script>
export default {
  name: 'dic',
  mounted() {
    console.log('dict')
  },
  components: {
    Son: () => import('@/components/slotTest.vue')
  }
}
</script>

<style>
</style>