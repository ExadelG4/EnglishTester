var express = require('express');
var app = express();
var mongodb = require('./mongo');

function printall(req, res){    

    mongodb.User.find({}, function(err, users) {
    if (err) throw err; 

    res.send(JSON.stringify(users));   

    // console.log(JSON.stringify(users));
    });
}



exports.printall = printall;
