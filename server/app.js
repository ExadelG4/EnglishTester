global.__base = __dirname + '/';
var express = require('express');
var app = express();
var path = require("path");
var mongo = require('./db/mongo');
var service = require('./services/userService')
app.get('/', 
	function (req, res) {
	  service.print();
	  res.sendFile(path.join(__dirname+'/index.html'));
	});

app.listen(3000, function () {
  console.log('Example app listening on port 3000 !');
});

