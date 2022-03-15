<template>
  <div class="home-son">
    home son
  </div>
</template>

<script>

export default {
  name: 'HomeSon',
  beforeCreate() {
    console.log('子-beforeCreate')
  },
  created() {
    console.log('子-created')
  },
  beforeMount() {
    console.log('子-beforeMount')
  },
  mounted() {
    console.log('子-mounted')
  }
}
</script>
<style lang="less">
.box {
  height: 200px;
  width: 200px;
  background-color: antiquewhite;
}
</style>
