(function(){
    angular.module('statistic').config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('statistics', {
                url: '/statistics',
                templateUrl: '/modules/statistic/statistic.html',
                controller: 'statisticController',
                role: ['admin']
            });
    })
})();
