var express = require('express');
var contracts = require('./contracts');
var service = require('./services/userService');
var path = require("path");
var router = express.Router();

var bodyParser = require('body-parser');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var key = require('./config.json');


router.use(passport.initialize());
require('./passport')(passport);

// router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({extended: true}));

router.get('/getAll', function(req, res) {
	
  		service.getAllUsers().then(function(data){
			  res.send(JSON.stringify(data));
		  }).catch(function (err) {
			  res.send(JSON.stringify(err));
		  });

});

//athentication--------------------------------
router.post('/login',function(req, res) {
	if(!req.body.email || !req.body.password) {
    	res.json({ success: false, message: 'Please enter email and password.' });
  	} else {
		// var newUser = new User({
		// 	email: req.body.email,
      	// 	password: req.body.password
    	// });

    	// newUser.save(function(err) {
		// 	if (err) {
        // 		return res.json({ success: false, message: 'That email address already exists.'});
      	// 	}
		// 	res.json({ success: true, message: 'Successfully created new user.' });
    	// });
		service.addNewUser(req.body.email, req.body.password).then(function(data){
			res.json(data);
		}).catch(function(err){
			res.json(err);
		});


  }

});

module.exports = router;
