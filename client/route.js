(function () {
    'use strict';

    angular.module('myApp').config(
        function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'common/login/login.html',
                    controller: 'loginController',
                    role: ['admin', 'user', 'teacher', 'guest']
                })
                .state('home', {
                    url: '/home',
                    templateUrl: 'modules/home/home.html',
                    controller: 'homeController',
                    role: ['admin', 'user', 'teacher', 'guest']
                })
                .state('admin', {
                    url: '/admin',
                    controller: 'adminController',
                    role: ['admin']
                })
                .state('tests', {
                    url: '/tests',
                    templateUrl: 'modules/tests/tests.html',
                    controller: 'testsController',
                    role: ['user', 'guest']
                })
                .state('statistic', {
                    url: '/statistic',
                    templateUrl: 'modules/statistic/statistic.html',
                    controller: 'statisticController'
                })
                .state('userHome', {
                    url: '/userHome',
                    templateUrl: 'modules/userHome/userHome.html',
                    controller: 'userHomeController'
                })
                .state('passTestPart1', {
                    url: '/passTestPart1',
                    templateUrl: 'modules/userHome/passTest/passTestPart1.html',
                    controller: 'passTestController'

                })
        }
    );
})();