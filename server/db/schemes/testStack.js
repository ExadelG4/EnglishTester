var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var stackScheme = new Schema(
	{
		data : Date,
		level : {
			type: Number,
			required: true
		},
		answers: [{esse: String,record: String, q1: String, q2: String, q3: String}]

	});
	
var stack = mongoose.model('stack', stackScheme);
module.exports = stack;
