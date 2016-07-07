var express = require('express');
var contracts = require('./contracts');
var service = require('./services/userService');
var path = require("path");
var router = express.Router();

router.get('/getAll', function(req, res) {
	service.getAll().then(function(data){
		res.send(data);
	}).catch(function(e){
		console.log(e);
		res.send({error: e});
	});
	 // res.sendFile(path.join(__dirname+'/index.html'));
});

router.post('/',function(req, res) {

});

module.exports = router;