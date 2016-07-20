
var mongoose = require('mongoose');
var infrostructure = require('../Infrostructure/databaseService');
var path = require('../config.json')
var user = require('./schemes/user');
var testA = require('./schemes/testA');
var testB = require('./schemes/testB');
var stack = require('./schemes/testStack');

mongoose.connect(path.dbPath);

exports.user = infrostructure(user);
exports.testA  = infrostructure(testA);
exports.testB = infrostructure(testB);
exports.stack = infrostructure(stack);


	