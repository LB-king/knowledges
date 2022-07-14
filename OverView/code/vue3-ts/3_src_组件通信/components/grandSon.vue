<template>
  <div class="grandson">
    <h3>GRANDSON...</h3>
    <p>{{ title }}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      default:'grandson默认标题'
    }
  }
}
</script>
<style scoped>
.grandson {
  padding: 5px;
  border: 1px dashed rgb(203, 235, 22);
}
</style>