<template>
  <div class="js-pdf">
    <div id="main">jsPdf</div>
    <el-button @click="toPdf()">点击导出</el-button>
  </div>
</template>

<script>
export default {
  name: 'js-pdf',
  data() {
    return {}
  },
  methods: {
    toPdf() {
      console.log(99)
    }
  },
  mounted() {}
}
</script>

<style lang="scss"></style>
