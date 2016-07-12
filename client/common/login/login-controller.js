(function() {
    'use strict';

    angular.module('login')
        .controller('loginController', ['$scope', '$state', '$http', 'loginService',
            function($scope, $state, $http, loginService) {
                $scope.user = $scope.user || [];
                $scope.login = function () {
                    loginService.login($scope.user.name, $scope.user.password).then(function() {
                        $state.go('home');
                    });
                };
             }]);
})();
