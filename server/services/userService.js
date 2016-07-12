var user = require('../db/mongo').user;
var q = require('q');
var jwt = require('jsonwebtoken');
var key = require('../config.json');

function getAllUsers(){
	return user.find();
}

function addNewUser(email, pass, name){

	return user.add(email, pass, name);
	
}


function addNewUser(email, pass){
	return user.add(email, pass);

}
function addNewUser2(info){
	return user.save(info);
}
function authenticate(email, pass){
    var defer = q.defer();
	user.authenticate(email, pass).then(function(user){        
		if (!user) {           
            defer.resolve({ success: false, message: 'Authentication failed. User not found.' });
        } else {
            user.comparePassword(pass, function(err, isMatch) {
                if (isMatch && !err) {

                    var token = jwt.sign(user, key.secret, {
                        expiresIn: 10080 // in seconds
                    });
                    
                    var refreshToken = jwt.sign(user, key.refreshsecret, {
                        expiresIn: 10080 // in seconds
                    });
                    defer.resolve({ user:{id:user.id, name: user.name, email: user.email, role:user.role}, token: 'JWT ' + token, refreshToken: 'JWT ' + refreshToken});
                } else {
                     defer.resolve({ success: false, message: 'Authentication failed. Passwords did not match.' });
                }
            });
        }
	}).catch(function(err){
		defer.reject(err);
	});

    return defer.promise;
}


function removeCollection(){
	return user.remove();
}

module.exports.getAllUsers = getAllUsers;
module.exports.addNewUser = addNewUser;
module.exports.authenticate = authenticate;
module.exports.removeCollection = removeCollection;
module.exports.addNewUser2 = addNewUser2;
