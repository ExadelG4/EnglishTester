var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var requestScheme = new Schema(
	{
		date : {
			type: Date,
			default: Date.now()
		},
		userId: String

	});
	
var request = mongoose.model('request', requestScheme);
module.exports = request;
