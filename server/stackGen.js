var mongo = require('./db/mongo');
var prompt = require('prompt');
var testService = require('./services/testService');
var userService = require('./services/userService');
var stackService = require('./services/stackService')
var bodyParser = require('body-parser');
var q = require('q');

var fillStack = function (num, skip) {
    var i = 0;
    var res = [];
    var pr = userService.find({role: 'user'},{},{skip : skip, limit : num }); 

    
}

var fillCollections = function () {
    // fillStack(3, 0);
    var users = [];
    var teachers = [];
    userService.find({role: 'user'},{},{ limit : 12 }).then(function (data) {
        users = data;
        userService.find({role: 'user'},{},{ limit : 12 }).then(function (data) {
            teachers = data;
            for(var i =0; i<users.length;i++){
                if(i<3){
                    var id = users[i]._doc._id;
                    var tid = teachers[i]._doc._id;
                    users[i] = {userId: id, teacherId: tid};
                }else if(i<6){
                    users[i] = {userId: users[i]._doc._id};
                }else if(i< 9){
                    users[i] = {userId: users[i]._doc._id,result: {autoMark: 0,	teacherMark: 0,	level: 0}};
                }else{
                    users[i] = {userId: users[i]._doc._id,startDate: new Date() , endDate: new  Date()};
                }
            }
            stackService.addStacks(users.slice(0, 3)).then(function (data) {
                console.log('stack filled');
                stackService.addRequests(users.slice(3, 6)).then(function (data) {
                    console.log('requests filled');
                    stackService.addResultArray(users.slice(6, 9)).then(function (data) {
                        console.log('results filled');
                        stackService.addOpenTestsArray(users.slice(9, users.length)).then(function (data) {
                            console.log('opentest filled');
                        });
                    });
                });
            });
            
            
            
        });
        // var stackData = data.slise(0, 3);
        // var resData = data.slise(3, 6);
        // var reqData = data.slise(6, 9);
        // var openData = data.slise(9, 12);
        
        
    });
}

console.log('Default testGen. Please, wait...');
testService.removeCollection().then(function(data){
    fillCollections(3,3,3,3);
}).catch(function (err) {
    console.log(err);
});
	
