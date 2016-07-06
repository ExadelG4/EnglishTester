var express = require('express');
var app = express();
var MongoClient = require("mongodb").MongoClient;
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testbd');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  _id: String,
  name: String,
  password: Number
});

var User = mongoose.model('testcol', UserSchema);


// module.exports = User;
exports.User = User;