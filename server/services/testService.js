var testA = require('../db/mongo').testA;
var testB = require('../db/mongo').testB;
var testMaker = require('../logic/testMaker');
var q = require('q');
var stackService = require('./stackService');



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

function result(id, ans){
	var pr = q.defer();
	//temporarily
	var count =0;
	var rez =0;
	ans.forEach(function(element) {
		count++;
		rez +=element.mark;
	});
	rez/=count;
	stackService.findStack({_id: id}, {}, {}).then(function (data_){
		var resultRecord = {};
		var data = data_[0];
		resultRecord.userId = data.userId,
		resultRecord.firstName = data.firstName,
		resultRecord.lastName = data.lastName,
		resultRecord.email = data.email,

		resultRecord.result = {};

		resultRecord.result.autoMark = data.level;
		resultRecord.result.teacherMark = rez;
		resultRecord.result.level = (rez+data.level*100)/2;
		

		resultRecord.teacherId = data.teacherId;
		
		resultRecord.teacherFirstName = data.teacherFirstName;
		resultRecord.teacherLastName = data.teacherLastName;
		resultRecord.teacherEmail = teacherEmail;

		stackService.addResults(resultRecord).then(function(data){
			stackService.removeStackCollection({_id: id}).then(function(data){
				pr.resolve();
			}).catch(function(err){
				pr.reject(err);
			})
		}).catch(function(err){
			pr.reject(err);
		})

	}).catch(function(err){
		pr.reject(err);
	});



	return pr.promise;
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
module.exports.result = result;