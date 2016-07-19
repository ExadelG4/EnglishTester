var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TestCScheme = new Schema(
	{
		_id: {
			type: Number,
			unique: true,
			required: true
		},
		type: {
			type: String,
			required: true
  		},
		dif:{
			type:String,
			required: true
		},
		question:{
			type:String,
			required: true
		},
		right: {
			type: String,
			required: true
		}
	});
	
var testC = mongoose.model('testC', TestCScheme);
module.exports = testC;
