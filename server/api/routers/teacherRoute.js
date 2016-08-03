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


router.get('/getTests', passport.authenticate('jwt', { session: false }), function(req, res){
	var tId = req.user._id;
	stackService.findStack({teacherId : tId},{'date': 1, 'level': 1},{}).then(function (data) {
		res.json(data);
	}).catch(function (err) {
		res.json(err);
	})
});

router.post('/checkTest',contracts.checkTest,passport.authenticate('jwt', { session: false }),function(req, res){
	
	testService.sendTest(req.body.id, req.user._id ).then(function(data){
		res.send(data);
	}).catch(function(err){
		res.status(400).send("Bad Request");
	});

});

router.post('/submit3',function(req, res){
	testService.result(req.body.id, req.body.results ).then(function(data){
		res.send(data);
	}).catch(function(err){
		res.status(400).send("Bad Request");
	});
});



module.exports = router;