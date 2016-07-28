var express = require('express');
var contracts = require('../contracts');
var service = require('../../services/userService');
var stackService = require('../../services/stackService');
var testService = require('../../services/testService');
var path = require("path");
var router = express.Router();


var passport = require('passport');
var jwt = require('jsonwebtoken');
var key = require('../../config.json');


router.use(passport.initialize());
require('../../passport')(passport);

router.post('/register',function(req, res) {
	if(!req.body.email || !req.body.password) {
    	res.json({ success: false, message: 'Please enter email and password.' });
  	} else {
  		var info ={
  			email : req.body.email,
  			password: req.body.password,
  			firstName: req.body.firstName,
  			lastName: req.body.secondName,
  			role: 'guest',
  			status: 'open',
  			fullName : req.body.firstName +' '+ req.body.secondName
  		};
  		var guestOpen = {
  			
			firstName: req.body.firstName,
			lastName: req.body.secondName,
			email: req.body.email,
			dateStart: req.body.dateStart,
			dateEnd : req.body.dateEnd
  		};
		service.addNewUser(info).then(function(data){
				res.json(data);
				
				guestOpen.userId = data._id;
				stackService.addOpenTests(guestOpen).then(function(data){
					
				}).catch(function(err){
					console.log("guest is not in openTests");
				});
		}).catch(function(err){
			res.status(400).send("Bad Request");
		});

  }

});

router.post('/assignStudents',function(req, res) {
	 if(!req.body.students){
	 	res.json({ success: false, message: 'Please enter email and password.' });
	 } 
	 else{
	  		var tempArr = [];


	  		console.log(req.body.students);
	  		stackService.addOpenTestsArray(req.body.students).then(function(data){
			  res.send('add');			  
				
		  }).catch(function (err) {
			  res.status(401).send("error");
		  });

  }

});

router.post('/addQuestion',function(req, res) {
	
	 if(!req.body.finalQue){
	 	res.json({ success: false, message: 'Please, input correct data.' });
	 } 
	 else{
	 		if(!req.body.finalQue.options){
	 			testService.addNewQuestionB(req.body.finalQue).then(function(data){
					  res.send('ok');
					 }).catch(function (err) {
					   res.status(406).send("Not Acceptable");
				 	 });
	 		}
	  		else{
	  		
			  		testService.addNewQuestion(req.body.finalQue).then(function(data){
					  res.send('ok');
					 }).catch(function (err) {
					  res.status(406).send("Not Acceptable");
				 	 });
		  }
  }

});

router.post('/assignTeacher',function (req, res) {
	if(!req.body.userId||!req.body.teacherId||req.body.userId===undefined||req.body.teacherId===undefined){
	 	res.status(400).send("Bad Request");
	 } 
	 else{
	  		stackService.assignTeacher(req.body).then(function(data){
			  res.send('ok');
		  }).catch(function (err) {
			  res.status(400).send("Bad Request");
		  });

  }
});

router.post('/submit1', passport.authenticate('jwt', { session: false }), function(req,res){
	console.log('start');
	service.submit1(req.body, req.user._id).then(function(data){
		res.json(data);
	}).catch(function(err){
		res.send(err);
	});
});

router.post('/submit2', passport.authenticate('jwt', { session: false }), function(req,res){
	service.submit2(req.body, req.user._id).then(function(data){
		res.send();
	}).catch(function(err){
		res.status(400).send(err);
	});
});

router.get('/getAll',passport.authenticate('jwt', { session: false }), function(req, res) {
	
  		service.getAllUsers().then(function(data){
			  res.send(JSON.stringify(data));
		  }).catch(function (err) {
			  res.send(JSON.stringify(err));
		  });

});
router.get('/getUsers', function(req, res) {

  		service.getAllRole('user').then(function(data){
			  res.send(JSON.stringify(data));
		  }).catch(function (err) {
			  res.send(JSON.stringify(err));
		  });

});
router.get('/getTeachers', function(req, res) {
  		service.getAllRole('teacher').then(function(data){
			  res.send(JSON.stringify(data));
		  }).catch(function (err) {
			  res.send(JSON.stringify(err));
		  });

});

router.get('/getFinishedUsers', function(req, res){
	service.getFinishedList().then(function (data) {
		res.json(data);
	}).catch(function (err) {
		res.json(err);
	})
});

router.get('/getUsersRequests', function(req, res){
	stackService.findRequest({},{},{}).then(function(data){
			  res.send(JSON.stringify(data));
		  }).catch(function (err) {
			  res.send(JSON.stringify(err));
		  });

});

router.get('/getFreeUsers', function(req, res){
	
	service.find({status: 'free', $or:[{'role': 'guest'},{'role': 'user'}]},{'_id':1,'firstName': 1, 'lastName':1, 'email':1, 'number':1, 'role':1},{}).then(function(data){
			  res.send(JSON.stringify(data));
		  }).catch(function (err) {
			  res.send(JSON.stringify(err));
		  });
});
router.get('/getResults', function(req, res){
	
	stackService.findResults({},{},{}).then(function(data){
			  res.send(JSON.stringify(data));
		  }).catch(function (err) {
			  res.send(JSON.stringify(err));
		  });
});

router.post('/getFromReg',function(req, res) {
	//console.log(req.body)
	//console.log(req.body.name)
	 if(!req.body){
	 	res.json({ success: false, message: 'Please enter correct regex' });
	 } 
	
	 else{
	  		var a = req.body.name;
	  		var b = a;
	  		var c = b.replace(/(\.|\\|\+|\*|\?|\[|\^|\]|\$|\(|\)|\{|\}|\=|\!|\<|\>|\||\:|\-)/g, '\\$1');
	  		console.log(c);
	  		service.find({fullName : new RegExp(c, "i") },{'_id':1,'firstName': 1, 'lastName':1, 'email':1},{}).then(function(data){
			res.send(data);

		  }).catch(function (err) {
			  res.status(401).send("error");
		  });

  }

});

module.exports = router;
