var express = require('express');
var app = express();

var user = require('./users')



user.printall();
// app.get('/', function (req, res,next) {
//     console.log('get method');
//     next();
// }, function (req, res) {
//   res.send('Hello from B!');
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000 !');
});
