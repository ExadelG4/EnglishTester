var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var requestScheme = new Schema(
	{
		data : Date,
		userId: String

	});
	
var request = mongoose.model('request', requestScheme);
module.exports = request;
