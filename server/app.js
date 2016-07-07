
var express = require('express');
var app = express();
var path = require("path");
var mongo = require('./db/mongo');

app.get('/', 
	function (req, res, next) {
		mongo.user.find().then(function(data){
			console.log(data);

			next();
		});

	  res.sendFile(path.join(__dirname+'/index.html'));
	}, 
	function (req, res) {
		console.log(1230);
	});

app.listen(3000, function () {
  console.log('Example app listening on port 3000 !');
});

