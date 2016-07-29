var mongo = require('../db/mongo');
var prompt = require('prompt');
var testService = require('../services/testService');
var bodyParser = require('body-parser');
var q = require('q');
var faker = require('faker');

var Moniker = require('moniker');
var questRand = Moniker.generator([Moniker.adjective, Moniker.noun, Moniker.verb]);
var optionRand = Moniker.generator([Moniker.noun]);

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  };
var enumArr = ['oneOfMany','manyOfMany','listeningWithOneOfMany','listeningWithManyOfMany'];
var enumArrB = ['questionWithoutChoiceOfAnswers','essay','listeningWithoutChoiceOfAnswers'];
var addQuestion = function(_level,count){
			var defer = q.defer();
			var prom = [];
			for(i =0; i< count; i++){
				prom.push(testService.addNewQuestion({
							type: enumArr[randomInteger(0,3)],
							level: _level,
							question: questRand.choose(),
							options: [optionRand.choose(),optionRand.choose(),optionRand.choose()],
							answers: [randomInteger(0,2)]
							}));
				}

			
			return q.all(prom);
}

var addQuestionB = function(_level,count){
			var defer = q.defer();
			var prom = [];
			for(i =0; i< count; i++){
				prom.push(testService.addNewQuestionB({
							type: enumArrB[randomInteger(0,2)],
							level: _level,
							question: questRand.choose()
							}));
				}

			
			return q.all(prom);
}
var addAll = function(){
		addQuestion(1,arguments[0]).then(function(data){
		  		console.log('QuestionsA level 1 created!');
		  }).catch(function (err) {
			 console.log(err);
		});
		addQuestion(2,arguments[1]).then(function(data){
		 		console.log('QuestionsA level 2 created!');
		  }).catch(function (err) {
			 console.log(err);
		});
		addQuestion(3,arguments[2]).then(function(data){
			 	console.log('QuestionsA level 3 created!');
		  }).catch(function (err) {
			 console.log(err);
		});
		addQuestion(4,arguments[3]).then(function(data){
		  	 	console.log('QuestionsA level 4 created!');
		  }).catch(function (err) {
			 console.log(err);
		});
		addQuestion(5,arguments[4]).then(function(data){
		  	 	console.log('QuestionsA level 5 created!');
		  }).catch(function (err) {
			 console.log(err);
		});
		  addQuestionB(1,arguments[0]).then(function(data){
		  		console.log('QuestionsB level 1 created!');
		  }).catch(function (err) {
			 console.log(err);
		});
		addQuestionB(2,arguments[1]).then(function(data){
		 		console.log('QuestionsB level 2 created!');
		  }).catch(function (err) {
			 console.log(err);
		});
		addQuestionB(3,arguments[2]).then(function(data){
			 	console.log('QuestionsB level 3 created!');
		  }).catch(function (err) {
			 console.log(err);
		});
		addQuestionB(4,arguments[3]).then(function(data){
		  	 	console.log('QuestionsB level 4 created!');
		  }).catch(function (err) {
			 console.log(err);
		});
		addQuestionB(5,arguments[4]).then(function(data){
		  	 	console.log('QuestionsB level 5 created!');
		  }).catch(function (err) {
			 console.log(err);
		});
}


	console.log('Default testGen. Please, wait...');
	testService.removeCollection().then(function(data){
		testService.removeCollectionB().then(function(data){
			addAll(10,10,10,10,10);
		}).catch(function(err){
			console.log(err);
		});
		
		  }).catch(function (err) {
			 console.log(err);
	});
	




