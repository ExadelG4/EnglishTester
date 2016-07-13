'use strict'

var adminModule = angular.module('admin', ['ui.bootstrap', 'ui.router']).controller('adminController', ['$scope', '$state', function($scope, $state) {
    //$state.go('admin');
}]);

adminModule.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/admin');

    $stateProvider
        .state('assignStd', {
            url: '/admin/assignStd',
            templateUrl: 'modules/admin/assignStd/assignStd.html'
        })
        .state('assignTch', {
            url: '/admin/assignTch',
            templateUrl: 'modules/admin/assignTch/assignTch.html'
        })
        .state('newUser', {
            url: '/admin/newUser',
            templateUrl: 'modules/admin/newUser/newUser.html'
        })
});