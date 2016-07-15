(function () {
    'use strict';

    angular.module('login', [])
        .controller('loginController', ['$scope', '$state', 'userService',
            function($scope, $state, userService) {
        $scope.user = $scope.user || [];
        $scope.login = function () {
            userService.login($scope.user.name, $scope.user.password).then(function () {
                $state.go('home');
                //todo: redirect to necessary page
                //todo: rejection function
            });
        };
    }]);
})();