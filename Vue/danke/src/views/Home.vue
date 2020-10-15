<template lang="pug">
  .home
    | 首页
    p.item(v-for="(item, index) in objList")
     | {{index}}--{{item}}
</template>

<script>
// @ is an alias to /src
// v-for 可以循环数组以及对象
export default {
  name: 'Home',
  data() {
    return {
      list: ['AA', 'BB', 'CC'],
      objList: {
        name: 'KO',
        age: 35
      }
    }
  },
  components: {
  },
  mounted() {
  }
}
</script>
