var app = angular.module('myApp', ['ui.bootstrap', 'ui.router', 'login', 'infrastructure', 'home', 'admin', 'tests','statistic','userHome', 'angularSoundManager','angularFileUpload']);

app.config(function($stateProvider, $urlRouterProvider) {

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
                case($state.current.name === 'statistic'):
                    $scope.currentPage = 'statistic';
                    break;
                case($state.current.name === 'userHome'):
                    $scope.currentPage = 'userHome';
                    break;
            }
        }
    });
}]);