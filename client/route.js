(function () {
    'use strict';

    angular.module('myApp').config(
        function($stateProvider, $urlRouterProvider) {

            //$urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'common/login/login.html',
                    controller: 'loginController',
                    noAuth: true
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

        }
    );
})();