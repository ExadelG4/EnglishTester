var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema(
	{
		email: {
			type: String,
			lowercase: true,
			unique: true,
			dropDups: true,
			required: true
		},
		password: {
			type: String,
			required: true
  		},
		firstName:{
			type:String,
			required: true
		},
		lastName:{
			type:String,
			required: true
		},
		role: {
			type: String,
			required: true,
			enum: ['user', 'teacher', 'admin','guest'],
			default: 'guest'
		},
		number: {
			type: String,
			default: '+375291111111'
		},
		statistics : { 
			level: Number,
			tests: [{level: Number, autoMark: Number, teacherMark: Number, date: Date }],
			checkCount: Number
		},
		window: {
			startDate: Date,
			endDate: Date
		},
		status: {
			type: String,
			required: true,
			enum: ['free','want','process'],
			default: 'free'
		}

	});

	UserSchema.pre('save', function (next) {
		var user = this;
		if (this.isModified('password') || this.isNew) {
			bcrypt.genSalt(10, function (erruser, salt) {
				if (erruser) {
					return next(erruser);
				}
				bcrypt.hash(user.password, salt, null,function(err, hash) {
				if (err) {
					return next(err);
				}
				user.password = hash;
				next();
				});
			});
		} else {
		return next();
		}
	});

	UserSchema.methods.comparePassword = function(pw, cb) {
  		bcrypt.compare(pw, this.password, function(err, isMatch) {			  
			if (err) {
				return cb(err);
			}
			cb(null, isMatch);
  		});
	};

	
var user = mongoose.model('users', UserSchema);
module.exports = user;
