var testA = require('../db/mongo').testA;
var testB = require('../db/mongo').testB;
var testMaker = require('../logic/testMaker');
var q = require('q');
var stackService = require('./stackService');
var service = require('./userService');


function findA(query, fields, options){
	return testA.find(query, fields, options);
}
function findB(query, fields, options){
	return testB.find(query, fields, options);
}
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
function checkTest(testId, tId){
    var pr = q.defer();
    stackService.findStack({_id: testId},{'answers':1,'teacherId':1},{}).then(function(data){
    	
    	if(data[0].teacherId == tId){
		    	var qIdArr =[];
		    	var forTeacher =[];
		    	data[0].answers.forEach(function(element){
		    		qIdArr.push(element.qId);
		    	});
		    	console.log(qIdArr);
		    	console.log(qIdArr.length);
		    	findB({_id : {$in:qIdArr}},{'question':1,'type':1},{}).then(function(qdata){
		    			console.log(qdata);
		    		for(var i=0; i<qIdArr.length; i++){
		    			var question ={};
		    			question.qId = qdata[i]._id;
		    			question.answer = data[0].answers[i].answer;
		    			question.type = qdata[i].type;
		    			question.question = qdata[i].question;
		    			forTeacher.push(question);
		    			
		    		}
		    		console.log(forTeacher);
		    		pr.resolve({questions: forTeacher, tId : testId});

		    	}).catch(function(err){
		    		pr.reject(err);
		    	})
    	}
    	else {
    		pr.reject('ERROR. THIS TEST IS NOT FOR YOU');
    	}
    }).catch(function(err){
    	pr.reject(err);
    });
    return pr.promise;
};
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
module.exports.result = result;
module.exports.checkTest = checkTest;
module.exports.findA = findA;
module.exports.findB = findB;

