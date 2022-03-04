<template>
  <div class="father">
    <h3>Home...</h3>
    <Son ></Son>
    <Son1></Son1>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, Ref } from 'vue'
import Son from './son.vue'
import Son1 from './son1.vue'
export default defineComponent({
  setup() {
    let title = ref('父组件的title')
    onMounted(() => {
      setTimeout(() => {
        title.value = '2s之后的值'
      }, 2000)
    })
    return {
      title
    }
  },
  components: {
    Son,
    Son1
  }
})
</script>
<style scoped lang="less">
.father {
  padding: 15px;
  border: 1px dashed rgb(39, 16, 243);
}
</style>
