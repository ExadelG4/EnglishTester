(function () {
	'use strict'

	var startStatisticModule = angular.module('userHome', ['ui.bootstrap', 'ui.router']);
	startStatisticModule.controller('userHomeController', ['$scope', '$state', function($scope, $state) {
		$scope.userInformation = {
			isSentReq: false
		}

		$scope.onSendRequest = function() {
			$scope.userInformation.isSentReq = true;
		};


	}
	]
	);
})();