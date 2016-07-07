var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema(
	{
  		_id: String,
  		name: String,
  		pass: String
	});
	
var user = mongoose.model('users', UserSchema);
module.exports = user;