var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TestBScheme = new Schema(
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
		}
	});
	
var testB = mongoose.model('testB', TestBScheme);
module.exports = testB;
