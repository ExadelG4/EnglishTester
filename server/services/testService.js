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
function removeCollection(query){
	return testA.remove(query);
}
function removeCollectionB(query){
	return testB.remove(query);
}
function getTest(user){
	return testMaker.make(testA,user);
}

function getSecondTest(level){
	return testMaker.makeAgain(testB,level);
}
function getComplaintedA(){
	return testA.find({complaint: true},{'type':1, 'question':1, 'options':1},{});
}

function getComplaintedB(){
	return testB.find({complaint: true},{'type':1, 'question':1, 'options':1},{});
}
function addQuestionArrayA(info){
	return testA.create(info);
}
function addQuestionArrayB(info){
	return testB.create(info);
}

module.exports.getAllQuestions = getAllQuestions;
module.exports.getQFromLevel = getQFromLevel;
module.exports.addNewQuestion = addNewQuestion;
module.exports.addNewQuestionB = addNewQuestionB;
module.exports.removeCollection = removeCollection;
module.exports.getTest= getTest;
module.exports.removeCollectionB = removeCollectionB;
module.exports.getSecondTest = getSecondTest;
module.exports.getComplaintedA = getComplaintedA;
module.exports.getComplaintedB = getComplaintedB;
module.exports.addQuestionArrayA = addQuestionArrayA;
module.exports.addQuestionArrayB = addQuestionArrayB;