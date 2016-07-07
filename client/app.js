var app = angular.module("myApp", ['ui.bootstrap']);
app.controller('myController', ['$scope', '$html', function($scope, $html) {
    $scope.name = 'Vas';
}]);