'use strict'

var adminModule = angular.module('admin', ['ui.bootstrap', 'ui.router']).controller('adminController', ['$scope', '$state', function($scope, $state) {
    //$state.go('admin');
}]);

adminModule.config(function($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.otherwise('/admin');

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
});