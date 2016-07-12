var app = angular.module('myApp', ['ui.bootstrap', 'ui.router', 'login', 'statistics', 'news', 'check', 'approve', 'addQuestion']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'common/login/login.html',
            controller: 'loginController'
        })
        .state('statistics', {
            url: '/statistics',
            templateUrl: 'common/statistics/statistics.html',
            controller: 'statisticsController'
        })
        .state('news', {
            url: '/news',
            templateUrl: 'common/news/news.html',
            controller: 'newsController'
        })
        .state('check', {
            url: '/check',
            templateUrl: 'common/check/check.html',
            controller: 'checkController'
        })
        .state('approve', {
            url: '/approve',
            templateUrl: 'common/approve/approve.html',
            controller: 'approveController'
        })
        .state('addQuestion', {
            url: '/addQuestion',
            templateUrl: 'common/addQuestion/addQuestion.html',
            controller: 'addQuestionController'
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