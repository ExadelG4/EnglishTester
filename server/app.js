var express = require('express');
var app = express();
var mongo = require('./db/mongo');
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./route');

var rootDir = __dirname.substring(0, __dirname.lastIndexOf('\\'));

app.use(express.static(rootDir+'\\client'));
console.log(rootDir);
app.use(express.static(rootDir));
//app.use(express.static(rootDir + '\\node_modules'));
//app.use('/', router);
// app.use(express.static(__dirname + '/../client'));
// app.use(express.static(__dirname + '/../bower_components/angular/'));
// app.use(express.static(__dirname + '/../node_modules'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.get('*', function(req, res) {
	//res.set('content-type','text/html')
	res.sendFile(path.join(__dirname+'/../client/index.html'));
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000 !');
});
