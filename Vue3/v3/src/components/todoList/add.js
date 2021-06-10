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
    const newPerson= Object.assign({}, stating.person)
    state.persons.push(newPerson)
  }
  return { stating, addPerson }
}

export default addFn
