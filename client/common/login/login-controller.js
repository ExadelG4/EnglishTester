(function () {
    'use strict';

    angular.module('login', [])
        .controller('loginController', ['$scope', '$state', 'authService',
            function($scope, $state,authService) {
        $scope.user = $scope.user || [];
        $scope.login = function () {
            authService.login($scope.user.name, $scope.user.password).then(function () {
                $state.go('home');
            });
        };
    }]);
})();