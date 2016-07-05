
var express = require('express');
var app = express();
var path = require("path");
var MongoClient = require("mongodb").MongoClient;

MongoClient.connect('mongodb://localhost:27017/test', function(err, db){
  if (err) {
    throw err;
  }
  
    var temp = {name: 'azaFSDFSDFza', desc: 'ADASDAS', phone: '5455555'};
    db.collection('c1').insert(temp);
    db.collection('c1').find().toArray(function(err, result) {
    if (err) {
      throw err;
    }
    console.log(result);
  });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));

});
app.post('/', function (req, res) {
	
	console.log(JSON.stringify(req));
  res.sendFile(path.join(__dirname+'/index.html'));

});
app.listen(3000, function () {
  console.log('Example app listening on port 3000 !');
});

