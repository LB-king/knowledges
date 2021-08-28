export default {
  data() {
    return {
      name: 'mixin1中的name'
    }
  },
  methods: {
    say() {
      console.log('mixin1中的name', this.name);
    }
  }
}