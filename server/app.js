var express = require('express');
var app = express();
var mongo = require('./db/mongo');


var router = require('./route');

app.use('/', router);


app.listen(3000, function () {
  console.log('Example app listening on port 3000 !');
});
