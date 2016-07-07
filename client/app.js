var app = angular.module("myApp", ['ui.bootstrap', 'ui.router']);
app.controller('myController', ['$scope', '$html', function($scope, $html) {
    $scope.name = 'Vas';
}]);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('news', {
            url: "/news",
            templateUrl: "common/header/news.html"
        })
        .state('check', {
            url: "/check",
            templateUrl: "common/header/check.html"
        });
});