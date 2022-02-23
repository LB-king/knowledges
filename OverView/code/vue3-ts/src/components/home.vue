<template>
  <header>Home组件</header>
  <button @click="toggle">点击打开/关闭模态框</button>
  <p>{{ isShow ? '显示' : '隐藏' }}</p>
  <Modal v-show="isShow"></Modal>
</template>
<script setup lang="ts">
import { Ref, ref } from 'vue'
import Modal from './modal.vue'
let isShow: Ref<boolean> = ref(false)

function toggle(): void {
  isShow.value = true
}
</script>
