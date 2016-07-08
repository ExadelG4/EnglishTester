var express = require('express');
var contracts = require('./contracts');
var service = require('./services/userService');
var path = require("path");
var router = express.Router();

router.get('/getAll', function(req, res) {
	
  		service.getAllUsers().then(function(data){
			  res.send(JSON.stringify(data));
		  }).catch(function (err) {
			  res.send(JSON.stringify(err));
		  });

});

router.post('/а',function(req, res) {
		
});

module.exports = router;
