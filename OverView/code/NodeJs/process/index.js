function main(argv) {
    console.log('UI_LOG: ', argv)
}
//执行命令  node .\index.js --ok --pk
console.log('UI_LOG: ', process.argv.slice(2)) //[ '--ok', '--pk' ]

//应当执行npm的命令 npm start --ok,使用npm 命令就会在process.env得到 npm_config_argv 的数据
console.log('UI_LOG: ', JSON.parse(process.env.npm_config_argv).original) // [ 'start', '--ok' ]

//把--ok处理成 ok 就可以处理一些事情