var mongo = require('./db/mongo');
var prompt = require('prompt');
var service = require('./services/userService');
var bodyParser = require('body-parser');
prompt.start();
console.log("Input numbers of roles: ")
prompt.get(['Admin', 'User','Teacher','Guest'], function (err, result) {
   console.log('Nubers of roles:');
   console.log(' Admin: ' + result.Admin);
   console.log(' User: ' + result.User);
   console.log(' Teacher: ' + result.Teacher);
   console.log(' Guest: ' + result.Guest);
  
   service.removeCollection().then(function(data){
	  }).catch(function (err) {
		 console.log(err);
	});
	var addUser = function(_name,_pass,_type,count){
			for(i =0; i<count; i++){
			service.addNewUser2({
									email: _name+(i+1)+"@exadel.com", 
								  	pass: _pass+(i+1),
								  	type: _type,
								  	name: _name+(i+1)
								  					}).then(function(data){
			
				}).catch(function(err){
					console.log(err);
				});

			}
	}
	addUser("admin","apass","Admin",result.Admin);
	addUser("user","upass","User",result.User);
	addUser("teacher","tpass","Teacher",result.Teacher);
	addUser("guest","gpass","Guest",result.Guest);
	
});

