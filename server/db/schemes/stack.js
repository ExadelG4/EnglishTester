var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var stackScheme = new Schema(
	{
		date : {
			type: Date,
			default: Date.now()
		},
		level : Number,
		userId: String,
		answersAuto: [{_qId: String, answer: []}],
		answers: [{_id: String, answer: String }],
		teacherId: {
			type: String,
			default: 'none'
		}

	});
	
var stack = mongoose.model('stack', stackScheme);
module.exports = stack;
