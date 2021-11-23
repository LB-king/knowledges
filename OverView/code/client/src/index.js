import ajax from '../lib/ajax1'

btn.addEventListener('click', () => {
  ajax({
    url: 'http://localhost:5000/users',
    method: 'get',
    data: {
      name: 'zs',
      id: 123
    },
    success: function (res) {
      console.log(res)
    }
  })
})
