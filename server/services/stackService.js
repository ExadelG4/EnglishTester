var stack = require('../db/mongo').stack;
var results = require('../db/mongo').results;
var request = require('../db/mongo').request;
var openTests = require('../db/mongo').openTests;

var q = require('q');

function getAllStack(){
	return stack.find({},{},{});
}
function getAllRequest(){
	return request.find({},{},{});
}
function getAllResults(){
	return results.find({},{},{});
}
function getAllOpenTests(){
	return openTests.find({},{},{});
}


function addStack(info){
	return stack.save(info);
}
function addRequest(info){
	return request.save(info);
}
function addResults(info){
	return results.save(info);
}
function addOpenTests(info){
	return openTests.save(info);
}


function addStacks(info){
	return stack.create(info);
}
function addOpenTestsArray(info){
	return openTests.create(info);
}
function addRequests(info){
	return request.create(info);
}
function addResultArray(info){
	return results.create(info);
}

function findStack(){
	return stack.find(arguments[0],arguments[1],arguments[2]);
}
function findResults(){
	return results.find(arguments[0],arguments[1],arguments[2]);
}
function findRequest(){
	return request.find(arguments[0],arguments[1],arguments[2]);
}
function findOpenTests(){
	return openTests.find(arguments[0],arguments[1],arguments[2]);
}

function findStackById(id){
	return stack.findById();
}
function findResultsById(id){
	return results.findById(id);
}
function findRequestById(id){
	return request.findById(id);
}
function findOpenTestsById(id){
	return openTests.findById(id);
}

function assignTeacher(data){
	return stack.update({userId: data.userId},{$set: { teacherId: data.teacherId }},{});
}



function updateStackTeacher(id,field){
	return stack.update(id,field);
};

function removeStackCollection(){
	return stack.remove();
}
function removeResultsCollection(){
	return results.remove();
}
function removeRequestCollection(){
	return request.remove();
}
function removeOpenTestsCollection(){
	return openTests.remove();
}




function checkFirstPart(data){
	var pr = q.defer();
	var len = data.length;
	var marks = [];
	for (var i =0; i < 5 ;i++){
		marks.push(0);
	}
	stack.findOne({userId: data.userId}).then(function(stackRecord){
			data.forEach(function(element) {
				stackRecord.answersAuto.forEach(function(element1) {
					if(element.qId === element1._qId){
						var f = true
						element.answer.forEach(function(element, i, arr) {
							if(element!= element1.answer[i]){
								f = false;
							}
						});
						if(f){
							marks[element1.level-1]+=0.2*element1.level;
						}
					}
				});
			});
			var rez = 0;
			marks.forEach(function(element) {
				rez+=element;
			});
			rez/=15;
			rez = Math.floor(rez*5);
			stack.update({_id:stackRecord._id},{ $set: { level: rez }},{}).then(function(){
				pr.resolve(rez);
			}).catch(function(err){
				pr.reject(err);
			});
	}).catch(function(err){
		pr.reject(err);
	});

	return pr.promise;

}





module.exports.getAllStack = getAllStack;
module.exports.addStack = addStack;
module.exports.addStacks = addStacks;
module.exports.findStackById = findStackById;
module.exports.findResultsById = findResultsById;
module.exports.findRequestById = findRequestById;
module.exports.findOpenTestsById = findOpenTestsById;
module.exports.getAllResults = getAllResults;
module.exports.getAllRequest = getAllRequest;
module.exports.getAllOpenTests = getAllOpenTests;
module.exports.addResults = addResults;
module.exports.addRequest = addRequest;
module.exports.addOpenTests = addOpenTests;
module.exports.findStack = findStack;
module.exports.findResults = findResults;
module.exports.findRequest = findRequest;
module.exports.findOpenTests = findOpenTests;
module.exports.addOpenTestsArray = addOpenTestsArray;
module.exports.assignTeacher = assignTeacher;
module.exports.addRequests = addRequests;
module.exports.addResultArray = addResultArray;
module.exports.removeStackCollection = removeStackCollection;
module.exports.removeRequestCollection = removeRequestCollection;
module.exports.removeResultsCollection = removeResultsCollection;
module.exports.removeOpenTestsCollection = removeOpenTestsCollection;

module.exports.checkFirstPart = checkFirstPart;