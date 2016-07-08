var app = angular.module("myApp", ['ui.bootstrap', 'ui.router', 'login']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "common/login/login.html",
            controller: "loginController"
        })
        .state('statistics', {
            url: "/statistics",
            templateUrl: "common/header/statistics/statistics.html",
            controller: "statisticsController"
        })
        .state('news', {
            url: "/news",
            templateUrl: "common/header/news/news.html"
        })
        .state('check', {
            url: "/check",
            templateUrl: "common/header/check/check.html"
        })
        .state('approve', {
            url: "/approve",
            templateUrl: "common/header/approve/approve.html"
        })
        .state('addQuestion', {
            url: "/addQuestion",
            templateUrl: "common/header/addQuestion/addQuestion.html"
        });
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
                case($state.current.name === 'statistics'):
                    $scope.currentPage = 'statistics';
                    break;
            }
        }
    });
}]);