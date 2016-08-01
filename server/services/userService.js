var user = require('../db/mongo').user;
var stack = require('../db/mongo').stack;
var testB = require('../db/mongo').testB;
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

                    //console.log(user.role == 'guest');
                    if(user.role == 'guest'){
                        stackService.findOpenTests({userId: user._id},{},{}).then(function(data){
                           // console.log(data);
                            if(data.length){
                                defer.resolve({ user : user, token: 'JWT ' + token, refreshToken: refreshToken, expiredTime: utc_timestamp});
                              //  console.log(data);
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
function removeCollection(query){
	return user.remove(query);
}

function find(query, fields, options){
    return user.find(query, fields, options);
}

function getUserStatus(_userId){
    var pr = q.defer();
    userInfo(_userId).then(function(data){
        stackService.findOneOpenTests({userId: _userId},{},{}).then(function(data){
            if(data){
                var now = new Date().getTime();
                if(now >= data.dateStart && now<= data.dateEnd){
                    pr.resolve({status:'open',dateStart: data.dateStart, dateEnd: data.dateEnd });
                 }
                else {

                    stackService.removeOpenTestsCollection({userId: _userId}).then(function(data){
                        updateStatus(_userId,'free');
                        pr.resolve({status:'free'});

                    }).catch(function(err){
                        pr.reject(err);
                    });
                    
                 }
            }                
            else 
                stackService.findRequest({userId: _userId},{},{}).then(function(data){
                    if(data.length != 0){
                        
                        pr.resolve({status: 'req'});
                    }                         
                    else 
                        stackService.findStack({userId: _userId},{},{}).then(function(data){
                             if(data.length != 0){
                                    
                                    pr.resolve({status:'stack'}); 
                             }else {
                                 
                                 pr.resolve({status:'free'});
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

    data.array.forEach(function(element) {
        if(element.badForUser){
            testB.update({_id:element.qId},{ $set: { complaint: true }},{});
        }
    });

    stack.update({userId:uid},{ $set: { answers: data }},{}).then(function(data){
        defer.resolve(data);
    }).catch(function(err){
        defer.reject(err);
    })

    return defer.promise;
}

function updateStatus(id,_status){
   update({_id:id},{ $set: { status: _status }},{}).then(function(data){
                  //      console.log('user update')
                    }).catch(function(err){
                    //   console.log(err);
                    });
}

function userStatistics(id){
var pr = q.defer();
    user.findOne({_id: id},{'_id':0,'firstName': 1, 'lastName':1, 'email':1, 'number':1, 'role':1, 'status':1},{}).then(function(data){
        if (data){
            if(data.role == 'admin'){
             
                pr.resolve(data);
            }
            else if(data.role == 'user' || data.role == 'guest'){
                stackService.findOneResults({userId:id},{'_id':0,'result':1,'teacherId':1,'date':1,'teacherFirstName': 1,'teacherLastName': 1},{}).then(function(data2){
                        var userInfo ={};
                        userInfo.firstName = data.firstName;
                        userInfo.lastName = data.lastName;
                        userInfo.email = data.email;
                        userInfo.number = data.number;
                        userInfo.role = data.role;
                        userInfo.status = data.status;
                    if(data2){
                        userInfo.result = data2.result;
                        userInfo.teacherId = data2.teacherId;
                        userInfo.date = data2.date;
                        userInfo.teacherLastName = data2.teacherLastName;
                        userInfo.teacherFirstName = data2.teacherFirstName;
                
                        pr.resolve(userInfo);
                    }
                    else pr.resolve(data);
                }).catch(function(err){
                    pr.reject(err);
                });
            }
        }
        else {
            pr.resolve('user not found');
        }

    }).catch(function(err){
        pr.reject('Bad data :(');
    });
    return pr.promise;
}

function getTeacherStatus(_tId){
    var pr = q.defer();
    userInfo(_tId).then(function(data){
        if(data){
            stackService.resultsCount({teacherId:_tId}).then(function(data){
                    console.log(data);
                    stackService.stackCount({teacherId:_tId}).then(function(data2){
                        pr.resolve({totalTests: data, assignTest: data2})
                    }).catch(function(err){
                        pr.reject(err);
                    });
            }).catch(function(err){
                pr.reject(err);
            });
        }
        else{
             pr.reject('teacher not found');
        }
                                 
    }).catch(function(err){
        console.log('bad teacher id');
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
module.exports.find = find;
module.exports.getFinishedList = getFinishedList;
module.exports.submit1 = submit1;
module.exports.submit2 = submit2;
module.exports.update = update;
module.exports.updateStatus = updateStatus;
module.exports.userStatistics = userStatistics;
module.exports.getTeacherStatus = getTeacherStatus;