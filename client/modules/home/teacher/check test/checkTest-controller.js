(function () {
	'use strict';

	angular.module('home').controller('checkTestController', ['$scope', '$state','userService', function($scope, $state, userService) {
		var startUrl = 'modules/home/teacher/check test/templateTests/templateTest';

		$scope.urls = {
				'questionWithoutChoiceOfAnswers': startUrl + '1.html',
				'essay': startUrl + '2.html',
				'listeningWithoutChoiceOfAnswers': startUrl + '3.html',
				'speaking': startUrl + '4.html'
			};

		$scope.questions = [
			{
				qId: '',
				type: 'questionWithoutChoiceOfAnswers',
				question: 'Mimimi nyanyanya. What you choose?',
				audio: '',
				answer: 'hz. but I was try.',
				audioAnswer: '',
				scale: 10

			},
			{
				qId: '',
				type: 'essay',
				question: 'Which colors do you like?',
				audio: '',
				answer: 'Blue..  dark like sea, deep like sky.I love magic colors of natural stones, beauty wild flowers.',
				audioAnswer: '',
				scale: 20
			},
			{
				qId: '',
				type: 'listeningWithoutChoiceOfAnswers',
				question: 'How named this song?',
				audio: 'assets/audio/papa_roach_-_last_resort(zaycev.net).mp3',
				answer: '',
				audioAnswer: 'CUT MY LIFE IN TO PEASES, THIS IS MI LAST RESORT.. oh yeahh, last resort.',
				scale: 100
			},
			{
				qId: '',
				type: 'speaking',
				question: 'Vladimerski central - ?',
				audio: '',
				answer: '',
				audioAnswer: 'assets/audio/vcvc.mp3',
				scale: 50
			}
		];

		$scope.proven = [];
		$scope.omg = {
			tempMark:''
		};
		for (var i = 0; i < $scope.questions.length; ++i) {
			var temp = {
				qId: $scope.questions[i].qId,
				mark: ''
			};
			$scope.proven.push(temp);
		}

		$scope.currentPage = 1;
		$scope.totalCount = $scope.questions.length;
		$scope.copyCurrentPage = 1;
		$scope.neededNumPage = '';
		$scope.validNeededNumPage = true;
		$scope.forValidMark = [];

		for(var i = 0; i < $scope.totalCount; ++i) {
			$scope.forValidMark.push(false);
		}

		var initNewPage = function (currentPage) {
			$scope.omg.tempMark = $scope.proven[currentPage - 1].mark;
		};

		var savePrevPage = function(currentPage) {
			$scope.proven[currentPage - 1].mark = $scope.omg.tempMark;
			$scope.omg.tempMark = '';
		};

		$scope.pageChanged = function(prevNumPage) {
    		$scope.validNeededNumPage = true;
    		savePrevPage(prevNumPage);
    		initNewPage($scope.currentPage);
    		$scope.copyCurrentPage = $scope.currentPage;
  		};

  		$scope.setNumPage = function(numPage) {
			if(numPage >= 0 && numPage <= $scope.questions.length)
				$scope.currentPage = numPage;
			else  {
				$scope.validNeededNumPage = false;
			}
		};

		$scope.onlineWriteValid = function(currentPage) {
			$scope.forValidMark[currentPage - 1] = $scope.validMark($scope.questions[currentPage - 1].scale);
		}
		$scope.song = {
    			id: 'one',
    			artist: 'Drake',
    			//url: 'http://cdndl.zaycev.net/6100/1726613/anberlin_-_the_feel_good_drag_(zaycev.net).mp3'
    			url: ''

		};

		$scope.createSong = function(urlAudio, song) {
			song.url = urlAudio;
			return song;
		};



		$scope.validMark = function (scale) {
			var tempIntMark = parseInt($scope.omg.tempMark, 10);
			var temptempMark = tempIntMark+'';
			if (temptempMark !== $scope.omg.tempMark) {
				return false;
			}
			return tempIntMark !== NaN && tempIntMark >=0 && tempIntMark <=scale;
		}
		$scope.validAll = function() {
			for(var i = 0; i < $scope.totalCount; ++i) {
				if($scope.forValidMark[i] === false) {
					return false;
				}
			}
			return true;
		}
	}]);
})();