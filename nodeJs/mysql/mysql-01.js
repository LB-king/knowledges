const mysql = require('mysql')
let connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'test'
})
connection.connect()
connection.query('SELECT 1 + 1 AS solution', function(err, results, fields) {
  if (err) throw err
  console.log('The solution is: ', results[0].solution)
})
