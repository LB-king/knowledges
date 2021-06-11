<template lang="pug">
.ref_box 
  | {{ name }}
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    let name = ref('kobe')
    return {
      name
    }
  }
}
</script>
