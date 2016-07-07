
var mongoose = require('mongoose');
var user = require('./schemes/user');
var path = require('../config.json')
mongoose.connect(path.dbPath);
module.exports.user = user;
	