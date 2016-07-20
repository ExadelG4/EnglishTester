var q = require('q');
var jwt = require('jsonwebtoken');
var key = require('../config.json');

var DatabasService = function (model){
    this.model = model;
}
DatabasService.prototype.find = function(){
    var defer = q.defer();
    this.model.find({},function(err ,data){
        if(err) defer.reject(err);

        defer.resolve(data);

    });

    return defer.promise;
}
DatabasService.prototype.findRole = function(){
    var defer = q.defer();
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];
    }
    this.model.find(arguments[0],arguments[1],function(err ,data){
        if(err) defer.reject(err);

        defer.resolve(data);

    });

    return defer.promise;
}
DatabasService.prototype.remove = function(){
    var defer = q.defer();
    this.model.remove({},function(err){
        if(err) defer.reject(err);
        defer.resolve({message : "Collection removed"});

    });

   return defer.promise;
}
DatabasService.prototype.findOne = function(info){
    var defer = q.defer();
    this.model.findOne({email: info},function(err ,data){
        if(err) defer.reject(err);

        defer.resolve(data);

    });

    return defer.promise;
}
DatabasService.prototype.save = function(){
    var defer = q.defer();
    var doc = new  this.model(arguments[0]);
    doc.save(function(err){
        if(err) defer.reject(err);
        defer.resolve();
    });

    return defer.promise;
}

<<<<<<< HEAD:server/Infrostructure/databaseService.js
=======

DatabasService.prototype.add = function(email_, password_,name_, secname_){
    var defer = q.defer();
    var newUser = new this.model({
        email: email_,
        password: password_,
        firstName: name_,
        lastName: secname_
        });

        // Attempt to save the user
        newUser.save(function(err) {
            if (err) {
                defer.reject({ success: false, message: 'That email address already exists.'});
            }
            defer.resolve({ success: true, message: 'Successfully created new user.' });
        });
    return defer.promise;
}

>>>>>>> develop:server/Infrostructure/databaseService/userShell.js
DatabasService.prototype.authenticate = function (email_, password_) {
    var defer = q.defer();
    this.model.findOne({
    email: email_
    }, function(err, user) {
        if (err) defer.reject(err);

        defer.resolve(user);
        
        // if (!user) {
        //     defer.resolve({ success: false, message: 'Authentication failed. User not found.' });
        // } else {
        //     user.comparePassword(password_, function(err, isMatch) {
        //         if (isMatch && !err) {
        //             var token = jwt.sign(user, key.secret, {
        //                 expiresIn: 10080 // in seconds
        //                 });
        //                 defer.resolve({ id:user.id, name: user.name, email: user.email, role:user.role, token: 'JWT ' + token });
        //         } else {
        //             defer.resolve({ success: false, message: 'Authentication failed. Passwords did not match.' });
        //         }user
        //     });user
        // }
    });
    return defer.promise;
}

module.exports = function(model){
    return new DatabasService(model);
};