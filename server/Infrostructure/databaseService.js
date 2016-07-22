var q = require('q');
var jwt = require('jsonwebtoken');
var key = require('../config.json');

var DatabasService = function (model){
    this.model = model;
}
DatabasService.prototype.find = function(query, fields, options){
    var defer = q.defer();
    this.model.find(query, fields, options,function(err ,data){
        if(err) defer.reject(err);
        defer.resolve(data);

    });
    return defer.promise;
}
DatabasService.prototype.findById = function(id, fields, options){
    var defer = q.defer();
    this.model.findById(id, fields, options,function(err ,data){
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
DatabasService.prototype.save = function(query){
    var defer = q.defer();
    var doc = new  this.model(query);
    doc.save(function(err){
        if(err) defer.reject(err);
        defer.resolve();
    });

    return defer.promise;
}
DatabasService.prototype.create = function(query){
    var defer = q.defer();
    ;
    this.model.create(query,function(err){
        if(err) defer.reject(err);
        defer.resolve();
    });

    return defer.promise;
}
DatabasService.prototype.findOne = function(query, fields, options){
    var defer = q.defer();
    this.model.findOne(query, fields, options,function(err ,data){
        if(err) defer.reject(err);
        defer.resolve(data);

    });

    return defer.promise;
}
// DatabasService.prototype.authenticate = function (email_, password_) {
//     var defer = q.defer();
//     this.model.findOne({
//     email: email_
//     }, function(err, user) {
//         if (err) defer.reject(err);

//         defer.resolve(user);
//     });
//     return defer.promise;
// }



DatabasService.prototype.count = function (query) {
    var defer = q.defer();
    this.model.count(query, function(err ,data){
        if(err) defer.reject(err);
        defer.resolve(data);
    });
    return defer.promise;
}

module.exports = function(model){
    return new DatabasService(model);
};