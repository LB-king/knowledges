<template>
  <div>MiaSanMia</div>
</template>
<script lang="ts">
import { formatterDate } from '@/utils/index'
console.log('UI_LOG-当前时间', formatterDate())
formatterDate(new Date())
export default {}
</script>
