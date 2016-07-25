var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var stackScheme = new Schema(
	{
		date : {
			type: Number,
			default: Date.now()
		},
		
		level : Number,
		userId: String,
		firstName: String,
		lastName: String,
		email: String,

		answersAuto: [{_qId: String, answer: []}],
		answers: [{_id: String, answer: String }],
		
		teacherId: {
			type: String,
			default: 'none'
		},
		teacherFirstName: String,
		teacherLastName: String,
		teacherEmail: String,

	});
	
var stack = mongoose.model('stack', stackScheme);
module.exports = stack;
