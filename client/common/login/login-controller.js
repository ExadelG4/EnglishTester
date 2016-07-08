'use strict';

angular.module("login", []).controller("loginController", ['$scope', '$state', function($scope, $state) {
    $scope.user = $scope.user || [];
    $scope.login = function() {
        //send user on server
        console.log($scope.user.name+' '+$scope.user.password);
        $state.go('statistics');

    };
}]);