(function () {
	'use strict';
	angular.module('tests')
		.controller('addQuestionController', ['$scope', function($scope) {
			/*console.log($scope.audio1.network);
  			console.log($scope.audio1.ended);*/

			var ctrl = this;

			ctrl.selectedQue = {
				text: '',
				type: ''
			};
			ctrl.setSelectedType = setSelectedType;
			ctrl.addAnswerItem = addAnswerItem;
			ctrl.removeAnswerItem = removeAnswerItem;

			ctrl.countOfAnswers = 1;

			ctrl.song = {
    			id: 'one',
    			title: 'Rain',
    			artist: 'Drake',
    			url: 'http://cdndl.zaycev.net/6100/1726613/anberlin_-_the_feel_good_drag_(zaycev.net).mp3'

			};



			ctrl.typeOfQuestion = [
			{
				type: 1,
				text: '"One of many"'
			},
			{
				type: 2,
				text: '"Many of many"'
			},
			{
				type: 3,
				text: 'Question without choice of answers'
			},
			{
				type: 4,
				text: 'Essay'
			},
			{
				type: 5,
				text: 'Listening without choice of answers'
			},
			{
				type: 6,
				text: 'Listening with "One of many"'
			},
			{
				type: 7,
				text: 'Listening with "Many of many"'
			},
			{
				type: 8,
				text: 'Speaking'
			}
			];

			ctrl.answers = [{}];

			function setSelectedType(que) {
				if (ctrl.selectedQue.type !== que.type) {
					ctrl.selectedQue.type = que.type;
					ctrl.selectedQue.text = que.text;
					ctrl.answers.splice(1, ctrl.countOfAnswers - 1);
					ctrl.countOfAnswers = 1;
				}
			};
			function addAnswerItem() {
				if (ctrl.countOfAnswers !== 7) {
					ctrl.countOfAnswers++;
					ctrl.answers.push({});
				}
			};

			function removeAnswerItem() {
				if (ctrl.countOfAnswers !== 1) {
					ctrl.countOfAnswers--;
					ctrl.answers.splice(ctrl.countOfAnswers, 1);
				}
			};




}])})();