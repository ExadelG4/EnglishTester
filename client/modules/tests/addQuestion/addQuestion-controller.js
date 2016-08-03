(function () {
	'use strict';
	angular.module('tests')
		.controller('addQuestionController', ['$scope','userService','notification', function($scope, userService, notification) {


			$scope.selectedQue = '';


			$scope.typeOfQuestion = [ 
			{
				text: 'One of many',
				type: 'oneOfMany'
			},
			{
				text: 'Many of many',
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

			$scope.song = {
    			id: '',
    			title: '',
    			artist: '',
    			url: ''

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
			};

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
		
			$scope.changeQue = function(selectedQue) {
				$scope.init(selectedQue);
			};

			$scope.sendQue = function () {
				if ($scope.selectedQue === 'listeningWithManyOfMany' || $scope.selectedQue === 'manyOfMany') {
					var tempNum = angular.copy($scope.finalQue.answers);
					$scope.finalQue.answers = [];
					for (var i = 0; i < tempNum.length; ++i) {
						if(tempNum[i] === true) {
							$scope.finalQue.answers.push(i);
						}
					}
				}
				if ($scope.finalQue.type === 'questionWithoutChoiceoOfAnswers' || 
					$scope.finalQue.type === 'essay' ||  
					$scope.finalQue.type === 'listeningWithoutChoiceOfAnswers' ||
					$scope.finalQue.type === 'speaking') {
					delete $scope.finalQue.answers;
					delete $scope.finalQue.options;
				}
				userService.halfSmoke($scope.finalQue);
				$scope.selectedQue = '';
				notification.success("You have successfully added new question");
			};







			$scope.fileNameChanged = function (ele) {
				var files = ele.files;
				var l = files.length;
				var namesArr = [];

				for (var i = 0; i < l; i++) {
					namesArr.push(files[i].name);
				}
			}




			$scope.submit = function(){
				// var file = this.elements.myfile.files[0];
				var file = $scope.vm.uploadme;
				if (file) {
					upload(file);
				}
				return false;
			};

			function upload(file) {

				var xhr = new XMLHttpRequest();

				// обработчики можно объединить в один,
				// если status == 200, то это успех, иначе ошибка
				xhr.onload = xhr.onerror = function () {
					if (this.status == 200) {
						log("success");
					} else {
						log("error " + this.status);
					}
				};

				// обработчик для закачки
				xhr.upload.onprogress = function (event) {
					log(event.loaded + ' / ' + event.total);
				}

				xhr.open("POST", "upload", true);
				xhr.send(file);

			}


			function log(html) {
				document.getElementById('log').innerHTML = html;
			}




}]).directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                // var reader = new FileReader();
                // reader.onload = function (loadEvent) {
                //     scope.$apply(function () {
                //         scope.fileread = loadEvent.target.result;
                //     });
                // }
                // reader.readAsDataURL(changeEvent.target.files[0]);
				scope.fileread = changeEvent.target.files[0];
            });
        }
    }

	// return {
	// 	changeEvent.target.files[0]
	// }

}])
})();