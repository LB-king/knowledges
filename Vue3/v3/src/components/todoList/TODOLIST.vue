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
import { ref, reactive, isReactive, isRef, isProxy, toRaw, markRaw } from 'vue'
import removeFn from './remove'
import addFn from './add'
export default {
  name: 'todo_list',
  setup() {
    let obj = { name: 'nn' }
    let newN = ref(obj)
    console.log(toRaw(newN.value))
    let main = ref(123)
    let reactiveVal = reactive({
      value: 'reactiveValue'
    })
    let { state, removePerson } = removeFn()
    let { stating, addPerson } = addFn(state)
    function changeVal(e) {
      e.preventDefault()
      console.log('isReactive', isReactive(main))
      console.log('isRef', isRef(main))
      main.value += 123

      var a = Reflect.get(reactiveVal, 'value')
      var b = Reflect.set(reactiveVal, 'value', 'new')
      console.log(reactiveVal)
      console.log(a)
      console.log(b)
      // console.log(reactiveVal)
    }
    return { state, removePerson, stating, addPerson, main, changeVal }
  }
}
</script>