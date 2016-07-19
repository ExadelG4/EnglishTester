(function () {
    'use strict';

    angular.module('myApp').config(
        function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'common/login/login.html',
                    controller: 'loginController'
                })
                .state('home', {
                    url: '/home',
                    templateUrl: 'modules/home/home.html',
                    controller: 'homeController'
                })
                .state('admin', {
                    url: '/admin',
                    controller: 'adminController'
                })
                .state('tests', {
                    url: '/tests',
                    templateUrl: 'modules/tests/tests.html',
                    controller: 'testsController'
                })
        }
    );
})();