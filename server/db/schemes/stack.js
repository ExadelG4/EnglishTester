var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var stackScheme = new Schema(
	{
		data : Date,
		level : Number,
		userId: String,
		answers: [{_id: String, answer: String }]

	});
	
var stack = mongoose.model('stack', stackScheme);
module.exports = stack;
