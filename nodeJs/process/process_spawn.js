const child_process = require('child_process')
for (let i = 0; i < 3; i++) {
  let workProcess = child_process.spawn('node', ['support.js', i])
  workProcess.stdout.on('data', function(data) {
    console.log('stdout', data.toString())
  })
  workProcess.stderr.on('data', function(data) {
    console.log('stderr', data)
  })
  workProcess.on('close', function(code) {
    console.log('子进程的退出码：' + code)
  })
}
