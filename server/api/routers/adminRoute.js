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



router.post('/register',contracts.adminRegister,function(req, res) {	
  		var info ={
  			email : req.body.email,
  			password: req.body.password,
  			firstName: req.body.firstName,
  			lastName: req.body.secondName,
  			role: 'guest',
  			status: 'open',
  			fullName : req.body.firstName +' '+ req.body.secondName +' '+req.body.email
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
					//console.log("guest is not in openTests");
				});
		}).catch(function(err){
			res.status(400).send("Bad Request");
		});

});

router.post('/assignStudents',contracts.assignStudent,function(req, res) {	 
	 		var stud = req.body.students;
	 		service.assignStudents(stud).then(function(data){
	 			res.send('add');
	 		}).catch(function(err){
	 			res.status(401).send(err);
	 		});	
	  		
});

router.post('/addQuestion',contracts.addQuestion,function(req, res) {
	if (!req.body.finalQue.options) {

		testService.addNewQuestionB(req.body.finalQue).then(function (data) {
			res.send('ok');
		}).catch(function (err) {
			res.status(406).send("Not Acceptable");
		});
	}
	else {
		testService.addNewQuestion(req.body.finalQue).then(function (data) {
			res.send('ok');
		}).catch(function (err) {
			res.status(406).send("Not Acceptable");
		});
	}
});

router.post('/assignTeacher', contracts.assignTeacher, function (req, res) {
	stackService.assignTeacher(req.body).then(function (data) {
		res.send('ok');
	}).catch(function (err) {
		res.status(400).send("Bad Request");
	});
});

router.get('/getTeachers', function(req, res) {
  		
  		service.getTeachers().then(function(data){
			  res.send(JSON.stringify(data));
		  }).catch(function (err) {
			  res.send(JSON.stringify(err));
		  });
});

router.get('/getFinishedUsers', function(req, res){
	service.getFinishedList({'pasword':0}).then(function (data) {
		res.json(data);
	}).catch(function (err) {
		
		res.json(err);
	})
});
router.get('/getFinishedUsersNames', function(req, res){
	service.getFinishedList({'_id':0,'firstName': 1, 'lastName':1}).then(function (data) {
		res.json(data);
	}).catch(function (err) {
		
		res.json(err);
	})
});

router.get('/getUsersRequests', function(req, res){
	service.find({status: 'req', $or:[{'role': 'guest'},{'role': 'user'}]},{'_id':1,'firstName': 1, 'lastName':1, 'email':1, 'number':1, 'role':1},{}).then(function(data){
			  res.send(JSON.stringify(data));
		  }).catch(function (err) {
			  res.send(JSON.stringify(err));
		  });

});
router.get('/getUsersRequestsNames', function(req, res){
	service.find({status: 'req', $or:[{'role': 'guest'},{'role': 'user'}]},{'_id':0,'firstName': 1, 'lastName':1},{}).then(function(data){
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
router.get('/getResultsNames', function(req, res){
	
	stackService.findResults({},{'_id':0,'firstName':1,'lastName':1},{}).then(function(data){
			  res.send(JSON.stringify(data));
		  }).catch(function (err) {
			  res.send(JSON.stringify(err));
		  });
})
router.post('/getFromReg',contracts.getFromReg,function(req, res) {
	 
	var a = req.body.name;
	var b = a;
	var c = b.replace(/(\.|\\|\+|\*|\?|\[|\^|\]|\$|\(|\)|\{|\}|\=|\!|\<|\>|\||\:|\-)/g, '\\$1');
	service.find({ fullName: new RegExp(c, "i") }, { '_id': 1, 'firstName': 1, 'lastName': 1, 'email': 1 }, {}).then(function (data) {
		res.send(data);
	}).catch(function (err) {
		res.status(401).send("error");
	});

});
router.post('/showStatistics',contracts.showStstistics,function (req, res) {
	service.userStatistics(req.body.id).then(function (data) {
		res.send(data);
	}).catch(function (err) {
		res.status(401).send("error");

	});
});

router.get('/getComplainted',function(req, res){
	testService.getComplaintedA().then(function(data){
		testService.getComplaintedB().then(function(data1){
			res.send(data.concat(data1));
		})
	});

});
module.exports = router;
