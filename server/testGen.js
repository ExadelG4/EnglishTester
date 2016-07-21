var mongo = require('./db/mongo');
var prompt = require('prompt');
var testService = require('./services/testService');
var bodyParser = require('body-parser');
var q = require('q');
var faker = require('faker');

var Moniker = require('moniker');
var questRand = Moniker.generator([Moniker.adjective, Moniker.noun, Moniker.verb]);
var optionRand = Moniker.generator([Moniker.noun]);

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
var addQuestion = function(_level,count){
			var defer = q.defer();
			var prom = [];
			for(i =0; i< count; i++){
				prom.push(testService.addNewQuestion({
							type: 'One',
							level: _level,
							question: questRand.choose(),
							options: [optionRand.choose(),optionRand.choose(),optionRand.choose()],
							answers: [1]
							}));
				}

			
			return q.all(prom);
		
}
var addAll = function(){
		addQuestion(1,arguments[0]).then(function(data){
		  		console.log('Questions level 1 created!');
		  }).catch(function (err) {
			 console.log(err);
		});
		addQuestion(2,arguments[1]).then(function(data){
		 		console.log('Questions level 2 created!');
		  }).catch(function (err) {
			 console.log(err);
		});
		addQuestion(3,arguments[2]).then(function(data){
			 	console.log('Questions level 3 created!');
		  }).catch(function (err) {
			 console.log(err);
		});
		addQuestion(4,arguments[3]).then(function(data){
		  	 	console.log('Questions level 4 created!');
		  }).catch(function (err) {
			 console.log(err);
		});
		addQuestion(5,arguments[4]).then(function(data){
		  	 	console.log('Questions level 5 created!');
		  }).catch(function (err) {
			 console.log(err);
		});
}

	console.log('Default testGen. Please, wait...');
	testService.removeCollection().then(function(data){
		addAll(10,10,10,10,10);
		  }).catch(function (err) {
			 console.log(err);
	});
	




