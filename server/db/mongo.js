
var mongoose = require('mongoose');
var infrostructure = require('../Infrostructure/databaseService/userShell');
var infrostructureTest = require('../Infrostructure/databaseService/testShell');
var infrostructureStack = require('../Infrostructure/databaseService/stackShell');
var path = require('../config.json')
var user = require('./schemes/user');
var testA = require('./schemes/testA');
var testB = require('./schemes/testB');
var stack = require('./schemes/testStack');

mongoose.connect(path.dbPath);

exports.user = infrostructure(user);
exports.testA  = infrostructureTest(testA);
exports.testB = infrostructureTest(testB);
exports.stack = infrostructureStack(stack);


	