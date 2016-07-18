
var mongoose = require('mongoose');
var infrostructure = require('../Infrostructure/databaseService');
var infrostructureTest = require('../Infrostructure/databaseTestService');
var path = require('../config.json')
var user = require('./schemes/user');
var testA = require('./schemes/testA');
var testB = require('./schemes/testB');
var testC = require('./schemes/testC');

mongoose.connect(path.dbPath);

exports.user = infrostructure(user);
exports.testA  = infrostructureTest(testA);
exports.testB = infrostructureTest(testB);
exports.testC = infrostructureTest(testC);

	