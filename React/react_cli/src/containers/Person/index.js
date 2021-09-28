import { Component } from 'react'
import { connect } from 'react-redux'
// import { ADD_PERSON } from '../../redux/constant'
import { addPerson } from '../../redux/actions/person'
class Person extends Component {
  state = {
    list: ['H5']
  }
  add = (event) => {
    let {
      target: { value }
    } = event
    if (event.keyCode === 13 && value) {
      this.props.addPerson({name: value, age:'xxx'})
      event.target.value = ''
    }
  }
  render() {
    let list = this.props.persons
    console.log(list)
    return (
      <div>
        <h3>这是Person组件：</h3>
        <input placeholder="输入内容并添加" type="text" onKeyUp={this.add} />
        <ul>
          {list.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default connect((state) => ({ persons: state.persons }), {
  addPerson
})(Person)
