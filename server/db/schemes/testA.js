var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TestAScheme = new Schema(
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
		answers: [{
			answer: String,
			valid: Boolean 
		}]

	});
	
var testA = mongoose.model('testA', TestAScheme);
module.exports = testA;
