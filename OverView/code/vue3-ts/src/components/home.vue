<template>
  <div>MiaSanMia</div>
  <p @click="handleClick">{{ title }}</p>
</template>
<script setup lang="ts">
import { parseObjToQuery } from '@/utils/index'
console.log('UI_LOG', parseObjToQuery({ a: 99999, b: 88888 }))

defineProps({
  title: String
})
function handleClick() {
  // console.log('UI_LOG', 'handleClick')
  emit('test')
}
let emit = defineEmits(['test', 'test1'])
// export default {
//   setup() {
//     setTimeout(() => {
//       // console.log('UI_LOG', 'setTimeout')
//     })
//     nextTick(() => {
//       // console.log('UI_LOG', 'nextTick')
//     })
//     onMounted(() => {})
//   }
// }
</script>
