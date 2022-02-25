<template>
  <h3>SON...</h3>
  <p>{{ title }}</p>
</template>
<script>
import { inject } from 'vue'
export default {
  inject: ['title']
}
</script>
<!--
1.组合式API语法糖写法
<script setup lang="ts">
import { inject } from 'vue'
let title = inject('title')
</script>

2.组合式API
import { inject } from 'vue'
export default {
  setup() {
    let title = inject('title')
    return { title }
  }
}


3.非组合式API
<script>
export default {
  inject: ['title']
}
</script>

-->
