var express = require('express');
var contracts = require('./contracts');
var service = require('../services/userService');
var stackService = require('../services/stackService');
var testService = require('../services/testService');
var path = require("path");
var router = express.Router();
var testService = require('../services/testService')

// var bodyParser = require('body-parser');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var key = require('../config.json');


router.use(passport.initialize());
require('../passport')(passport);


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

router.post('/register',function(req, res) {
	if(!req.body.email || !req.body.password) {
    	res.json({ success: false, message: 'Please enter email and password.' });
  	} else {
  		var info ={
  			email : req.body.email,
  			password: req.body.password,
  			firstName: req.body.firstName,
  			lastName: req.body.secondName,
  			role: 'guest'
  		};
		service.addNewUser(info).then(function(data){
			res.json(data);
		}).catch(function(err){
			res.status(400).send("Bad Request");
		});

  }

});

router.post('/login',function (req, res) {

	service.authenticate(req.body.email, req.body.password).then(function (data) {
		res.json(data);
	}).catch(function (err) {
		// res.json(err);
		res.status(401).send("unauthorized");
	});
	
});


router.get('/refresh', passport.authenticate('jwt', { session: false }), function(req, res) {
	 contracts.refresh(req.header('refresh')).then(function(data){
		 res.json(data);
	 }).catch(function(err){
		 res.json(err);
	 });	
});

router.post('/assignStudents',function(req, res) {
	 if(!req.body.students){
	 	res.json({ success: false, message: 'Please enter email and password.' });
	 } 
	 else{
	  		stackService.addOpenTestsArray(req.body.students).then(function(data){
			  res.json('add');
				console.log('azaza');
		  }).catch(function (err) {
			  res.json('eror');
		  });

  }

});


router.get('/getTest', function(req, res){
	testService.getTest().then(function(data){
		res.json(data);
	}).catch(function(err){
		res.json(err);
	});
});

module.exports = router;
