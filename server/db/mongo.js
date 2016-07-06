var mongoose = require('mongoose');
var user = require('./schemes/user');

mongoose.connect('mongodb://localhost:27017/test');

module.exports = {
	user: user
};	
	