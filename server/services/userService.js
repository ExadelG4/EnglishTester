var user = require('../db/mongo').user;
var q = require('q');
var jwt = require('jsonwebtoken');
var key = require('../config.json');

var expires = 7200;


function getAllUsers(){
	return user.find();
}
function getAllRole(role){
	return user.findRole(role);
}	
function addNewUser(email, pass, name){
	return user.add(email, pass, name);	
}
function addNewUser2(info){
	return user.save(info);
}
function authenticate(email, pass){
    var defer = q.defer();
	user.authenticate(email, pass).then(function(user){        
		if (!user) {           
            defer.reject();
        } else {
            user.comparePassword(pass, function(err, isMatch) {
                if (isMatch && !err) {

                    var token = jwt.sign(user, key.secret, {
                        expiresIn: expires 
                    });
                    
                    var refreshToken = jwt.sign(user, key.refreshsecret, {
                        expiresIn: expires 
                    });

                    // var now = new Date();

                    var now = new Date;
                    now.setSeconds(now.getSeconds() + expires);
                    var utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() , 
                    now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());

                    
                    
                    defer.resolve({ user:{id:user.id, name: user.name, email: user.email, role:user.role}, token: 'JWT ' + token, refreshToken: refreshToken, expiredTime: utc_timestamp});

                } else {
                     defer.reject();
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
module.exports.getAllRole = getAllRole;