var q = require('q');
var stack = require('../services/stackService');
var userService = require('../services/userService');
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function getCounts(test,countL) {
    var defer = q.defer();  
    var i =0;
    var pr = test.count({ level: i+1 });
    (function c(){
        pr = pr.then(function(data){
            
            if(i < 5){
                countL.push(data);
                //console.log(data);
                i++;
                pr = test.count({ level: i+1 });
                c();
            }else{
                defer.resolve(countL);
            }      
        
        });
    })();
    return defer.promise;
}
function getTests(test, counts, user) {
    var defer = q.defer();
    var tests =[];
    var rand = getRandomArbitrary(0, counts[0]/5);
    var pr = test.find({level: 1},{},{skip : Math.floor(rand), limit : 1 });
    var i = 1;
    var j = 0;
    var len = counts.length;
    (function t(){
        pr = pr.then(function(data){            
            if(j < len){

                if(i < 5){
                    var edge = counts[j]/5;
                    if(data !==undefined){
                        var ans = [];
                        data[0].answers.forEach(function(element) {
                            ans.push(element);
                        });
                        user.answersAuto.push({_qId: data[0]._id, level:data[0].level, answer: ans});
                        delete data[0]._doc.answers;
                        tests.push(data[0]);                        
                       // console.log(data);
                    }
                   
                   
                    rand = getRandomArbitrary(i*edge, (i+1)*edge);
                    pr = test.find({level: j+1},{},{skip : Math.floor(rand), limit : 1 });
                    i++;
                    t();
                }else{
                    user.answersAuto.push({_qId: data[0]._id, level:data[0].level,answer: data[0].answers});

                    delete data[0]._doc.answers;
                    tests.push(data[0]);                    
                   // console.log(data);

                    j++;
                    i=0;
                    t();
                }
            }else{
                defer.resolve(tests);
            }      
        
        });
    })();



    return defer.promise;
}

function make(test , usr){
    var defer = q.defer();

    var user = {};

    user.userId = usr.userId;
    user.firstName = usr.firstName;
    user.lastName = usr.lastName;
    user.email = usr.email;
    user.answersAuto = [];

    var countL = [];
    var randArr = [];
    getCounts(test,countL).then(function(data) {
        getTests(test, data,user).then(function(data) {

            (function(user, next){
                stack.addStacks(user).then(function(data){
                    userService.update({_id:user.userId},{ $set: { status: 'stack' }}).then(function(data){
                        defer.resolve(next);
                    }).catch(function(err){
                        defer.reject(err);
                    });
                    
                }).catch(function(err){
                    defer.reject(err);
                });

            })(user, data);
            
        });
    }); 
    return defer.promise;
}

function makeAgain(test, level){
    var defer = q.defer();
    var tests =[];
    
    var i = 0;
    if(level === 0) {
        level = 1;
    }
    console.log(level);

    test.count({ level: level }).then(function(data){
        var rand = getRandomArbitrary(0, data/5);
        var pr = test.find({level: level},{},{skip : Math.floor(rand), limit : 1 });
        var edge = data/5;
        (function t(){
            pr = pr.then(function(data){ 
                    if(i < 5){                        
                        if(data !==undefined){
                            tests.push(data[0]);                        
                            //console.log(data);
                        } 
                        rand = getRandomArbitrary(i*edge, (i+1)*edge);
                        pr = test.find({level:level},{},{skip : Math.floor(rand), limit : 1 });
                        i++;
                        t();                    
                    }else{
                        defer.resolve(tests);
                    }    
            
            });
     })();

    }).catch(function(err){
        defer.reject(err);
    });

    return defer.promise;
}

module.exports.make = make;
module.exports.makeAgain = makeAgain;
