<template>
  <div style="padding: 15px">
    <el-form :model="form" ref="form" labelWidth="120px">
      <pro-layout-contaner :columnCount="3">
        <el-form-item
          label="远程搜索"
          prop="auto"
          :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
        >
          <autoComplete v-model="form.auto"></autoComplete>
        </el-form-item>

        <el-form-item prop="input" required label="输入框">
          <pro-input v-model="form.input" clearable></pro-input>
        </el-form-item>
      </pro-layout-contaner>
    </el-form>

    <el-button @click="submit">提交</el-button>
    <hr/>
    <pro-input v-model="value" :layout="false" :lazy="false"></pro-input>
    <div>{{ value }}</div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      value: '',
      form: {}
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        console.log('UI_LOG: ', valid)
        console.log('UI_LOG: ', this.form)
      })
    }
  },
  components: {
    autoComplete: () => import('@/views/complete/search.vue')
  }
}
</script>