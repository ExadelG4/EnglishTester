var express = require('express');
var app = express();
var mongodb = require('./mongo');

function printall(){
    mongodb.find({}, function(err, users) {
    if (err) throw err;

    console.log(users);
    });
}

exports.printall = printall;
