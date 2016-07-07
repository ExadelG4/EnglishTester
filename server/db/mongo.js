
var mongoose = require('mongoose');
var infrostructure = require('../Infrostructure/databaseService');
var path = require('../config.json')
var user = require('./schemes/user');

mongoose.connect(path.dbPath);

exports.user = infrostructure(user);


	