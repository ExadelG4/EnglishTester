var testA = require('../db/mongo').testA;
var testB = require('../db/mongo').testB;


function getAllQuestions(){
	return testA.find();
}

module.exports.getAllQuestions = getAllQuestions;