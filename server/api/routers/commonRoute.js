var express = require('express');
var contracts = require('../contracts');
var service = require('../../services/userService');
var stackService = require('../../services/stackService');
var testService = require('../../services/testService');
var path = require("path");
var router = express.Router();
var fs = require('fs');
var UUID = require('uuid-js');
var host = require('../../config.json').host;

var passport = require('passport');
var jwt = require('jsonwebtoken');
var key = require('../../config.json');


router.use(passport.initialize());
require('../../passport')(passport);

router.post('/login',contracts.login,function (req, res) {
	service.authenticate(req.body.email, req.body.password).then(function (data) {
		res.json(data);
	}).catch(function (err) {
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

router.get('/status', passport.authenticate('jwt', { session: false }),function(req, res){	
	service.getUserStatus(req.user._id).then(function(data){
		res.json(data);
	}).catch(function(err){
		res.status(404).send("User not found");
	});	
});

router.post('/upload',function(req, res){
	var date = new Date().getTime();
	var uuid = UUID.fromTime(date, false);	
	var ws = req.pipe(fs.createWriteStream(path.join(__dirname +'./../../../uploadFiles/'+uuid+'.mp3')));
	ws.on('finish', function() {
		res.send(host+'media/'+uuid+'.mp3');
	});
});

router.get('/uploadtest',function(req, res){
	res.sendFile(path.join(__dirname + '/../../../../modules/saving file in server/index.html'));
});

router.post('/editNumber',passport.authenticate('jwt', { session: false }),function(req,res){
	console.log(req.body);
	console.log(req.body.number);
	var id = req.user._id;
	var newNumber = req.body.number;
	service.update({_id:id},{ $set: { number: newNumber}},{}).then(function(data){
		res.status(200).send("Number was edited");
	}).catch(function(err){
		res.status(402).send(err);
	})

});

router.get('/profile',passport.authenticate('jwt', { session: false }), function(req,res){
		service.userStatistics(req.user._id).then(function (data) {
			res.send(data);
		}).catch(function (err) {
			res.status(401).send(err);
		});

});

module.exports = router;
