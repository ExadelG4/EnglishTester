var key = require('../config.json');
var q = require('q');
var jwt = require('jsonwebtoken');

// var moment = require( 'moment' );

var expires = require('../config.json').expires;;


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

            var now = new Date;
            now.setSeconds(now.getSeconds() + expires);
            var utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() , 
            now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());


        defer.resolve({token: 'JWT ' + newtoken, refreshToken: 'JWT ' + newtokenrefresh, expiredTime:  utc_timestamp});
  
        }
        
    });

    return defer.promise;
}

exports.refresh = refresh;