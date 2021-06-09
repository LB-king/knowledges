import { reactive } from 'vue'
function addFn(state) {
  let stating = reactive({
    person: {
      name: '',
      age: ''
    }
  })
  function addPerson(e) {
    e.preventDefault()
    state.persons.push({
      name: stating.person.name,
      age: stating.person.age
    })
  }
  return { stating, addPerson }
}

export default addFn
