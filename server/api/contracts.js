var key = require('../config.json');
var q = require('q');
var jwt = require('jsonwebtoken');

function refresh(token){
    var defer = q.defer();

    jwt.verify(token, key.refreshsecret, function(err, decoded) {
        if(err) defer.reject(err);
        else{
            var newtoken = jwt.sign(decoded, key.secret);
            var newtokenrefresh = jwt.sign(decoded, key.refreshsecret);

        defer.resolve({token: 'JWT ' + newtoken, refreshToken: 'JWT ' + newtokenrefresh});
  
        }
        
    });

    return defer.promise;
}

exports.refresh = refresh;