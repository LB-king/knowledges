<template lang="pug">
.mars-pro 
  pro-action(@click.native="doHandle") 按钮
  pro-action(@handler="doHandle") 按钮
</template>

<script>
export default {
  name: 'mars',
  methods: {
    doHandle() {
      console.log(999)
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
</style>
