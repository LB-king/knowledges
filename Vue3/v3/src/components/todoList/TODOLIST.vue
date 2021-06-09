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
</template>
<script>
import removeFn from './remove'
import addFn from './add'
export default {
  name: 'todo_list',
  setup() {
    let { state, removePerson } = removeFn()
    let { stating, addPerson } = addFn(state)
    return { state, removePerson, stating, addPerson }
  }
}
</script>