var testA = require('../db/mongo').testA;
var testB = require('../db/mongo').testB;
var testMaker = require('../logic/testMaker'); 

function getAllQuestions(){
	return testA.find({},{},{});
}
function getQFromLevel(_level,rand){
	return testA.find({level: _level},{'type':1, 'question':1, 'options':1},{skip : rand, limit : 1 });
}
function addNewQuestion(info){
	return testA.save(info);	
}
function addNewQuestionB(info){
	return testB.save(info);	
}
function removeCollection(){
	return testA.remove();
}

function getTest(){
	return testMaker.make(testA);
}

module.exports.getAllQuestions = getAllQuestions;
module.exports.getQFromLevel = getQFromLevel;
module.exports.addNewQuestion = addNewQuestion;
module.exports.addNewQuestionB = addNewQuestionB;
module.exports.removeCollection = removeCollection;
module.exports.getTest= getTest;