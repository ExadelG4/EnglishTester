var app = angular.module('myApp', ['ui.bootstrap', 'ui.router', 'login', 'infrastructure', 'home', 'admin', 'tests', 'angularSoundManager']);

app.config(function($stateProvider, $urlRouterProvider) {

    //$urlRouterProvider.otherwise('/login');

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
            role: ['user', 'guest','admin']
        })

});

app.controller('appController', ['$scope', '$state', function($scope, $state) {
    $scope.user = {
        name: "Vasya",
        password: "pupl"
    };
    $scope.currentPage = null;
    $scope.state = $state;
    $scope.$watch('state.current.name', function(newVal, oldVal) {
        if(newVal !== oldVal) {
            switch(true) {
                case($state.current.name === 'login'):
                    $scope.currentPage = 'login';
                    break;
                case($state.current.name === 'home'):
                    $scope.currentPage = 'home';
                    break;
                case($state.current.name === 'admin'):
                    $scope.currentPage = 'admin';
                    break;
                case($state.current.name === 'tests'):
                    $scope.currentPage = 'tests';
                    break;
            }
        }
    });
}]);