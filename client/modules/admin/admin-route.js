(function(){
    angular.module('admin').config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('assignStd', {
                url: '/admin/assignStd',
                templateUrl: 'modules/admin/assignStd/assignStd.html',
                controller: 'assignStdController',
                role:['admin']
            })
            .state('assignTch', {
                url: '/admin/assignTch',
                templateUrl: 'modules/admin/assignTch/assignTch.html',
                controller: 'assignTchController',
                role:['admin']
            })
            .state('newUser', {
                url: '/admin/newUser',
                templateUrl: 'modules/admin/newUser/newUser.html',
                controller: 'newUserController',
                role:['admin']
            })
            .state('badQuestions', {
                url: '/admin/badQuestions',
                templateUrl: 'modules/admin/badQuestion/badQuestion.html',
                controller: 'badQuestionController',
                role: ['admin']
            })
    });
}());