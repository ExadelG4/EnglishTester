(function(){
    angular.module('profile').config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('editProfile', {
                url: '/profile',
                templateUrl: 'modules/profile/editProfile/editProfile.html',
                controller: 'editProfileController',
                role: ['admin', 'user', 'teacher']
            });
    });
}());