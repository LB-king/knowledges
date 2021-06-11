<template lang="pug">
.main_list
form
  | name:
  input(type='text', v-model='stating.person.name')
  | age:
  input(type='text', v-model='stating.person.age')
  p(
    v-for='(item, index) in state.persons',
    :key='index',
    :class='"item" + index',
    @click='removePerson(index)'
  )
    | {{ item.name }} -- {{ item.age }}
  button(@click='addPerson') ADD PERSON
  button(@click='changeVal') CHANGE
  p {{ main }}
</template>
<script>
import { ref, reactive } from 'vue'
import removeFn from './remove'
import addFn from './add'
export default {
  name: 'todo_list',
  setup() {
    let main = ref(123)
    let { state, removePerson } = removeFn()
    let { stating, addPerson } = addFn(state)
    function changeVal(e) {
      e.preventDefault()
      main.value += 123
    }
    return { state, removePerson, stating, addPerson, main, changeVal }
  }
}
</script>