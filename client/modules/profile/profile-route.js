(function(){
    angular.module('profile').config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('profile', {
                url: '/profile',
                templateUrl: 'modules/profile/profile.html',
                controller: 'profileController',
                role: ['admin', 'user', 'teacher']
            });
    });
}());