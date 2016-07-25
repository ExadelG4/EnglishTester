(function () {
	'use strict';
	angular.module('tests')
		.controller('addQuestionController', ['$scope','userService', function($scope, userService) {

			$scope.selectedQue = '';


			$scope.typeOfQuestion = [ 
			{
				text: 'One of many',
				type: 'oneOfMany'
			},
			{
				text: '"Many of many"',
				type: 'manyOfMany'
			},
			{
				text: 'Question without choice of answers',
				type: 'questionWithoutChoiceoOfAnswers'
			},
			{ 
				text: 'Essay',
				type: 'essay'
			},
			{
				text: 'Listening without choice of answers',
				type: 'listeningWithoutChoiceOfAnswers'
			},
			{
				text: 'Listening with one of many',
				type: 'listeningWithOneOfMany'
			},
			{
				text: 'Listening with many of many',
				type: 'listeningWithManyOfMany'
			},
			{
				text: 'Speaking',
				type: 'speaking'
			}
			];

			$scope.finalQue = {
				type: '',
				question: '',
				level: '',
				audio: '',
				options: [''],
				answers: [-1]
			};

			/*$scope.temp*/

			$scope.addAnswerItem = function() {
				if ($scope.finalQue.options.length !== 7) {
					$scope.finalQue.options.push('');
				}
				if ($scope.selectedQue === 'listeningWithManyOfMany' || $scope.selectedQue === 'manyOfMany') {
					$scope.finalQue.answers.push(false);
				}
			};
			$scope.removeAnswerItem = function() {
				if ($scope.finalQue.options.length !== 1) {
					$scope.finalQue.options.splice($scope.finalQue.options.length - 1, 1);
					for (var i = 0; i < $scope.finalQue.answers.length; ++i) {
						if($scope.finalQue.answers[i] === $scope.finalQue.options.length) {
							$scope.finalQue.answers.splice(i, 1);
							break;
						}
					}
				}
			};
			$scope.init = function(selectedQue) {
				$scope.finalQue.type = selectedQue;
				$scope.finalQue.question = '';
				$scope.finalQue.level = '';
				$scope.finalQue.options = [''];
				$scope.finalQue.answers = [-1];
				if (selectedQue === 'listeningWithManyOfMany' || selectedQue === 'manyOfMany') {
					$scope.finalQue.answers[0] = false;
				}

			}
			$scope.changeQue = function(selectedQue) {
				$scope.init(selectedQue);
			}

			$scope.song = {
    			id: 'one',
    			title: 'Rain',
    			artist: 'Drake',
    			//url: 'http://cdndl.zaycev.net/6100/1726613/anberlin_-_the_feel_good_drag_(zaycev.net).mp3'
    			url: 'papa_roach_-_last_resort(zaycev.net).mp3'

			};
			/*$scope.disableSubmit  = function() {

			}*/

			$scope.sendQue = function () {
				//допилить конец, если это чекбокс
				if ($scope.selectedQue === 'listeningWithManyOfMany' || $scope.selectedQue === 'manyOfMany') {
					for (var i = 0; i < $scope.finalQue.answers.length; ++i) {
						if($scope.finalQue.answers[i]) {
							$scope.finalQue.answers[i] = i;
						}
					}
					for (var i = 0; i < $scope.finalQue.answers.length; ++i) {
						if($scope.finalQue.answers[i] === false) {
							$scope.finalQue.answers.splice(i, 1);
						}
					}
				}
				userService.halfSmoke($scope.finalQue);
				if ($scope.finalQue.type === 'questionWithoutChoiceoOfAnswers' || 
					$scope.finalQue.type === 'essay' ||  
					$scope.finalQue.type === 'listeningWithoutChoiceOfAnswers' ||
					$scope.finalQue.type === 'speaking') {
					delete $scope.finalQue.answers;
					delete $scope.finalQue.options;
				}
				$scope.selectedQue = '';
			};

}])})();