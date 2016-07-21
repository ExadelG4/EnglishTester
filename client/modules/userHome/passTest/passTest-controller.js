(function () {
	'use strict'

	var startStatisticModule = angular.module('userHome');
	startStatisticModule.controller('passTestController', ['$scope', '$state', function($scope, $state) {
		
		var startUrl = 'modules/userHome/passTest/templateTests/templateTest';

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

		$scope.questionsPart1 = [
			{
				id: '',
				type: 'oneOfMany',
				text: 'Mimimi nyanyanya. What you choose?',
				audio: '',
				answers: [
					'Mimimi',
					'Nyanyanya',
					'No, I am normal man'
				]
			},
			{
				id: '',
				type: 'manyOfMany',
				text: 'Which colors do you like?',
				audio: '',
				answers: [
					'The red',
					'Cian',
					'Yellow, mmm'
				]
			},
			{
				id: '',
				type: 'questionWithoutChoiceOfAnswers',
				text: 'Which colors do you like?',
				audio: ''/*,
				answers: [
					'The red',
					'Cian',
					'Yellow, mmm'
				]*/
			},
			{
				id: '',
				type: 'listeningWithOneOfMany',
				text: 'How named this song?',
				audio: 'assets/audio/papa_roach_-_last_resort(zaycev.net).mp3',
				answers: [
					'Behind blue eyes',
					'Last resort',
					'Riot'
				]
			},
			{
				id: '',
				type: 'listeningWithManyOfMany',
				text: 'Which albums this band do you like?',
				audio: 'assets/audio/Three Days Grace - Animal I Have Become.mp3',
				answers: [
					'One-X',
					'Life starts now',
					'TDG'
				]
			}
		];

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

		$scope.userAnswers = [];

		for (let i = 0; i < $scope.questionsPart1.length; ++i) {
			var tempAnswer = {
				id: '',
				type: '',
				answers: '',
				audioAnswer: ''
			};
			if (isCheckboxType($scope.questionsPart1[i].type) || isRadioType($scope.questionsPart1[i].type)) {
					tempAnswer.answers = [];
			};
			tempAnswer.id = $scope.questionsPart1[i].id;
			tempAnswer.type = $scope.questionsPart1[i].type;
			$scope.userAnswers.push(tempAnswer);
		}
		$scope.omg = {
			tempChoise: null
		};
		$scope.currentPage = 1;
		$scope.copyCurrentPage = 1;
		$scope.neededNumPage = '';
		$scope.validNeededNumPage = true;

		//init first page
		$scope.initNewPage = function(currentPage) {
			if (isCheckboxType($scope.questionsPart1[currentPage - 1].type)) {
		 		$scope.omg.tempChoise = [];
			 	for (var i = 0; i < $scope.questionsPart1[currentPage - 1].answers.length; ++i) {
	    			$scope.omg.tempChoise.push(false);
	    		}
	    		for (var i = 0; i < $scope.userAnswers[currentPage - 1].answers.length; ++i) {
	    			$scope.omg.tempChoise[$scope.userAnswers[currentPage - 1].answers[i]] = true;
	    		}
	    	}
	    	else if (isRadioType($scope.questionsPart1[currentPage - 1].type)) {
	    		if($scope.userAnswers[currentPage - 1].answers[0] !== null) {
	    			$scope.omg.tempChoise = $scope.userAnswers[currentPage - 1].answers[0];
	    		}
	    		else {
	    			$scope.omg.tempChoise = -1;
	    		}
	    	}
	    	else if (isTextType($scope.questionsPart1[currentPage - 1].type)) {
	    		$scope.omg.tempChoise = $scope.userAnswers[currentPage - 1].answers;
    		}
    		else {
    			/*audio ans*/
    		}
		};

		$scope.initNewPage($scope.currentPage);

		$scope.savePrevPage = function(prevNumPage) {
			if (isCheckboxType($scope.questionsPart1[prevNumPage - 1].type)) {
		 		$scope.userAnswers[prevNumPage - 1].answers = [];
			 	for (var i = 0; i < $scope.omg.tempChoise.length; ++i) {
			 		if ($scope.omg.tempChoise[i]) {
	    				$scope.userAnswers[prevNumPage - 1].answers.push(i);
	    			}
	    		}
		 	}
		 	else if (isRadioType($scope.questionsPart1[prevNumPage - 1].type)) {
		 		$scope.userAnswers[prevNumPage - 1].answers = [];
		 		$scope.userAnswers[prevNumPage - 1].answers.push($scope.omg.tempChoise);	
		 	}
		 	else if (isTextType($scope.questionsPart1[prevNumPage - 1].type)) {
		 		$scope.userAnswers[prevNumPage - 1].answers = $scope.omg.tempChoise;
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

		/*if (isCheckboxType($scope.questionsPart1[$scope.currentPage - 1].type)) {
		 	$scope.omg.tempChoise = [];
			 for (var i = 0; i < $scope.questionsPart1[$scope.currentPage - 1].answers.length; ++i) {
	    		$scope.omg.tempChoise.push(false);
	    	}
	    }
	    else if (isRadioType($scope.questionsPart1[$scope.currentPage - 1].type)) {
	    	$scope.omg.tempChoise = -1;
    	}
    	else if (isTextType($scope.questionsPart1[$scope.currentPage - 1].type)) {
    		$scope.omg.tempChoise = '';
    	}
    	else {
    			//audio ans
    	}*/

		$scope.song = {
    			id: 'one',
    			artist: 'Drake',
    			//url: 'http://cdndl.zaycev.net/6100/1726613/anberlin_-_the_feel_good_drag_(zaycev.net).mp3'
    			url: 'assets/audio/Three Days Grace - Animal I Have Become.mp3'

			};

		$scope.createSong = function(urlAudio, song) {
			song.url = urlAudio;
			return song;
		};

		$scope.totalCount = $scope.questionsPart1.length;

		$scope.pageChanged = function(prevNumPage) {
		 	/**if (isCheckboxType($scope.questionsPart1[prevNumPage - 1].type)) {
		 		$scope.userAnswers[prevNumPage - 1].answers = [];
			 	for (var i = 0; i < $scope.omg.tempChoise.length; ++i) {
			 		if ($scope.omg.tempChoise[i]) {
	    				$scope.userAnswers[prevNumPage - 1].answers.push(i);
	    			}
	    		}
		 	}
		 	else if (isRadioType($scope.questionsPart1[prevNumPage - 1].type)) {
		 		$scope.userAnswers[prevNumPage - 1].answers = [];
		 		$scope.userAnswers[prevNumPage - 1].answers.push($scope.omg.tempChoise);	
		 	}
		 	else if (isTextType($scope.questionsPart1[prevNumPage - 1].type)) {
		 		$scope.userAnswers[prevNumPage - 1].answers = $scope.omg.tempChoise;
		 	}
		 	else {
		 		//audio ans
		 	}
		 	if (isCheckboxType($scope.questionsPart1[$scope.currentPage - 1].type)) {
		 		$scope.omg.tempChoise = [];
			 	for (var i = 0; i < $scope.questionsPart1[$scope.currentPage - 1].answers.length; ++i) {
	    			$scope.omg.tempChoise.push(false);
	    		}
	    		for (var i = 0; i < $scope.userAnswers[$scope.currentPage - 1].answers.length; ++i) {
	    			$scope.omg.tempChoise[$scope.userAnswers[$scope.currentPage - 1].answers[i]] = true;
	    		}
	    	}
	    	else if (isRadioType($scope.questionsPart1[$scope.currentPage - 1].type)) {
	    		if($scope.userAnswers[$scope.currentPage - 1].answers[0] !== null) {
	    			$scope.omg.tempChoise = $scope.userAnswers[$scope.currentPage - 1].answers[0];
	    		}
	    		else {
	    			$scope.omg.tempChoise = '';
	    		}
	    	}
	    	else if (isTextType($scope.questionsPart1[$scope.currentPage - 1].type)) {
	    		$scope.omg.tempChoise = $scope.userAnswers[$scope.currentPage - 1].answers;
    		}
    		else {
    			//audio ans
    		}*/
    		$scope.validNeededNumPage = true;
    		$scope.savePrevPage(prevNumPage);
    		$scope.initNewPage($scope.currentPage);
    		$scope.copyCurrentPage = $scope.currentPage;
  		};



			
		$scope.onSendRequest = function() {
			$scope.userInformation.isSentReq = true;
		};


	}
	]
	);
})();