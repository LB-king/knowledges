import { reactive } from 'vue'
function removeFn() {
  let state = reactive({
    persons: [
      {
        name: 'AAA',
        age: 13
      },
      {
        name: 'BBB',
        age: 19
      }
    ]
  })
  function removePerson(index) {
    state.persons = state.persons.filter((item, idx) => idx !== index)
  }
  return { state, removePerson }
}

export default removeFn
