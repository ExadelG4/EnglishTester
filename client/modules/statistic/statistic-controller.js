(function () {
	'use strict';

	angular.module('statistic', []).controller('statisticController', ['$scope', '$state', function($scope, $state) {


		$scope.searchUser = function() {
			console.log('hello');
		};

		$scope.items = [
			{
				name: 'kety'
			},
			{
				name: 'katy'
			},
			{
				name: 'kity'
			}

		]
	}]);
})();