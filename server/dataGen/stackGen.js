var mongo = require('../db/mongo');
var prompt = require('prompt');
var testService = require('../services/testService');
var userService = require('../services/userService');
var stackService = require('../services/stackService')
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
        
        userService.find({role: 'teacher'},{},{}).then(function (dataTeach) {
            teachers = dataTeach;
            

            for(var i =0; i<users.length;i++){
                    var id = users[i]._doc._id;
                    var firstName = users[i]._doc.firstName;
                    var lastName = users[i]._doc.lastName;
                    var email = users[i]._doc.email;

                    var tid = teachers[i%teachers.length]._doc._id;
                    var tfirstName = teachers[i%teachers.length]._doc.firstName;
                    var tlastName = teachers[i%teachers.length]._doc.lastName;
                    var temail = teachers[i%teachers.length]._doc.email;
                
                if(i<3){
                    
                    userService.updateStatus(id,'stack');
                    users[i] = {userId: id, teacherId: tid, firstName: firstName, lastName: lastName, email: email, teacherFirstName: tfirstName, teacherLastName: tlastName, teacherEmail: temail};
                }
                 if(i>=3 && i<6){
                    
                    userService.updateStatus(id,'req');
                    users[i] = {userId: users[i]._doc._id,firstName: firstName, lastName: lastName, email: email};
                }
                if(i >= 6 && i< 9){
                     userService.updateStatus(id,'res');
                    users[i] = {teacherId: tid,teacherEmail: temail,teacherFirstName: tfirstName, teacherLastName: tlastName,userId: users[i]._doc._id,firstName: firstName, lastName: lastName, email: email,result: {autoMark: 0,	teacherMark: 0,	level: 0}};
                }
                 if (i >=9){
                     
                     userService.updateStatus(id,'open');
                     var now = new Date();
                     now.setSeconds(now.getSeconds()+20000);
                
                    users[i] = {userId: users[i]._doc._id,firstName: firstName, lastName: lastName, email: email,dateStart: new Date().getTime() , dateEnd: now.getTime()};
                }}; 
            
            stackService.addStacks(users.slice(0, 3)).then(function (data) {
                console.log('stack filled');
                stackService.addRequests(users.slice(3, 6)).then(function (data) {
                    console.log('requests filled');
                    stackService.addResultArray(users.slice(6, 9)).then(function (data) {
                        console.log('results filled');
                        stackService.addOpenTestsArray(users.slice(9, users.length)).then(function (data) {
                            console.log('opentest filled');
                        }).catch(function(err){
                                console.log(' ERROR');
                        });
                    });
                });
            });
            
            
            
        });
        
        
        
    });
}

console.log('Default stackGen. Please, wait...');
stackService.removeStackCollection({}).then(function(data){
    stackService.removeRequestCollection({}).then(function(data){
        stackService.removeResultsCollection({}).then(function(data){
            stackService.removeOpenTestsCollection({}).then(function(data){
                  fillCollections(3,3,3,3);
            }).catch(function (err) {
                 console.log(err);
             });
        }).catch(function (err) {
                 console.log(err);
        });
    }).catch(function (err) {
                 console.log(err);
    }); 
}).catch(function (err) {
                 console.log(err);
             });

  

	
