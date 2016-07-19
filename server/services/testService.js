var testA = require('../db/mongo').testA;
var testB = require('../db/mongo').testB;
var testC = require('../db/mongo').testC;

function getAllQuestions(){
	return testA.find();
}

module.exports.getAllQuestions = getAllQuestions;