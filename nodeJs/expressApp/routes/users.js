var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let data = {
    code: 1,
    list: [
      {
        name: 'zs',
        age: 26
      },
      {
        name: 'gy',
        age: 34
      }
    ]
  }
  res.send(data);
  // res.send('respond with a resource');
});

module.exports = router;
