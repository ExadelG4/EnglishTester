var express = require('express');
var app = express();

var user = require('./users')

app.get('/',function (req, res) {
  user.printall(req, res);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000 !');
});
