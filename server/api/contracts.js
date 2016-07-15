var key = require('../config.json');
var q = require('q');
var jwt = require('jsonwebtoken');

var expires = 7200;


function refresh(token){
    var defer = q.defer();

    jwt.verify(token, key.refreshsecret, function(err, decoded) {
        if(err) defer.reject(err);
        else{
            // var newtoken = jwt.sign(decoded, key.secret);
            // var newtokenrefresh = jwt.sign(decoded, key.refreshsecret);

            var newtoken = jwt.sign(decoded._doc, key.secret,{
                        expiresIn: expires 
                    });
            var newtokenrefresh = jwt.sign(decoded._doc, key.refreshsecret,{
                        expiresIn: expires 
                    });

            var now = new Date();
           // now.setMilliseconds(decoded.iat);
            now.setSeconds(now.getSeconds() + expires);


        defer.resolve({token: 'JWT ' + newtoken, refreshToken: 'JWT ' + newtokenrefresh, expiredTime: now});
  
        }
        
    });

    return defer.promise;
}

exports.refresh = refresh;