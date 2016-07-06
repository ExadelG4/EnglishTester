var express = require('express');
var contracts = require('./contracts');
var service = require('./services/userService');
var path = require("path");
var router = express.Router();

router.get('/', function(req, res) {
	  service.print();
	  res.sendFile(path.join(__dirname+'/index.html'));
});

router.post('/',function(req, res) {

});

module.exports = router;