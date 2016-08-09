(function(){
    angular.module('personalProfile').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('editProfile', {
                url: '/yourProfile',
                templateUrl: 'modules/profile/editProfile/editProfile.html',
                controller: 'editProfileController',
                role: ['admin', 'user', 'teacher']
            })
    }])
}());
