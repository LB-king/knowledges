var Mock = require('mockjs')
var data = Mock.mock({
    // 属性 list 的值是一个数组，5表示生成5条数据
    'list|5': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        'ctitle': '@ctitle(2, 4)',
        //中文名称
        'cname': "@cname",
        //中文语句 长度是10-15之间
        'cword': '@cword(10, 15)',
        //中文段落
        'csentence': '@csentence(5, 16)',
        'cparagraph': '@cparagraph',
        //取1-5之间的数值
        'number|1-5': 1,
        //自增
        'increment': '@increment',
        //生成id
        'idCard': '@id()',
        //true表示也生成省
        'city': '@city(false)'
    }]
})
// 输出结果
console.log(JSON.stringify(data, null, 2))
// var express = require('express')
// var fs = require('fs')
// var path = require('path')
// var router = express.Router()

// /* GET users listing. */
// router.get('/', function (req, res, next) {
//   console.log('收到一次请求',req.query)
//   let data = [
//     { id: '001', name: 'H5' },
//     { id: '002', name: 'Andriod' },
//     { id: '003', name: 'IOS' }
//   ]

//   res.send(data)
// })

// module.exports = router
