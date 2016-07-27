(function () {
	'use strict';

	angular.module('home').controller('passTestController', ['$scope', '$state','userService', 'angularPlayer', function($scope, $state, userService, angularPlayer) {

		$scope.$on('$stateChangeStart', function () {
			if(angularPlayer.getPlaylist().length > 0)
    			angularPlayer.clearPlaylist( function() {}); 
		});

		$scope.whichPart = 1;

		var initVars = function(){ 
			$scope.allQuestions = null;
			$scope.currentPage = 1;
			$scope.copyCurrentPage = 1;
			$scope.neededNumPage = '';
			$scope.validNeededNumPage = true;
			$scope.userAnswers = [];
			$scope.validAnswers = [];
			$scope.totalCount = null;
			$scope.omg = {
				tempChoise: null
			};
		}();

		/*$scope.allQuestions = [
			{
				qId: '',
				type: 'oneOfMany',
				question: 'Mimimi nyanyanya. What you choose?',
				audio: '',
				options: [
					'Mimimi',
					'Nyanyanya',
					'No, I am normal man'
				]
			},
			{
				qId: '',
				type: 'manyOfMany',
				question: 'Which colors do you like?',
				audio: '',
				options: [
					'The red',
					'Cian',
					'Yellow, mmm'
				]
			},
			{
				qId: '',
				type: 'questionWithoutChoiceOfAnswers',
				question: 'Which colors do you like?',
			},
			{
				qId: '',
				type: 'listeningWithOneOfMany',
				question: 'How named this song?',
				audio: 'assets/audio/papa_roach_-_last_resort(zaycev.net).mp3',
				options: [
					'Behind blue eyes',
					'Last resort',
					'Riot'
				]
			},
			{
				qId: '',
				type: 'listeningWithManyOfMany',
				question: 'Which albums this band do you like?',
				audio: 'assets/audio/Three Days Grace - Animal I Have Become.mp3',
				options: [
					'One-X',
					'Life starts now',
					'TDG'
				]
			}
		];*/

		var isCheckboxType = function(type) {
			return type === 'manyOfMany' || type === 'listeningWithManyOfMany';
		};
		var isRadioType = function(type) {
			return type === 'oneOfMany' || 	type === 'listeningWithOneOfMany';
		};

		var isTextType = function(type) {
			return type === 'questionWithoutChoiceOfAnswers' || type === 'essay' || type === 'listeningWithoutChoiceOfAnswers';	
		};
		var isAudioType = function(type) {
			return type === 'speaking';
		}

		var initAll = function() {
			$scope.allQuestions = result;
			$scope.totalCount = $scope.allQuestions.length;

			for (let i = 0; i < $scope.totalCount; ++i) {
				var tempAnswer = {
					qId: '',
					answers: [],
					audioAnswer: ''
				};
				tempAnswer.qId = $scope.allQuestions[i].qId;
				tempAnswer.type = $scope.allQuestions[i].type;
				$scope.userAnswers.push(tempAnswer);
			}
  		for (var i = 0; i < $scope.totalCount; ++i) {
  			$scope.validAnswers.push(false);
  		}

  		$scope.initNewPage($scope.currentPage);
		}

		userService.getTest().then( function(result) {
			initAll();
	 	});

		var startUrl = 'modules/home/user/passTest/templateTests/templateTest';

		$scope.urls = {
				'oneOfMany': startUrl + '1.html',
				'manyOfMany': startUrl + '2.html',
				'questionWithoutChoiceOfAnswers': startUrl + '3.html',
				'essay': startUrl + '4.html',
				'listeningWithOneOfMany': startUrl + '5.html',
				'listeningWithManyOfMany': startUrl + '6.html',
				'listeningWithoutChoiceOfAnswers': startUrl + '7.html',
				'speaking': startUrl + '8.html'
			};


		$scope.initNewPage = function(currentPage) {
			if (isCheckboxType($scope.allQuestions[currentPage - 1].type)) {
		 		$scope.omg.tempChoise = [];
			 	for (var i = 0; i < $scope.allQuestions[currentPage - 1].options.length; ++i) {
	    			$scope.omg.tempChoise.push(false);
	    		}
	    		for (var i = 0; i < $scope.userAnswers[currentPage - 1].answers.length; ++i) {
	    			$scope.omg.tempChoise[$scope.userAnswers[currentPage - 1].answers[i]] = true;
	    		}
	    	}
	    	else if (isRadioType($scope.allQuestions[currentPage - 1].type)) {
	    		if($scope.userAnswers[currentPage - 1].answers[0] !== null) {
	    			$scope.omg.tempChoise = $scope.userAnswers[currentPage - 1].answers[0];
	    		}
	    		else {
	    			$scope.omg.tempChoise = -1;
	    		}
	    	}
	    	else if (isTextType($scope.allQuestions[currentPage - 1].type)) {
	    		$scope.omg.tempChoise = $scope.userAnswers[currentPage - 1].answers[0];
    		}
    		else {
    			//audio ans
    		}
    		angularPlayer.init();
			if($scope.allQuestions[currentPage - 1].type ==='listeningWithoutChoiceOfAnswers' || 
				$scope.allQuestions[currentPage - 1].type === 'listeningWithOneOfMany' ||
				$scope.allQuestions[currentPage - 1].type === 'listeningWithManyOfMany') {
    			song.url = $scope.allQuestions[currentPage - 1].audio; 
				angularPlayer.addTrack(song);
			}

		};

		$scope.savePrevPage = function(prevNumPage) {
			if (isCheckboxType($scope.allQuestions[prevNumPage - 1].type)) {
		 		$scope.userAnswers[prevNumPage - 1].answers = [];
			 	for (var i = 0; i < $scope.omg.tempChoise.length; ++i) {
			 		if ($scope.omg.tempChoise[i]) {
	    				$scope.userAnswers[prevNumPage - 1].answers.push(i);
	    			}
	    		}
		 	}
		 	else if (isRadioType($scope.allQuestions[prevNumPage - 1].type)) {
		 		$scope.userAnswers[prevNumPage - 1].answers = [];
		 		$scope.userAnswers[prevNumPage - 1].answers.push($scope.omg.tempChoise);	
		 	}
		 	else if (isTextType($scope.allQuestions[prevNumPage - 1].type)) {
		 		$scope.userAnswers[prevNumPage - 1].answers[0] = $scope.omg.tempChoise;
		 	}
		 	else {
		 		//audio ans
		 	}

			
		};

		$scope.setNumPage = function(numPage) {
			if(numPage >= 0 && numPage <= $scope.totalCount)
				$scope.currentPage = numPage;
			else  {
				$scope.validNeededNumPage = false;
			}
		};

		$scope.song = {
    			id: 'one',
    			artist: 'Drake',
    			//url: 'http://cdndl.zaycev.net/6100/1726613/anberlin_-_the_feel_good_drag_(zaycev.net).mp3'
    			url: 'assets/audio/Three Days Grace - Animal I Have Become.mp3'

		};

		/*$scope.createSong = function(urlAudio, song) {
			song.url = urlAudio;
			return song;
		};*/


		$scope.pageChanged = function(prevNumPage) {
    		$scope.validNeededNumPage = true;
    		$scope.savePrevPage(prevNumPage);
    		if(angularPlayer.getPlaylist().length > 0)
    			angularPlayer.clearPlaylist( function() {
    				$scope.initNewPage($scope.currentPage);
    				$scope.copyCurrentPage = $scope.currentPage;
    			});    		
    		else {
    			$scope.initNewPage($scope.currentPage);
    			$scope.copyCurrentPage = $scope.currentPage;
    		}
  		};
  		
  		$scope.changeValidC = function(currentPage) {
  			for(var i = 0; i < $scope.totalCount; ++i) {
  				if( $scope.omg.tempChoise[i] === true) {
  					$scope.validAnswers[currentPage - 1] = true;
  					return;
  				}
  			}
  			$scope.validAnswers[currentPage - 1] = false;
  		}

  		$scope.changeValidRT = function(currentPage) {
  			if ($scope.omg.tempChoise !== '') {
  				$scope.validAnswers[currentPage - 1] = true;
  			}
  			else {
  				$scope.validAnswers[currentPage - 1] = false;
  			}
  		};
  		$scope.allValidAnswers = function () {
  			for(var i = 0; i < $scope.totalCount; ++i) {
  				if($scope.validAnswers[i] === false){
  					return false;
  				}
  			}
  			return true;
  		};
  		$scope.sendFirstPart = function() {
  			userService.sendFirstPart($scope.userAnswers)
  				.then ( function(data) {
  					notification.success("You have successfully completed the first part of the text.");
  					$scope.whichPart = 2;
  					initVars();
  					initAll();
  				});
  		};
  		$scope.sendSecondPart = function() {
  			userService.sendSecondPart($scope.userAnswers)
  				.then ( function() {
  					$state.go('home');
  					notification.success("You have successfully completed the first part of the text.");
  				});
  		};

	}]);
})();