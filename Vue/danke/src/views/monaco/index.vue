<template>
  <div class="monaco-box">
    <div ref="main"></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
import 'monaco-editor/esm/vs/editor/contrib/find/browser/findController'
export default {
  data() {
    return {
      monacoInstance: null,
      options: {
        value: '', //编辑器内容
        language: 'YAML', //语言
        theme: 'vs-dark', //主题
        minimap: {
          //缩略图
          enabled: false
        },
        tabSize: 2,
        autoIndent: 'full',
        foldingStrategy: 'indentation', // 代码可分小段折叠
        automaticLayout: true, // 自适应布局
        overviewRulerBorder: false, // 不要滚动条的边框
        scrollBeyondLastLine: false, // 取消代码后面一大段空白
        readOnly: false
      }
    }
  },
  methods: {
    init() {
      const mainRef = this.$refs.main

      this.$nextTick(() => {
        // this.monacoInstance = monaco.editor.create(mainRef, { ...this.options })

        // this.model = this.monacoInstance.getModel()
        // this.monacoInstance.setValue('xxx')
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="less">
.monaco-box {
  div {
    height: 600px;
    border: 1px solid #ccc;
    width: 50%;
    margin-left: 15%;
  }
}
</style>