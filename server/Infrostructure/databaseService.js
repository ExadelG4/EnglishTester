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

DatabasService.prototype.add = function(email_, password_){
    var defer = q.defer();
    var newUser = new this.model({
        email: email_,
        password: password_
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

DatabasService.prototype.authenticate = function (email_, password_) {
    var defer = q.defer();
    this.model.findOne({
    email: email_
    }, function(err, user) {
        if (err) defer.reject(err);
        
        if (!user) {
            defer.resolve({ success: false, message: 'Authentication failed. User not found.' });
        } else {
            user.comparePassword(password_, function(err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign(user, key.secret, {
                        expiresIn: 10080 // in seconds
                        });
                        defer.resolve({ success: true, token: 'JWT ' + token });
                } else {
                    defer.resolve({ success: false, message: 'Authentication failed. Passwords did not match.' });
                }
            });
        }
    });
    return defer.promise;
}

module.exports = function(model){
    return new DatabasService(model);
};