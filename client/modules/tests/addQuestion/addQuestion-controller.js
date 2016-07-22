(function () {
	'use strict';
	angular.module('tests')
		.controller('addQuestionController', ['$scope', function($scope) {

			$scope.selectedQue = '';
			$scope.answers = [[{}],[{}],[{}],[{}]];

				
			$scope.addAnswerItem = addAnswerItem;
			$scope.removeAnswerItem = removeAnswerItem;


			$scope.typeOfQuestion = [
				'"One of many"', 
				'"Many of many"', 
				'Question without choice of answers', 
				'Essay',
				'Listening without choice of answers',
				'Listening with "One of many"',
				'Listening with "Many of many"',
				'Speaking'
			];

			function addAnswerItem(num) {
				if ($scope.answers[num].length !== 7) {
					$scope.answers[num].push({});
				}
			};

			function removeAnswerItem(num) {
				if ($scope.answers[num].length !== 1) {
					$scope.answers[num].splice($scope.answers[num].length - 1, 1);
				}
			};

			$scope.song = {
    			id: 'one',
    			title: 'Rain',
    			artist: 'Drake',
    			//url: 'http://cdndl.zaycev.net/6100/1726613/anberlin_-_the_feel_good_drag_(zaycev.net).mp3'
    			url: 'papa_roach_-_last_resort(zaycev.net).mp3'

			};

			$scope.finalQue = {
				type: '',
				text: '',
				level: '',
				audio: '',
				answers: []
			};

}])})();