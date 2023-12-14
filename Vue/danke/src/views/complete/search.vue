<template>
  <pro-input
    uiType="autocomplete"
    v-on="$listeners"
    v-model="inValue"
    v-bind="queryDatas"
    :debounce="800"
    placeholder="请输入内容"
    @select="handleSelect"
    clearable
  >
    <template slot-scope="{ item }">
      <span>{{ item.value }}</span>
    </template>
  </pro-input>
</template>
  
  
  <script>
import { post, get } from 'mars-pro/lib/pro/request'
import { objectProperty } from 'mars-pro/lib/pro/util'
import dataSource from 'mars-pro/lib/pro/mixins/dataSource/index'

export default {
  name: 'auto-complete',
  model: {
    prop: 'modelValue',
    event: 'returnModel'
  },
  props: {
    modelValue: String | Array | Object | Boolean | Number
  },
  mixins: [
    dataSource('queryDatas', get('https://api.github.com/search/users'), {
      dataField: 'items',
      singleQueryField: 'q',
      enablePagination: false,
      fieldMap: { value: 'login', code: 'id' }
    })
  ],
  data() {
    console.log('UI_LOG: ', this.$attrs)
    return {
      results: []
    }
  },
  computed: {
    inValue: {
      get: function () {
        return this.modelValue
      },
      set: function (newValue) {
        this.$emit('returnModel', newValue)
        return newValue
      }
    }
  },
  methods: {
    getData() {},
    //https://api.github.com/search/users?q=xxx
    async querySearch(queryString, cb) {
      if (!queryString) return
      let { response, err } = await get('https://api.github.com/search/users', {
        q: this.inValue
      }).done()
      console.log('UI_LOG: ', response)
      if (response) {
        let res = objectProperty(response, 'data.items', []).map(item => {
          return {
            ...item,
            value: item.id
          }
        })
        cb(res)
      } else {
        cb([])
      }
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    handleSelect(v) {
      // this.inValue = String(v.login)
      this.$nextTick(() => this.$emit('returnModel', String(v.value)))
    }
  }
}
</script>