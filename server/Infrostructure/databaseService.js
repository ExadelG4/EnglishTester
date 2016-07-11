var q = require('q');

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
DatabasService.prototype.findOne = function(info){
    var defer = q.defer();
    this.model.findOne({email: info},function(err ,data){
        if(err) defer.reject(err);

        defer.resolve(data);

    });

    return defer.promise;
}
DatabasService.prototype.save = function(info){
    var defer = q.defer();
    var user = new  this.model({
    	name : info.name,
    	pass : info.pass,
    	type : info.type
    });
    
    user.save(function(err){
        if(err) defer.reject(err);

        defer.resolve(data);

    });

    return defer.promise;
}


module.exports = function(model){
    return new DatabasService(model);
};