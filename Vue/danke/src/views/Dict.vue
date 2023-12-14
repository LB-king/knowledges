<template>
  <div>
    <Son
      data-key="oooooo"
      @ccc="console.log()"
      v-on:click="handle"
      type="warning"
      size="mini"
    >
      <!-- 1.匿名插槽 -->
      <!-- <slot>1.父组件的匿名插槽</slot> -->
      <!-- 2.具名插槽 -->
      <!-- <h3 slot="head">
        2.具名插槽
      </h3> -->
      <!-- 3.作用域插槽 -->
      <!-- <span slot="foot" slot-scope="slotProps">
        3.作用域插槽---{{ slotProps.sProp }}
      </span> -->
      <template v-slot:foot="{ sProp }">
        <h2>默认插槽-v-slot---{{ sProp }}</h2>
      </template>
    </Son>
    <hr />
    <el-date-picker
      v-model="value2"
      align="right"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions"
    >
    </el-date-picker>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'dic',
  computed: {
    pickerOptions() {
      return {
        disabledDate(time) {
          console.log('UI_LOG: ', moment(time).format('YYYY-MM-DD'))
          return time.getTime() > Date.now() || ['2023-08-09', '2023-08-11', '2023-08-13'].includes(moment(time).format('YYYY-MM-DD'))
        }
      }
    }
  },
  data() {
    return {
      value2: ''
    }
  },
  methods: {
    handle() {}
  },
  mounted() {
    console.log('dict')
  },
  components: {
    Son: () => import('@/components/slotTest.vue')
  }
}
</script>

<style></style>
