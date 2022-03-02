<template>
  <h3>Home...</h3>
  <Son></Son>
</template>
<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Son from './son.vue'
export default defineComponent({
  components: {
    Son
  }
})
</script>
