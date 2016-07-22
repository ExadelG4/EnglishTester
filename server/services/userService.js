var user = require('../db/mongo').user;
var q = require('q');
var jwt = require('jsonwebtoken');
var key = require('../config.json');
var expires = require('../config.json').expires;
var stackService = require('./stackService');


function getAllUsers(){
	return user.find({},{},{});
}
function getAllRole(_role){
	return user.find({role: _role},{'_id':1,'firstName': 1, 'lastName':1, 'email':1},{});
}	
function userInfo(id){
    return user.findOne({_id: id},{},{});
}
function addNewUser(info){
	return user.save(info);	
}
function addNewUsers(info){
    return user.create(info); 
}
function authenticate(email, pass){
    var defer = q.defer();
	// user.authenticate(email, pass).
    
    
        user.findOne({email: email},{},{}).then(function(user){        
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

function getUserStatus(_userId){
    var pr = q.defer();
    userInfo(_userId).then(function(data){
        stackService.findOpenTests({userId: _userId},{},{}).then(function(data){
            if(data.length != 0){
                console.log('User in openTests');
                pr.resolve('User in openTests');
            }                
            else 
                stackService.findRequest({userId: _userId},{},{}).then(function(data){
                    if(data.length != 0){
                        console.log('User in request');
                        pr.resolve('User in request');
                    }                         
                    else 
                        stackService.findStack({userId: _userId},{},{}).then(function(data){
                             if(data.length != 0){
                                    console.log('User in stack'); 
                                    pr.resolve('User in stack'); 
                             }else {
                                 console.log('User free!');
                                 pr.resolve('User free!');
                             }  
                        }).catch(function (err){
                            pr.reject(err);
                        });
                    }).catch(function (err) {
                        pr.reject(err);
                    });           
                }).catch(function (err) {
                    pr.reject(err);
                });                                     
    }).catch(function(err){
        console.log('User NOT FOUND');
        pr.reject(err);
    });

    return pr.promise;
    
}
module.exports.getAllUsers = getAllUsers;
module.exports.addNewUser = addNewUser;
module.exports.addNewUsers = addNewUsers;
module.exports.authenticate = authenticate;
module.exports.removeCollection = removeCollection;
module.exports.getAllRole = getAllRole;
module.exports.userInfo = userInfo;
module.exports.getUserStatus = getUserStatus;