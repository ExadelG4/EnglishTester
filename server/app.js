var express = require('express');
var app = express();
var mongo = require('./db/mongo');
var path = require('path');
var bodyParser = require('body-parser');

var adminRouter = require('./api/Routers/adminRoute');
var userRouter = require('./api/Routers/userRoute');
var teacherRouter = require('./api/Routers/teacherRoute');
var commonRouter = require('./api/Routers/commonRoute');

var jwt = require('jsonwebtoken');
var path = require('path');


app.use(bodyParser.json());
app.use('/../bower_components', express.static(path.normalize(__dirname + '/../client/bower_components')));
app.use(express.static(path.normalize(__dirname + '/../client')));

app.use('/admin',adminRouter);
app.use('/user',userRouter);
app.use('/teacher',teacherRouter);
app.use('/',commonRouter);


app.get('*', function(req, res) {  
	res.sendFile(path.join(__dirname + '/../client/index.html'));
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000 !');
});
