var express = require('express');
var app = express();
var path = require("path");
var MongoClient = require("mongodb").MongoClient;
var mogoose = require('mongoose');

mongoose.connect('mongodb://localhost/testbd');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  name: String,
  password: Number
});

var User = mongoose.model('testcol', UserSchema);

//module.exports = User;
exports.User = User;

// MongoClient.connect('mongodb://localhost:27017/testbd', function(err, db){
//   if (err) {
//     throw err;
//   }
  
//     //var temp = {name: 'azaFSDFSDFza', desc: 'ADASDAS', phone: '5455555'};
//    // db.collection('c1').insert(temp);
//     db.collection('testcol').find().toArray(function(err, result) {
//     if (err) {
//       throw err;
//     }
//     console.log(result);
//   });
// });