const child_process = require('child_process')
for(let i = 0;i < 3; i++) {
  let workProcess = child_process.exec('node support.js ' + i, function(err, stdout, stderr){
    if(err) {
      console.log(err.stack)
    }
    console.log('stdout: ' + stdout)
    console.log('stderr: ' + stderr)
  })
  workProcess.on('exit', function(code) {
    console.log('子进程已退出：' + code)
  })
}