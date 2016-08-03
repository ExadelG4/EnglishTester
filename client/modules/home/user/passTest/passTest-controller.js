(function () {
	'use strict';

	angular.module('home').controller('passTestController', ['$scope', '$state','userService', 'angularPlayer','notification', '$timeout',
		 function($scope, $state, userService, angularPlayer, notification, $timeout) {

		$scope.$on('$stateChangeStart', function () {
			if(angularPlayer.getPlaylist().length > 0)
    			angularPlayer.clearPlaylist( function() {}); 
		});

		userService.getStatus().then ( function(result) {
			if(result.status !== 'scha') {
				$state.go('home');
			}
		})

		$scope.whichPart = 1;

		$scope.initVars = function() { 
			$scope.allQuestions = null;
			$scope.currentPage = 1;
			$scope.copyCurrentPage = 1;
			$scope.neededNumPage = '';
			$scope.validNeededNumPage = true;
			$scope.userAnswers = [];
			$scope.validAnswers = [];
			$scope.dirty = [];
			$scope.totalCount = null;
			$scope.omg = {
				tempChoise: null
			};
		}
		$scope.initTimer = function() {
			$scope.timer = 1000*60*60*2;
			$scope.timerHours = Math.floor($scope.timer/1000/60/60);
			$scope.timerMin = Math.floor($scope.timer/1000/60) - $scope.timerHours*60;
			$scope.timerSec = Math.floor($scope.timer/1000) - $scope.timerMin*60 - $scope.timerHours*60*60;
		}();

		function testTimer(){
			$scope.timer -= 1000;
			    if ($scope.timer === 0){
			    	//something
			    } 
			    else {
			    	$scope.timerHours = Math.floor($scope.timer/1000/60/60);
					$scope.timerMin = Math.floor($scope.timer/1000/60) - $scope.timerHours*60;
					$scope.timerSec = Math.floor($scope.timer/1000) - $scope.timerMin*60 - $scope.timerHours*60*60;
			        $timeout(testTimer,1000);
			    }
		}
		$timeout(testTimer,1000);

		$scope.initVars();

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

		$scope.initAll = function(result) {
			$scope.allQuestions = result;
			$scope.totalCount = $scope.allQuestions.length;

			for (let i = 0; i < $scope.totalCount; ++i) {
				var tempAnswer = {
					qId: '',
					answer: [],
					audioAnswer: '',
					badForUser: false
				};
				tempAnswer.qId = $scope.allQuestions[i]._id;
				tempAnswer.type = $scope.allQuestions[i].type;
				$scope.userAnswers.push(tempAnswer);
				$scope.validAnswers.push(false);
				$scope.dirty.push(false);
				//$scope.badForUser.push(false);
			}
	  		$scope.initNewPage($scope.currentPage);
		}

		userService.getTest().then( function(result) {
			$scope.initAll(result);
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
			$scope.neededNumPage = '';
			if (isCheckboxType($scope.allQuestions[currentPage - 1].type)) {
		 		$scope.omg.tempChoise = [];
			 	for (var i = 0; i < $scope.allQuestions[currentPage - 1].options.length; ++i) {
	    			$scope.omg.tempChoise.push(false);
	    		}
	    		for (var i = 0; i < $scope.userAnswers[currentPage - 1].answer.length; ++i) {
	    			$scope.omg.tempChoise[$scope.userAnswers[currentPage - 1].answer[i]] = true;
	    		}
	    	}
	    	else if (isRadioType($scope.allQuestions[currentPage - 1].type)) {
	    		if($scope.userAnswers[currentPage - 1].answer[0] !== null) {
	    			$scope.omg.tempChoise = $scope.userAnswers[currentPage - 1].answer[0];
	    		}
	    		else {
	    			$scope.omg.tempChoise = -1;
	    		}
	    	}
	    	else if (isTextType($scope.allQuestions[currentPage - 1].type)) {
	    		$scope.omg.tempChoise = $scope.userAnswers[currentPage - 1].answer[0];
    		}
    		else {
    			//audio ans
    		}
    		$scope.currentPage = currentPage;

    		angularPlayer.init();
			if($scope.allQuestions[currentPage - 1].type ==='listeningWithoutChoiceOfAnswers' || 
				$scope.allQuestions[currentPage - 1].type === 'listeningWithOneOfMany' ||
				$scope.allQuestions[currentPage - 1].type === 'listeningWithManyOfMany') {
    			$scope.song.url = $scope.allQuestions[currentPage - 1].audio; 
				$timeout( function() {angularPlayer.addTrack($scope.song);});
			}

		};

		$scope.savePrevPage = function(prevNumPage) {
			$scope.dirty[prevNumPage - 1] = true;
			if (isCheckboxType($scope.allQuestions[prevNumPage - 1].type)) {
		 		$scope.userAnswers[prevNumPage - 1].answer = [];
			 	for (var i = 0; i < $scope.omg.tempChoise.length; ++i) {
			 		if ($scope.omg.tempChoise[i]) {
	    				$scope.userAnswers[prevNumPage - 1].answer.push(i);
	    			}
	    		}
		 	}
		 	else if (isRadioType($scope.allQuestions[prevNumPage - 1].type)) {
		 		$scope.userAnswers[prevNumPage - 1].answer = [];
		 		$scope.userAnswers[prevNumPage - 1].answer.push($scope.omg.tempChoise);	
		 	}
		 	else if (isTextType($scope.allQuestions[prevNumPage - 1].type)) {
		 		$scope.userAnswers[prevNumPage - 1].answer[0] = $scope.omg.tempChoise;
		 	}
		 	else {
		 		//audio ans
		 	}			
		};

		$scope.pageChanged = function(prevNumPage, currentPage) {
    		$scope.validNeededNumPage = true;
    		$scope.savePrevPage(prevNumPage);
    		//$scope.omg.tempChoise = null;
    		if(angularPlayer.getPlaylist().length > 0)
    			angularPlayer.clearPlaylist( function() {
    				});    	
    		$scope.initNewPage(currentPage);
    		$scope.copyCurrentPage = $scope.currentPage;

  		};

		$scope.setNumPage = function(numPage) {
			if(numPage >= 0 && numPage <= $scope.totalCount) {
				$scope.dirty[$scope.copyCurrentPage - 1] = true;
				$scope.pageChanged($scope.copyCurrentPage, numPage);
				//$scope.currentPage = numPage;
			}
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

  		$scope.addBadForUser = function(num) {
  			var temp = $scope.userAnswers[num].badForUser;
  			if (temp) {
  				$scope.userAnswers[num].badForUser = false;
  			}
  			else 
  				$scope.userAnswers[num].badForUser = true;
  		};

  		$scope.sendFirstPart = function() {
  			userService.sendFirstPart($scope.userAnswers)
  				.then ( function(data) {
  					notification.success("You have successfully completed the first part of the text.");
  					$scope.whichPart = 2;
  					$scope.initVars();
  					$scope.initAll(data);
  				});
  		};
  		$scope.sendSecondPart = function() {
  			userService.sendSecondPart($scope.userAnswers)
  				.then ( function() {
  					$state.go('home');
  					notification.success("You have successfully completed all text.");
  				});
  		};

	}]);
})();