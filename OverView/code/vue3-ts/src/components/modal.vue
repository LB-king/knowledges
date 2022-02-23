<template>
  <teleport to="body">
    <div class="modal-wrapper" v-show="visible">
      <div class="modal-content">
        <h3>模态框</h3>
        <button @click="close">点击关闭</button>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
const props = defineProps({
  visible: Boolean
})
const emit = defineEmits(['close'])
function close() {
  console.log('close')
  emit('close')
}
</script>

<style lang="less">
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(23, 30, 99, 0.5);
  .modal-content {
    width: 40%;
    height: 40%;
    margin: 10% auto;
    background-color: #fff;
    text-align: center;
    h3 {
      color: #bbf;
    }
  }
}
</style>
