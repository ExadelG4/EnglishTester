var app = angular.module("myApp", ['ui.bootstrap', 'ui.router', 'login']);
app.controller('myController', ['$scope', '$html', function($scope, $html) {
    $scope.name = 'Vas';
}]);

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
            templateUrl: "common/header/news/news.html",
            controller: "newsController"
        })
        .state('check', {
            url: "/check",
            templateUrl: "common/header/check/check.html",
            controller: "checkController"
        })
        .state('approve', {
            url: "/approve",
            templateUrl: "common/header/approve/approve.html",
            controller: "approveController"
        })
        .state('addQuestion', {
            url: "/addQuestion",
            templateUrl: "common/header/addQuestion/addQuestion.html",
            controller: "addQuestionController"
        });
});