export default {
  data() {
    return {
      name: 'mixin2中的name'
    }
  },
  methods: {
    say() {
      console.log('mixin2中的name', this.name);
    }
  }
}