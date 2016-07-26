var express = require('express');
var app = express();
var mongo = require('./db/mongo');
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./api/route');
// var passport = require('passport');
var jwt = require('jsonwebtoken');
var path = require('path');


app.use(bodyParser.json());
app.use('/../bower_components', express.static(path.normalize(__dirname + '/../client/bower_components')));
app.use(express.static(path.normalize(__dirname + '/../client')));


// app.use(passport.initialize());
// require('./passport')(passport);


app.use('/',router);


app.get('*', function(req, res) {  
	res.sendFile(path.join(__dirname + '/../client/index.html'));
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000 !');
});
