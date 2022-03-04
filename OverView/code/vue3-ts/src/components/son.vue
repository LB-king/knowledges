<template>
  <div class="son">
    <h3>SON...</h3>
    <p>{{ title }}</p>
    <GrandSon></GrandSon>
  </div>
</template>
<script>
import GrandSon from './grandSon.vue'
export default {
  props: {
    title: {
      default: 'son默认标题'
    }
  },
  components: {
    GrandSon
  }
}
</script>
<style scoped>
.son {
  padding: 5px;
  border: 1px dashed #ccc;
}
</style>