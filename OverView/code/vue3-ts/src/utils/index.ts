import './tools'
/**
 * 日期转换函数 
 * 1.把当前日期(Thu Jul 14 2022 13:51:33 GMT+0800 (中国标准时间))转化为 yyyy-MM-dd 2022-08-08
 * 2.把时间戳转化为 时间格式yyyy-MM-dd 2022-08-08
 * formatterDate(1659931932888)
 * @param
 * @returns 
 */
export const formatterDate = (timeStamp: number) => {
  let dateObj = timeStamp ? new Date(timeStamp) : new Date()
  const year = dateObj.getFullYear()
  const month = addZero(dateObj.getMonth() + 1)
  const date = addZero(dateObj.getDate())
  return `${year}-${month}-${date}`
}

/**
 * 补零函数-把小于10的数字补成 08 09这样
 * @param num 
 * @returns 
 */
export const addZero = (num: string | number) => {
  return num >= 10 ? num + '' : '0' + num
}

/**
 * 把日期字符串转换成时间戳(一般用于比较日期的大小)
 * new Date('www) =>不是一个有效日期对象,可以用new Date('www).getTime()是不是等于NaN来判断
 * @param dateObj toTimestamp('2022-08-08 12:12:12:678') -> 1659931932888
 */
export const toTimestamp = (dateString: string) => {
  // 通过判断是否是有效字符串，能不能转化为时间戳来规避
  if (!dateString || isNaN(new Date(dateString).getTime())) return ''
  // 除以1000是精确到秒
  return new Date(dateString)?.getTime() / 1000
}

/**
 * 判断两个时间的先后 isBefore('2022-08-08', '2022-08-09') true
 * @param prev 
 * @param next 
 * @returns 
 */
export const isBefore = (prev: string, next: string) => {
  let prevTimeStamp = +toTimestamp(prev)
  let nextTimeStamp = +toTimestamp(next)
  return prevTimeStamp - nextTimeStamp < 0
}
/**
 * 获取2022-07-14的前n天
 * 某个日期的前n天
 */
export const getlastNDay = (date: string, n: number = 1) => {
  //1.获取date的时间戳
  let dateTimeStamp = +toTimestamp(date)
  //类似2000-99-88的数据，dateTimeStamp为空，此时可以报错或者做其他处理
  if (!dateTimeStamp) return '日期格式有误'
  if (isNaN(n)) return 'n应为整数'
  //2.获取n天前的时间戳
  let nTimeStamp = dateTimeStamp - n * 60 * 60 * 24
  //3.返回n天前的日期,注意这里要*1000
  return formatterDate(nTimeStamp * 1000)
}
type ObjectType = { [key: string]: any }
/**
 * 解析网址的方法,把？后面的参数取出放到一个对象里面
  console.log('UI_LOG', parseUrl('http://www.aaa.com?name=kb&age=3id=008899'))
  将？后面的参数转化为对象
 */
export const parseUrl = (url: string) => {
  //1.判断有没有? | 不是字符串也返回空
  if (url.indexOf('?') === -1 || typeof url !== 'string') return null
  //2.取出？后面的部分 name=kb&age=3&id=008899
  let targetParam = url.split('?')[1] || ''
  //3.按照&进行分割
  let targetArr = targetParam.split('&')
  let obj: ObjectType = {}
  // a.使用replace方法
  // targetArr.forEach(item => {
  //   item.replace(/([^&=?]+)=([^&]+)/ig, (_m, $1, $2) => {
  //     obj[$1] = $2
  //   })
  // })
  // b.使用循环
  let newArr = targetArr.map(item => item.split('='))
  newArr.forEach(item => {
    obj[item[0]] = item[1]
  })
  return obj
}

/**
 * 把对象转化为a=123&b=456
 * @param obj 
 */
export const parseObjToQuery = (obj: ObjectType = {}) => {
  let keysArr = Object.keys(obj)
  let nArr = keysArr.map(item => `${item}=${obj[item]}`)
  // console.log('UI_LOG', nArr)
  return nArr.join('&')
}

/**
 * 
 * @param obj 要处理的对象，把其中的空值去掉
 */
export const filterObj = (obj: ObjectType = {}) => {
  for (let i in obj) {
    // 避免查询原型链
    if (obj.hasOwnProperty(i)) {
      //这里可以做更多的判断，例如把{},[]...等等都去掉
      if (isEmpty(obj[i])) {
        delete obj[i]
      }
    }
  }
  return obj
}

/**
 * @param target 判断target是否为空,true表示为空，false表示有值
 * @returns 
 */
export const isEmpty = (target: any) => {
  //基于简单类型，直接过滤
  if (!target) return true
  if (['object', 'array'].indexOf(getType(target)) > -1 && Object.keys(target).length === 0) return true
}

const types = [
  'String',
  'Boolean',
  'Number',
  'Object',
  'Array',
  'Function',
  'Date',
  'RegExp',
  'Symbol',
  'Undefined',
  'Null',
  'Arguments',
  'HTMLCollection',
  'Error',
  'BigInt', //9007199254740991n
  'Window',
  'Set'
]
export const getType = (target: any) => {
  let typeObj: ObjectType = {}
  types.forEach(item => {
    typeObj[`[object ${item}]`] = item.toLowerCase()
  })
  return typeObj[Object.prototype.toString.call(target)]
}

console.log('UI_LOG', filterObj({ a: 888, b: '', c: NaN, d: 9, e: {}, f: [], g: undefined, h: null, i: new Error(), j: new Date() }))