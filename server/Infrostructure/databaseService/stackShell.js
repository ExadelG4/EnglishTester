var q = require('q');

var DatabaseStackService = function (model){
    this.model = model;
}
DatabaseStackService.prototype.find = function(){
    var defer = q.defer();
    this.model.find({},function(err ,data){
        if(err) defer.reject(err);

        defer.resolve(data);

    });

    return defer.promise;
}

DatabaseStackService.prototype.remove = function(){
    var defer = q.defer();
    this.model.remove({},function(err){
        if(err) defer.reject(err);
        defer.resolve({message : "Collection removed"});

    });

   return defer.promise;
}
DatabaseStackService.prototype.findOne = function(info){
    var defer = q.defer();
    this.model.findOne({_id: info},function(err ,data){
        if(err) defer.reject(err);

        defer.resolve(data);

    });

    return defer.promise;
}
/*DatabasService.prototype.save = function(info){
    var defer = q.defer();
    var user = new  this.model({
    	email : info.email,
    	password: info.pass,
    	role : info.type,
        firstName : info.firstName,
        lastName : info.lastName
    });
    
    user.save(function(err){
        if(err) defer.reject(err);

        defer.resolve(info);

    });

    return defer.promise;
}
*/
module.exports = function(model){
    return new DatabaseStackService(model);
};