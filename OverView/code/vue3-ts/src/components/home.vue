<template>
  <div>MiaSanMia</div>
</template>
<script lang="ts">
import { parseObjToQuery } from '@/utils/index'
import { onMounted } from '@vue/runtime-core'
import { nextTick } from 'vue'
console.log('UI_LOG', parseObjToQuery({ a: 99999, b: 88888 }))
export default {
  setup() {
    setTimeout(() => {
      console.log('UI_LOG', 'setTimeout')
    })
    nextTick(() => {
      console.log('UI_LOG', 'nextTick')
    })
    onMounted(() => {
    })
  }
}
</script>
