<template>
  <div class="hello">
    <img alt="Vue logo" :src="logoUrl">
    <div class="s-v-g" v-html="svgXml"></div>
    <!-- <img alt="Vue logo" :src="require('@/assets/logo.png')" /> -->
  </div>
</template>

<script>
import svgUrl from '@/static/chain-ic.svg'
import axios from 'axios'
let logoUrl = require('@/assets/logo.png')
export default {
  name: 'HelloWorld',
  data() {
    return {
      logoUrl: require('!url-loader?limit=10000!../static/logo.png').default,
      svgUrl: require('!url-loader?limit=10240!../assets/chain-ic.svg'),
      svgXml: ''
    }
  },
  props: {
    msg: String
  },
  mounted() {
    console.log(svgUrl)
    console.log(this.svgUrl) // /3ef261971cbce303edbaa26e88b01c6c.svg
    axios.get(this.svgUrl, { responseType: 'text' }).then(res => {
      this.svgXml = res.data
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
