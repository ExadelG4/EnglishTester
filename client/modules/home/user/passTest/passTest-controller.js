(function () {
	'use strict';

	angular.module('home').controller('passTestController', ['$scope', '$state', function($scope, $state) {
		
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

		$scope.questionsPart1 = [
			{
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
				type: 'listeningWithManyOfMany',
				text: 'Which albums this band do you like?',
				audio: 'assets/audio/Three Days Grace - Animal I Have Become',
				answers: [
					'One-X',
					'Life starts now',
					'TDG'
				]
			}
		];
			$scope.totalCount = $scope.questionsPart1.length;
			$scope.currentPage = 1;
			
			$scope.onSendRequest = function() {
				$scope.userInformation.isSentReq = true;
			};


	}]);
})();