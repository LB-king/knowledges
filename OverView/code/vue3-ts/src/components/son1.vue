<template>
  <div class="son1">
    <h3>SON1...</h3>
    <p>{{ title }}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      default: 'son1默认标题'
    }
  }
}
</script>

<style scoped>
.son1 {
  margin-top: 10px;
  padding: 5px;
  border: 1px dashed rgb(6, 197, 22);
}
</style>