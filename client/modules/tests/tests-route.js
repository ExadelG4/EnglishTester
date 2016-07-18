(function () {
	'use strict';
	angular.module('tests')
		.config(function($stateProvider, $urlRouterProvider) {
    		$urlRouterProvider.otherwise('/tests');

			$stateProvider
        		.state('addQuestion', {
            		url: '/tests/addQuestion',
            		templateUrl: 'modules/tests/addQuestion/addQuestion.html',
            		controller: 'addQuestionController',
            		controllerAs: 'qCtrl',
					role:['admin']
        		})
		});
})();