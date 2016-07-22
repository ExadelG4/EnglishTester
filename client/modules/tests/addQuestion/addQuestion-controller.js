(function () {
	'use strict';
	angular.module('tests')
		.controller('addQuestionController', ['$scope', function($scope) {

			var ctrl = this;

			ctrl.selectedQue = '';
			ctrl.answers = [[{}],[{}],[{}],[{}]];

				
			ctrl.addAnswerItem = addAnswerItem;
			ctrl.removeAnswerItem = removeAnswerItem;


			ctrl.typeOfQuestion = [
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
				if (ctrl.answers[num].length !== 7) {
					ctrl.answers[num].push({});
				}
			};

			function removeAnswerItem(num) {
				if (ctrl.answers[num].length !== 1) {
					ctrl.answers[num].splice(ctrl.answers[num].length - 1, 1);
				}
			};

			ctrl.song = {
    			id: 'one',
    			title: 'Rain',
    			artist: 'Drake',
    			//url: 'http://cdndl.zaycev.net/6100/1726613/anberlin_-_the_feel_good_drag_(zaycev.net).mp3'
    			url: 'papa_roach_-_last_resort(zaycev.net).mp3'

			};

}])})();