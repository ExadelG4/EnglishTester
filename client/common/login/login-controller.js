'use strict';

angular.module('login', []).controller('loginController', ['$scope', '$state', '$http', function($scope, $state, $http) {
    $scope.user = $scope.user || [];
    $scope.login = function() {
        //send user on server
        console.log($scope.user.name + ' ' + $scope.user.password);
        $state.go('statistics');
            $http.get('http://localhost:3000/login')
                .then(function(result) {
                    console.log(result.data);
                },
                function() {

                });
        };
}]);