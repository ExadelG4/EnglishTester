var express = require('express');
var contracts = require('../contracts');
var service = require('../../services/userService');
var stackService = require('../../services/stackService');
var testService = require('../../services/testService');
var path = require("path");
var router = express.Router();
var fs = require('fs');
var UUID = require('uuid-js');


var passport = require('passport');
var jwt = require('jsonwebtoken');
var key = require('../../config.json');


router.use(passport.initialize());
require('../../passport')(passport);

router.post('/login',function (req, res) {

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
		
	var token = req.header('Authorization');
	jwt.verify(token.replace('JWT ',''), key.secret, function(err, decoded) {
		if(err){
			//console.log(err);
		}
		else{ 
			var id = decoded._id;
			service.getUserStatus(id).then(function(data){
				res.json(data);
			}).catch(function(err){
				res.status(404).send("User not found");
			});
		}
	});

	
});

router.post('/upload',function(req, res){
	var date = new Date().getTime();
	var uuid = UUID.fromTime(date, false);	
	req.pipe(fs.createWriteStream(path.join(__dirname +'./../../../uploadFiles/'+uuid+'.mp3'))).on('end',function(){
		res.send('../media/'+uuid+'.mp3');
	});
});

// router.get('/uploadtest',function(req, res){
// 	res.sendFile(path.join(__dirname + '/../../../../modules/saving file in server/index.html'));
// });

module.exports = router;
