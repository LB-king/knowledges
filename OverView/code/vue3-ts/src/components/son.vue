<template>
  <div class="son">
    <h3>SON...</h3>
    <p>子组件中父组件的信息:{{ title }}</p>
    <p>
      子组件本身的信息：{{ myMsg }}<input @input="sendSon" v-model="myMsg" />
    </p>
    <GrandSon></GrandSon>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import GrandSon from './grandSon.vue'
import { onMounted, getCurrentInstance } from '@vue/runtime-core'
const instance = getCurrentInstance()
console.log(instance)
export default {
  props: {
    title: {
      default: 'son默认标题'
    }
  },
  components: {
    GrandSon
  },
  setup(props, { emit }) {
    let myMsg = ref('子组件信息')
    function sendSon() {
      emit('send', myMsg)
    }
    onMounted(() => {
      emit('send', myMsg)
      // console.log(proxy)
    })
    return {
      myMsg,
      sendSon
    }
  }
}
</script>
<style scoped>
.son {
  padding: 5px;
  border: 1px dashed #ccc;
}
</style>