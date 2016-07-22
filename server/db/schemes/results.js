var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var resultsScheme = new Schema(
	{
		date : {
			type: Date,
			default: Date.now()
		},
		userId: String,
		result: {
			autoMark: Number,
			teacherMark: Number,
			level: Number
		}

	});
	
var results = mongoose.model('results', resultsScheme);
module.exports = results;
