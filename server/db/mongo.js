
var mongoose = require('mongoose');
var infrostructure = require('../Infrostructure/databaseService/userShell');
var infrostructureTest = require('../Infrostructure/databaseService/testShell');
var path = require('../config.json')
var user = require('./schemes/user');
var testA = require('./schemes/testA');
var testB = require('./schemes/testB');

mongoose.connect(path.dbPath);

exports.user = infrostructure(user);
exports.testA  = infrostructureTest(testA);
exports.testB = infrostructureTest(testB);


	