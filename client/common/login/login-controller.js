'use strict';

angular.module('login').controller('loginController', ['$scope', '$state', '$http', 'loginService', function($scope, $state, $http, loginService) {
    $scope.user = $scope.user || [];
    $scope.login = function () {
        loginService.login($scope.user.name, $scope.user.password).then(function() {
            $state.go('statistics');
        });
    };
    //$scope.login = function() {
    //    //send user on server
    //    console.log($scope.user.name + ' ' + $scope.user.password);
    //    $state.go('statistics');
    //        $http.get('http://localhost:3000/login')
    //            .then(function(result) {
    //                console.log(result.data);
    //            },
    //            function() {
    //
    //            });
    //    };
}]);