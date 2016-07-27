var user = require('../db/mongo').user;
var stack = require('../db/mongo').stack;
var q = require('q');
var jwt = require('jsonwebtoken');
var key = require('../config.json');
var expires = require('../config.json').expires;
var stackService = require('./stackService');
var testService = require('./testService');



function getAllUsers(){
	return user.find({},{},{});
}
function getAllRole(_role){
	return user.find({role: _role},{'_id':1,'firstName': 1, 'lastName':1, 'email':1, 'number':1},{});
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
    user.findOne({email: email},{},{}).then(function(user_){                
        if (!user_) {           
            defer.reject();
        } else {
            user_.comparePassword(pass, function(err, isMatch) {
                if (isMatch && !err) {
                    var user = {};
                    user.email = user_.email;
                    user.number = user_.number;
                    user.role = user_.role;
                    user.password = user_.password;
                    user.firstName = user_.firstName;
                    user.lastName = user_.lastName;
                    user._id = user_._id;


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

                    if(user.role == 'guest'){
                        stackService.findOpenTests(user,{},{}).then(function(data){
                            if(data.length){
                                defer.resolve({ user : user, token: 'JWT ' + token, refreshToken: refreshToken, expiredTime: utc_timestamp});
                            }
                            else{
                                defer.reject();
                            }
                        }).catch(function(err){
                            defer.reject();
                        });
                    }else{
                        defer.resolve({ user : user, token: 'JWT ' + token, refreshToken: refreshToken, expiredTime: utc_timestamp});
                    }

                    

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

function find(query, fields, options){
    return user.find(query, fields, options);
}

function getUserStatus(_userId){
    var pr = q.defer();
    userInfo(_userId).then(function(data){
        stackService.findOpenTests({userId: _userId},{},{}).then(function(data){
            if(data.length != 0){
                
                pr.resolve('open');
            }                
            else 
                stackService.findRequest({userId: _userId},{},{}).then(function(data){
                    if(data.length != 0){
                        
                        pr.resolve('req');
                    }                         
                    else 
                        stackService.findStack({userId: _userId},{},{}).then(function(data){
                             if(data.length != 0){
                                    
                                    pr.resolve('stack'); 
                             }else {
                                 
                                 pr.resolve('free');
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

function getFinishedList(){
    var defer = q.defer();
    stackService.findStack({},{'userId': 1},{}).then(function (data) {
        var arrayId =[];
        data.forEach(function(element) {
            arrayId.push(element._doc.userId);
        });
        user.find({'_id': {$in:arrayId}},{'password': 0},{}).then(function (data_) {
            defer.resolve(data_);
        }).catch(function (err) {
            defer.reject(err);
        })
    }).catch(function (err) {
        defer.reject(err);
    });
    return defer.promise;
}

function update(query, update,options){
    return user.update(query, update,options);
}

function submit1(data, id){
    var defer = q.defer();

    stackService.checkFirstPart(data, id).then(function(level){
        testService.getSecondTest(level).then(function(data){
            defer.resolve(data);
        }).catch(function(err){
            defer.reject(err);
        })
    }).catch(function(err){
        defer.reject(err);
    })


    return defer.promise;
}

function submit2(data, uid){
    var defer = q.defer();

    stack.update({userId:uid},{ $set: { answers: data }},{}).then(function(data){
        defer.resolve(data);
    }).catch(function(err){
        defer.reject(err);
    })

    return defer.promise;
}

function updateStatus(id,_status){
   update({_id:id},{ $set: { status: _status }},{}).then(function(data){
                        console.log('user update')
                    }).catch(function(err){
                       console.log(err);
                    });
}


module.exports.getAllUsers = getAllUsers;
module.exports.addNewUser = addNewUser;
module.exports.addNewUsers = addNewUsers;
module.exports.authenticate = authenticate;
module.exports.removeCollection = removeCollection;
module.exports.getAllRole = getAllRole;
module.exports.userInfo = userInfo;
module.exports.getUserStatus = getUserStatus;
module.exports.find = find;
module.exports.getFinishedList = getFinishedList;
module.exports.submit1 = submit1;
module.exports.submit2 = submit2;
module.exports.update = update;
module.exports.updateStatus = updateStatus;