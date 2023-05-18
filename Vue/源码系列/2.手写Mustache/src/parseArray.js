import { renderTemplate } from './renderTemplate'
import { objectProperty } from './objectProperty'
/**
 * 处理数组，结合renderTemplate实现递归
 * 注意：这个函数接收的参数是token
 *
 * @param {*} token
 * @param {*} data
 */
export const parseArray = (token, data) => {
  let res = ''
  //数据_data 从数据中取
  let _data = objectProperty(data, token[1])
  if (Array.isArray(_data) && _data.length > 0) {
    let i = 0,
      len = _data.length
    for (; i < len; i++) {
      res += renderTemplate(token[4], _data[i])
    }
  }
  return res
}

//token是下面这样的数据
var token = [
  '#',
  'arr',
  18,
  24,
  [
    ['text', '\n        <li>\n          <div class="head"><strong>', 24, 76],
    ['name', 'name', 76, 82],
    [
      'text',
      '</strong>的基本信息</div>\n          <div class="body">\n            <p>姓名：',
      82,
      152
    ],
    ['name', 'name', 152, 158],
    ['text', '</p>\n            <p>年龄：', 158, 183],
    ['name', 'age', 183, 188],
    ['text', '</p>\n            <p>性别：', 188, 213],
    ['name', 'gender', 213, 221],
    [
      'text',
      '\n            </p>\n          </div>\n        </li>\n      ',
      320,
      377
    ]
  ]
]
