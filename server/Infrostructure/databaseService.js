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

module.exports = function(model){
    return new DatabasService(model);
};