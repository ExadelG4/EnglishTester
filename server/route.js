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
router.get('/login', function(req, res) {
	
  		res.send("AZAZAZA");

});
router.post('/userFun',function(req, res) {
		var info = req.body;
		var method = req.body.method;
		
		if(method == "getUser"){
			
			service.getUser(info.name).then(function(data){
			  res.send(data);
		  }).catch(function (err) {
			  res.send(err);
		  });
		}
		else if(method == "addUser"){
			service.addUser(info.data).then(function(data){
			  res.send(data);
		  }).catch(function (err) {
			  res.send(err);
		  });
		}
});

module.exports = router;
