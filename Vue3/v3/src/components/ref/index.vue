<template lang="pug">
.ref_box(ref='box') 
  | {{ name }}
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  setup() {
    let name = ref('kobe')
    let box = ref(null)
    
    onMounted(() => {
      console.log('onMounted', box.value)
    })
    return {
      name,
      box
    }
  }
}
</script>
