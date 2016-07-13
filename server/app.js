var express = require('express');
var app = express();
var mongo = require('./db/mongo');
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./api/route');
// var passport = require('passport');
var jwt = require('jsonwebtoken');


app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../'));


// app.use(passport.initialize());
// require('./passport')(passport);


app.use('/',router);


app.get('*', function(req, res) {  
	res.sendFile(path.join(__dirname + '/../client/index.html'));
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000 !');
});
