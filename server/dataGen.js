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
		// console.log(data);
	  }).catch(function (err) {
		 console.log(err);
	});

	for(i =0; i<result.Admin; i++){
		service.addNewUser2({
								email: "admin"+(i+1)+"@exadel.com", 
							  	pass: "apass"+(i+1),
							  	type: "Admin",
							  	name: "admin"+(i+1)
							  					}).then(function(data){
			//	console.log("Add" + data);
			}).catch(function(err){
				console.log(err);
			});

	}
	for(i =0; i<result.User; i++){
		service.addNewUser2({
								email: "user"+(i+1)+"@exadel.com", 
							  	pass: "upass"+(i+1),
							  	type: "User",
							  	name: "user"+(i+1)
							  					}).then(function(data){
			//	console.log("Add" + data);
			}).catch(function(err){
				console.log(err);
			});

	}
	for(i =0; i<result.Teacher; i++){
		service.addNewUser2({
								email: "teacher"+(i+1)+"@exadel.com", 
							  	pass: "tpass"+(i+1),
							  	type: "Teacher",
							  	name: "teacher"+(i+1)
							  					}).then(function(data){
			//	console.log("Add" + data);
			}).catch(function(err){
				console.log(err);
			});

	}
	for(i =0; i<result.Guest; i++){
		service.addNewUser2({
								email: "guest"+(i+1)+"@gmail.com", 
							  	pass: "gpass"+(i+1),
							  	type: "Guest",
							  	name: "guest"+(i+1)
							  					}).then(function(data){
			//	console.log("Add" + data);
			}).catch(function(err){
				console.log(err);
			});

	}
});

