// interface IFullName {
//   firstName: string
//   lastName: string
//   //可选属性
//   age?: number
// }

// function getInfo(nameObj: IFullName) {
//   if(nameObj.age === undefined) return 'no age'
//   return (nameObj.firstName + nameObj.lastName)
// }
// let n = {
//   firstName: 'FIRST',
//   lastName: 'LAST',
//   // age: 99
// }
// console.log(getInfo(n))

//封装一个简易版本的ajax
interface Config {
  method: string
  url: string
  data?: string
  // dataType: string
}

function Ajax(config: Config) {
  let xhr = new XMLHttpRequest()
  xhr.open(config.method, config.url)
 

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log('success')
      console.log(xhr.responseText)
    }
  }
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send(config.data)
}
//此处可封装data
Ajax({
  method: 'get',
  url: `https://api.github.com/search/users?q=ok`,
  // data: 'q=kk',
  // dataType: 'javascript/json'
})
