var q = require('q');


function make(test){
    var defer = q.defer();
    var countL1 = test.count({ level:1 });


    return defer.promise;
}


module.exports.make = make;