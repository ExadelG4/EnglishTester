var stack = require('../db/mongo').stack;
var results = require('../db/mongo').results;
var request = require('../db/mongo').request;
var openTests = require('../db/mongo').openTests;


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


function updateStackTeacher(id,field){
return stack.update(id,field);
};

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
module.exports.updateStackTeacher = updateStackTeacher;